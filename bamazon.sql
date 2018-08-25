DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    stock INT NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock)
VALUES ("CSS Textbook", "Books", 32, 12), ("Washer/Dryer Combo", "Appliances", 500, 4), ("Body Pillow", "Bedding", 20, 15), ("Universal Remote", "Electronics", 28, 3);

INSERT INTO products (product_name, department_name, price, stock)
VALUES ("Harry Potter 9", "Books", 20, 52), ("Refrigerator", "Appliances", 500, 2), ("Duvee", "Bedding", 15, 20), ("TV", "Electronics", 300, 6);

INSERT INTO products (product_name, department_name, price, stock)
VALUES ("Carrie", "Books", 25, 1), ("Dishwasher", "Appliances", 300, 4);

SELECT * FROM products;