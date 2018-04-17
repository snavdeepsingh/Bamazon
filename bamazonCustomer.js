var mysql = require("mysql");
var Table = require("cli-table");
var inquirer = require("inquirer");



var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    itemsForSale();
    // connection.end();
});

var productID = [];

function itemsForSale() {
    connection.query("SELECT item_id,product_name,price FROM products", function (err, res) {
        if (err) console.log(err);
        var table = new Table({
            head: ["item_id", "product_name", "price"],
            style: {
                head: ["yellow"],
                colAligns: ["center"]
            }
        });
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].price]);
            productID.push(res[i].item_id);
        }
        console.log(table.toString());

        purchaseItem(productID);
    });

};

function purchaseItem(productID) {
        var productPurchased = [];
    inquirer.prompt([{
            type: "input",
            message: "Please enter the item_id# of the product you wish to purchase",
            name: "item_id",
            validate: (arg) => (isNaN(arg) === false && parseInt(arg) > 0) ? true : false
        },
        {
            type: "input",
            message: "How many units you wish to purchase?",
            name: "quantity",
            validate: (arg) => (isNaN(arg) === false && parseInt(arg) > 0 && parseInt(arg) < 201) ? true : false
        }
    ]).then(function (answers) {
        var order = {
            itemId: answers.item_id,
            quantity: answers.quantity
        }
        productPurchased.push(order);

        // console.log( productID.indexOf(productPurchased[0].itemId) ); 
        // console.log(productID)
        // console.log( productID[9] );
        // console.log( typeof productPurchased[0].itemId );

        if (productID.indexOf(parseInt(productPurchased[0].itemId)) !== -1) {

            connection.query("SELECT * FROM products WHERE item_id=?", productPurchased[0].itemId, function (err, res) {
                if (err) console.log(err);

                if (res[0].stock_quantity < productPurchased[0].quantity) {
                    console.log(`
                        Only ${res[0].stock_quantity} available.
                        Sorry...can't process this order.
                        `);
                    connection.end();
                } else if (res[0].stock_quantity >= productPurchased[0].quantity) {
                    console.log(`
                          You purchased ${productPurchased[0].quantity} ${res[0].product_name}
                          Total cost:   $${productPurchased[0].quantity * res[0].price} 
                          `)
                    // connection.end();
                    var newStock_quantity = res[0].stock_quantity - productPurchased[0].quantity;

                    connection.query("UPDATE products SET ? WHERE ?", [{
                                stock_quantity: newStock_quantity
                            },
                            {
                                item_id: productPurchased[0].itemId
                            }
                        ],
                        function (err, res) {
                            if (err) console.log(err);

                            //     console.log(`
                            // only ${newStock_quantity} items left in stock`);
                        }
                    )
                    connection.end();
                }
            })

        } else {
            console.log(`
                Item you entered does not exist. Choose a different item_id from the list
                `);

            itemsForSale();
        }






    })
}