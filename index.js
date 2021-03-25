// This file contains the code for initializing the app and connecting to the DB (I think... should the DB connection be in another file?)

//Need a folder for classes/constructors, problably, with separate files for each employee class, just like the Employee Profile Generator

//Call dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
// const { async } = require('rxjs');
const Query = require('./lib/Query');
const Create = require('./lib/Create');
const Update = require('./lib/Update');
const Delete = require('./lib/Delete');

//Create connection to DB
const connection = mysql.createConnection({
   host: 'localhost',
   port: 3306,
   user: 'root',
   password: 'CodeAllTheThings!',
   database: 'employee_mgmtDB'
});

const questions = [
   {
      type: 'list',
      name: 'actions',
      message: 'What would you like to do?',
      choices: ['View data', 'Add data', 'Change data', 'Delete data', 'Exit application']
   },
   {
      type: 'list',
      name: 'queries',
      message: 'What data would you like to view?',
      choices: ['Employees', 'Roles', 'Departments', 'Employees by manager', 'Budget by department']
   },
   {
      type: 'list',
      name: 'additions',
      message: 'What data would you like to add?',
      choices: ['New employee', 'New role', 'New department']
   },
   {
      type: 'list',
      name: 'updates',
      message: 'What data would you like to update?',
      choices: ['Employee role', 'Employee manager', 'Department name']
   },
   {
      type: 'list',
      name: 'deletions',
      message: 'What data would you like to delete?',
      choices: ['An employee', 'A role', 'A department']
   },
   {
      type: 'confirm',
      name: 'do_more',
      message: 'Would you like to do something else?'
   }
]

async function start() {
   debugger
   console.log(`
   .----------------------------------------------.
   | WELCOME TO THE EMPLOYEE MANAGEMENT TERMINAL! |
   '----------------------------------------------'
   `)
   
   //Initiation prompt 
   const { action } = await inquirer.prompt(questions.actions);

   //Call handler classes
   const create = new Create;
   const query = new Query;
   const update = new Update;
   const remove = new Delete;

   //Helper function for doing more stuff
   function doMore() {
      let doMore = await inquirer.prompt(questions.do_more);

      if (doMore){
         return start();
      }
      else {
         connection.end();
      };
   };

   switch (action) {
      case 'View data':
         let selectView = await inquirer.prompt(questions.queries);

         if (selectView === 'Employees'){
            query.readEmployees();
            doMore();
         }
         else if (selectView === 'Roles'){
            query.readRoles();
            doMore();
         }
         else if (selectView === 'Departments'){
            query.readDepartments();
            doMore();
         }
         else if (selectView === 'Employees by manager'){
            query.empByMgr();
            doMore();
         }
         else if (selectView === 'Budget by department'){
            query.budgets();
            doMore();
         }
         break;
      case 'Add data':
         let addData = inquirer.prompt(questions.additions);

         if (addData === 'New employee'){
            create.newEmployee();
            doMore();
         }
         else if (addData === 'New role'){
            create.newRole();
            doMore();
         }
         else if (addData === 'New department'){
            create.newDepartment();
            doMore();
         }
         break;
      case 'Change data':
         let changeData = inquirer.prompt(questions.updates);

         if (changeData === 'Employee role'){

         }
         else if (changeData === 'Employee manager'){

         }
         else if (changeData === 'Department name'){

         }
         break;
      case 'Delete data':
         let deleteData = inquirer.prompt(questions.deletions);

         if (deleteData === 'An employee'){

         }
         else if (deleteData === 'A role'){

         }
         else if (deleteData === 'A department'){

         }
         break;
      case 'Exit application':
         connection.end();
         break;
   }
   
};

//Initialize app
connection.connect((err) => {
   if (err) throw err;
   console.log(`Connection successful using id ${connection.threadId}\n`);
   start();
})
