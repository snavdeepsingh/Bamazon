CREATE DATABASE bamazonDB;


USE bamazonDB;

CREATE TABLE products (
`item_id` INTEGER NOT NULL AUTO_INCREMENT,
`product_name` VARCHAR(30),
`department_name` VARCHAR(30),
`price` DECIMAL(6,2) NOT NULL,
`stock_quantity` INTEGER NOT NULL,
PRIMARY KEY(`item_id`)
);

INSERT INTO products(
`product_name`,
`department_name`,
`price`,
`stock_quantity`
),
VALUES(
"iphone 7",
"cell phones",
"599.99",
"100"
),
(
"iphone 8",
"cell phones",
"899.99",
"150"
),
(
"iphone x",
"cell phones",
"999.99",
"160"
),(
"ipad",
"tablets",
"599.99",
"120"
),(
"ipad pro",
"tablets",
"899.99",
"130"
),(
"mac book",
"computer",
"1199.99",
"100"
),
(
"mac book air",
"computer",
"1199.99",
"50"
),
(
"mac book pro",
"computer",
"1299.99",
"150"
),
(
"apple watch",
"watches",
"399.99",
"200"
),
(
"apple tv",
"tv",
"199.99",
"200"
);

