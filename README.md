# CS252Lab6
## Names:
* Kai Hoffman - hoffm154@purdue.edu
* Katarina Gregurich - kgregur@purdue.edu
* Nirali Rai - rai15@purdue.edu

## Project: Where'd It Go?!
* Tracks budget by taking money spent and max budget as input then give user an overview of spending habits
* Uses HTML, EJS, CSS, JS, Node.js, MySQL, Bootstrap

## Install dependencies (not covered by npm install)
* Node.js: `sudo apt install node`
* MySQL: `sudo apt install mysql-server`

## Initialize Where'd It Go?! database
* `node setup.js <your_mysql_password>`

## Run the server
* Can run either `npm start <your_mysql_password>` or `node server.js <your_mysql_password>`

## Other useful commands
### MySQL (in terminal)
* Start MySQL server (need to run this first): `sudo service mysql start`
* See all local databases: `SHOW DATABASES;`
* Select a database to use/reference (need to do this before viewing tables): `USE <database_name>;`
* See tables in selected database: `SHOW TABLES;`
* See format of a table in selected database: `DESCRIBE <table_name>;`
* See all entries of a table: `SELECT * FROM  <table_name>;`
* See all entries of a table matching a certain criteria: `SELECT * FROM <table_name> WHERE <field_name> = "<desired_value>";`
* Example using "users" table: `SELECT * FROM users WHERE firstname = "Kai";`
* See certain columns given a certain criteria: `SELECT <col 1>, <col 2>... FROM <table_name> WHERE <field_name> = "<desired_value>";`
* Example using "users" table: `SELECT firstname FROM users WHERE lastname = "Rai";`
>>>>>>> 92f44cf611748b50e9279f47e3bd927072550a5f
