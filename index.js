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

const questions = {
   actions: [{
      type: 'list',
      name: 'actions',
      message: 'What would you like to do?',
      choices: ['View data', 'Add data', 'Change data', 'Delete data', 'Exit application']
   }],
   queries: [{
      type: 'list',
      name: 'queries',
      message: 'What data would you like to view?',
      choices: ['Employees', 'Roles', 'Departments', 'Employees by manager', 'Budget by department']
   }],
   // {
   //    type: 'list',
   //    name: 'additions',
   //    message: 'What data would you like to add?',
   //    choices: ['New employee', 'New role', 'New department']
   // },
   // {
   //    type: 'list',
   //    name: 'updates',
   //    message: 'What data would you like to update?',
   //    choices: ['Employee role', 'Employee manager', 'Department name']
   // },
   // {
   //    type: 'list',
   //    name: 'deletions',
   //    message: 'What data would you like to delete?',
   //    choices: ['An employee', 'A role', 'A department']
   // },
   do_more: [{
      type: 'confirm',
      name: 'do_more',
      message: 'Would you like to do something else?'
   }]
}

//Helper function for doing more stuff
async function doMore() {
   let {do_more} = await inquirer.prompt(questions.do_more);

   if (do_more){
      return start();
   }
   else {
      connection.end();
   };
};


async function start() {
   console.log(`
   .----------------------------------------------.
   | WELCOME TO THE EMPLOYEE MANAGEMENT TERMINAL! |
   '----------------------------------------------'
   `)
   
   //Initiation prompt 
   const { actions } = await inquirer.prompt(questions.actions);

   //Call handler classes
   const create = new Create;
   const query = new Query;
   const update = new Update;
   const remove = new Delete;

   console.log(actions);
   switch (actions) {
      case 'View data':
         let {queries} = await inquirer.prompt(questions.queries);

         if (queries === 'Employees'){
            query.readEmployees(connection, doMore);
         }
         else if (queries === 'Roles'){
            query.readRoles(connection, doMore);
         }
         else if (queries === 'Departments'){
            query.readDepartments(connection, doMore);
         }
         else if (queries === 'Employees by manager'){
            query.empByMgr(connection, doMore);
         }
         else if (queries === 'Budget by department'){
            query.budgets(connection, doMore);
         }
         break;
      case 'Add data':
         let addData = inquirer.prompt(questions.additions);

         if (addData === 'New employee'){
            create.newEmployee(connection, doMore);
         }
         else if (addData === 'New role'){
            create.newRole(connection, doMore);
         }
         else if (addData === 'New department'){
            create.newDepartment(connection, doMore);
         }
         break;
      case 'Change data':
         let changeData = inquirer.prompt(questions.updates);

         if (changeData === 'Employee role'){
            update.employeeRole(connection, doMore);
         }
         else if (changeData === 'Employee manager'){
            update.employeeManager(connection, doMore);
         }
         else if (changeData === 'Department name'){
            update.deptName(connection, doMore);
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
