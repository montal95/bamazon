var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "rootroot",
  database: "bamazon"
});

var userAction = function() {
  inquirer
    .prompt({
      type: "list",
      name: "userInput",
      message: "Welcome to Bamazon. What would you like to look at?",
      choices: [
        "CSS Textbook",
        "Washer/Dryer Comnbo",
        "Body Pillow",
        "Universal Remote",
        "Harry Potter 9",
        "Refrigerator",
        "Duvee",
        "TV",
        "Carrie",
        "Dishwasher",
        "Nothing"
      ]
    })
    .then(function(res) {
      var userInput = res.userInput;
      if (userInput === "Nothing") {
        return console.log("Thank you for using Bamazon. Have a nice day!");
      }
      getQty(userInput);
    });
};

var getQty = function(userInput) {
  inquirer
    .prompt({
      type: "input",
      name: "quantity",
      message: "How many will you like?"
    })
    .then(function(res) {
      var reqQty = res.quantity;
      reqQty = parseInt(reqQty);
      if (reqQty < 1) {
        console.log("Please enter a number greater than 0");
        return userAction();
      }
      console.log(userInput + " Quantity of " + reqQty);
      sqlCheck(userInput, reqQty);
    });
};

var sqlCheck = function(item, qty) {
  connection.query(
    "SELECT id, product_name, price, stock FROM products",
    function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(item + " " + qty);
      for (var i = 0; i < res.length; i++) {
        if (res[i].product_name === item) {
          if (res[i].stock - qty < 0) {
            console.log("Insufficient Quantity!!!");
            terminate();
            return userAction();
          }
          var finalTotal = res[i].price * qty;
          var finalStock = res[i].stock - qty;
          var bamItem = res[i];
          inquirer
            .prompt({
              type: "confirm",
              name: "purchase",
              message: `Your total is ${finalTotal}. Continue with order?`
            })
            .then(function(res) {
              if ((res = true)) {
                return sqlUpdate(bamItem, finalStock);
              }
              console.log("Order cancelled");
            });
        }
      }
    }
  );
};

var sqlUpdate = function(bamItem, finalStock) {
  connection.query(
    `UPDATE products SET stock = ${finalStock} WHERE id = ${bamItem.id}`,
    function(err, res) {
      if (err) throw err;
      console.log(bamItem.product_name + " ordered.\n");
      terminate();
      userAction();
    }
  );
};

function terminate() {
  connection.end();
}
userAction();
