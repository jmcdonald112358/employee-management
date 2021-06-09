//Call dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
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

//Define questions for inquirer prompts
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
   additions: [{
      type: 'list',
      name: 'additions',
      message: 'What data would you like to add?',
      choices: ['New employee', 'New role', 'New department']
   }],
   updates: [{
      type: 'list',
      name: 'updates',
      message: 'What data would you like to update?',
      choices: ['Employee role', 'Employee manager', 'Department name']
   }],
   deletions: [{
      type: 'list',
      name: 'deletions',
      message: 'What data would you like to delete?',
      choices: ['An employee', 'A role', 'A department']
   }],
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
   const query = new Query; //Used in 'view data' switch case
   const create = new Create; //Used in 'add data' switch case
   const update = new Update;
   const remove = new Delete;

   switch (actions) {
      case 'View data':
         let { queries } = await inquirer.prompt(questions.queries);

         console.log('You selected: ' + queries);
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
         let { additions } = await inquirer.prompt(questions.additions);

         console.log('You selected: ' + additions);
         if (additions === 'New employee'){
            create.newEmployee(connection, doMore);
         }
         else if (additions === 'New role'){
            create.newRole(connection, doMore);
         }
         else if (additions === 'New department'){
            create.newDepartment(connection, doMore);
         }
         break;
      case 'Change data':
         let { updates } = await inquirer.prompt(questions.updates);

         console.log('You selected: ' + updates);
         if (updates === 'Employee role'){
            update.employeeRole(connection, doMore);
         }
         else if (updates === 'Employee manager'){
            update.employeeManager(connection, doMore);
         }
         else if (updates === 'Department name'){
            update.deptName(connection, doMore);
         }
         break;
      case 'Delete data':
         let { deletions } = await inquirer.prompt(questions.deletions);

         console.log('You selected: ' + deletions);
         if (deletions === 'An employee'){
            remove.employee(connection, doMore);
         }
         else if (deletions === 'A role'){
            remove.role(connection, doMore);
         }
         else if (deletions === 'A department'){
            remove.department(connection, doMore);
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
