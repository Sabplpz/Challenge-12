const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');
require('dotenv').config();

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    console.log(`Connected to the business_db database.`)
  );

function viewEmployee() {
  db.query('SELECT * FROM employee', function (err, results) {
    console.table(results);
    mainMenu();
  });
}

function viewDepartment() {
  db.query('SELECT * FROM department', function (err, results) {
    console.table(results);
    mainMenu();
  });
}

function viewRole() {
  db.query('SELECT * FROM role', function (err, results) {
    console.table(results);
    mainMenu();
  });
}

function addDepartment() {
  inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: "What's the name of the new department?"
    }
  ])
  .then((answers) => {
    db.query(`INSERT INTO department (name) VALUES ("${answers.name}")`, function (err, results) {
      console.log("New department has been added!");
      mainMenu();
    });
  });
}

function addRole() {
  inquirer
  .prompt([
    {
      type: 'input',
      name: 'title',
      message: "What's the title of the new role?"
    },
    {
      type: 'input',
      name: 'salary',
      message: "What's the salary of the new role?"
    },
    {
      type: 'input',
      name: 'dept',
      message: "What's the department ID of the new role?"
    }
  ])
  .then((answers) => {
    db.query(`INSERT INTO role (title, salary, department_id) 
    VALUES ("${answers.title}", ${answers.salary}, ${answers.dept})`, 
    function (err, results) {
      console.log("New role has been added!");
      mainMenu();
    });
  });
}

function addEmployee() {
  inquirer
  .prompt([
    {
      type: 'input',
      name: 'first',
      message: "What's the first name of the new employee?"
    },
    {
      type: 'input',
      name: 'last',
      message: "What's the last name of the new employee?"
    },
    {
      type: 'input',
      name: 'role',
      message: "What's the role ID of the new employee?"
    },
    {
      type: 'input',
      name: 'manager',
      message: "What's the manager ID of the new employee?"
    }
  ])
  .then((answers) => {
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ("${answers.first}", "${answers.last}", ${answers.role}, ${answers.manager})`, 
    function (err, results) {
      console.log("New employee has been added!");
      mainMenu();
    });
  });
}

function updateEmployee() {
  inquirer
  .prompt([
    {
      type: 'input',
      name: 'employee',
      message: "What's the employee ID you want to update?"
    },
    {
      type: 'input',
      name: 'role',
      message: "What's the new role ID of the employee?"
    }
  ])
  .then((answers) => {
    db.query(`UPDATE employee
    SET role_id = '${answers.role}'
    WHERE id = ${answers.employee};`, 
    function (err, results) {
      console.log("Role has been updated for this employee!");
      mainMenu();
    });
  });
}

function mainMenu() {
  inquirer
  .prompt([
    {
      type: 'list',
      name: 'view',
      message: 'What do you want to view?',
      choices: ["View all employees", "View all roles", "View all departments", "Add Department", "Add Role", "Add Employee", "Update employee role", "Exit"],
    },
  ])
  .then(answers => {

    switch (answers.view) {
      case 'View all employees':
        viewEmployee();
        break;
      case 'View all roles':
        viewRole();
        break;
      case 'View all departments':
        viewDepartment();
        break;
      case 'Add Department':
        addDepartment();
        break;
      case 'Add Role':
        addRole();
        break;
      case 'Add Employee':
        addEmployee();
        break;
      case 'Update employee role':
        updateEmployee();
        break;
      case 'Exit':
        console.log("Thank you for using our app!");
        break;
      default:
        console.log('Oh oh! Choose again!');
    }
  });
};

mainMenu();