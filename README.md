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

## Initialize Where'd It Go?! database (only done once, already done)
* `node setup.js`

## Run the server
* Can run either `npm start` or `node server.js`

## Other useful commands
### MySQL (in terminal)
* Start MySQL server (need to run this first): `sudo service mysql start`
* Start MySQL on localhost as root: `mysql -u root -p` or `mysql -h localhost -u root -p`
* Start MySQL given a host and user: `mysql -h <host> -u <user> -p`
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

### Heroku (in terminal)
* Log into your heroku: `heroku login`
* Log out of your heroku: `heroku logout`
* Push to heroku branch for app deployment: `git push heroku master`
* Note: git add and commit work the same way
* See processes/dynos running: `heroku ps`
* Start app to run on n servers: `heroku ps:scale web=n`
* Start app to run on 1 server: `heroku ps:scale web=1`
