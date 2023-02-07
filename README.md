# E-commerce-Back-End

## Technology Used

| Technology Used         | Resource URL           | 
| ------------- |:-------------:|   
| Git | [https://git-scm.com/](https://git-scm.com/)     |   
| JavaScript   | [https://developer.mozilla.org/en-US/docs/Learn/JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript)      |
| Node.js  | [https://nodejs.org/docs/latest-v16.x/api/synopsis.html](https://nodejs.org/docs/latest-v16.x/api/synopsis.html)     |
| Express.js  |   [http://expressjs.com/](http://expressjs.com/)
| MySql   |  [https://dev.mysql.com/doc/mysql-shell/8.0/en/mysql-shell-getting-started.html](https://dev.mysql.com/doc/mysql-shell/8.0/en/mysql-shell-getting-started.html)    |
| Sequelize  | [https://sequelize.org/docs/v6/](https://sequelize.org/docs/v6/)   |


## Description

A command-line application that helps developers to understand the fundamental architecture of e-commerce site. The challenge of this product was to take a working Express.js API and configure it to use Sequelize to interact with a MySQL database to build the back end for an e-commerce site.

[Walkthrough Video](https://drive.google.com/file/d/1goR--R_GNxoiZHOYHoXum_SEOxBh0mpj/view)

![./Develop/assets/images/E-commerce.gif](./Develop/assets/images/E-commerce.gif)


## Table of Contents

- [Code Example](#code-example)
- [Installation](#installation)
- [Usage](#usage)
- [Learning Points](#learning-points)
- [Author Info](#author-info)
- [Credits](#credits)
- [License](#license)


## Code Example

These lines of code show how Sequelize models are defined as JavaScript classes. The init() method allows us to define which properties the model has. These properties will become the table columns in MySQL.
We pass a second object to the init() method to link the model to the sequelize connection object, which is required for the model to work.
```js
// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "category",
        key: "id"
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
```

## Installation

- Clone the repository to your local directory
- Create a .gitignore file that includes `"node_modules/"`, `".env"`  and  `" .DS_Store/"` before installing any npm dependencies.
- Run `npm init` to include a `package.json` to your repo with required dependencies.
- To get started, we include sequelize as a dependency. We also include mysql2 to specify which flavor of SQL the Sequelize library should use, as follows:
```js
"dependencies": {
  "dotenv": "^8.2.0",
  "express": "^4.17.1",
  "mysql2": "^2.2.5",
  "sequelize": "^6.3.5"
}
```
- We use the Sequelize() constructor to create a new database connection, specifying the user credentials and location of the MySQL database. Change the credentials to match your own before moving on:
```js
const sequelize = new Sequelize(
  // Database name
  'library_db',
  // User
  'root',
  // Password
  'myPassword',
  {
    // Database location
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  }
);
```
- Create a .env file to store the environment variables, as follows:
```js
DB_NAME=library_db
DB_PASSWORD=
DB_USER=
```
- Import the connection object, as follows:
```js
const sequelize = require('./config/connection');
```
- Use the sync() method to connect to the database, as shown in the following example:
```js
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
```


## Usage

- Using terminal, navigate to the root directory of your project in the command-line.
- Run `mysql -u root -p` and hit enter button.
- When prompted to enter a password, go ahead and enter password created for your mysql application.
- While in mysql instance, run `source ./db/schema.sql` and you should receive OK message on terminal to confirm that your database has been created and configured.
- Run `quit` to quit mysql and go back to your terminal working directory.
- Run `npm install` to install all your package dependencies.
- Run `node ./seeds/seed.js` to configure your seed file.
- Run the command `node server.js` to start the application.

## Learning Points

- Connect to a database using Sequelize and environment variables.
- Create and configure a Sequelize model.
- Perform CRUD operations with Sequelize methods.
- Write a script to seed a database with initial data.
- Convert asynchronous code to synchronous code using async and await (sort of)...
- Catch errors with try...catch.
- Ensure that HTTP requests respond with the correct status code.
- Perform checks on a Sequelize model with validation tools.
- Encrypt a password with bcrypt.
- Automate functionality using Sequelize Hooks.
- Create and run a custom method on a Sequelize instance.
- Implement various Sequelize associations to create one-to-one, one-to-many, and many-to-many data relationships.
- Perform subqueries using a combination of Sequelize methods and plain SQL syntax.
- Enforce code styling for an application using ESLint.




## Author Info 

```md
### Gladys Ange Isingizwe 


* [Email](gladyisingizwe@gmail.com)
* [LindeIn](www.linkedin.com/in/gladys-isingizwe)
* [Github]()https://github.com/Isglad
```

## Credits

Collaborators on this project are instructional staff, TAs and winter cohort 2022 of the University of Calfornia Berkeley Coding Bootcamp.

## License

Please refer to the LICENSE in the repo.