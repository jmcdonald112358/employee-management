// This file contains a class to hold all functions for creating a new DB entry

const inquirer = require("inquirer");

class Create {
   newEmployee() {
      inquirer.prompt(
         {
         name: 'firstName',
         type: 'input',
         message: 'Enter employee first name: '
         },
         {
            name: 'lastName',
            type: 'input',
            message: 'Enter employee last name: '
         },
         {
            name: 'role',
            type: 'input',
            message: 'Enter employee role ID: ',
            validate: function (input) {
               if (typeof input != 'number') {
                  return 'Please enter a number'
               };
               return true;
            }
         },
         {
            name: 'manager',
            type: 'input',
            message: 'Enter employee manager ID: ',
            default: 'Enter a number or leave blank if the employee does not have a manager'
         }
      )
      .then((answers) => {
         let query = 'INSERT INTO employees (?, ?, ?, ?)';

         connection.query(query, [answers.firstName, answers.lastName, answers.role, answers.manager], (err, res) => {
            if (err) throw err;
            console.log('Employee added successfully!');
            console.table(res);
         });
      });
   };

   newRole() {
      inquirer.prompt(
         {
            name: 'title',
            type: 'input',
            message: 'Enter title for new role: '
         },
         {
            name: 'salary',
            type: 'input',
            message: 'Enter salary for the new role: ',
            validate: function (input) {
               if (typeof input != 'number') {
                  return 'Please enter a number'
               };
               return true;
            }
         },
         {
            name: 'department',
            type: 'input',
            message: 'Enter department ID for the new role: ',
            validate: function (input) {
               if (typeof input != 'number') {
                  return 'Please enter a number'
               };
               return true;
            }
         }
      )
      .then((answers) => {
         let query = 'INSERT INTO emp_roles (?, ?, ?)';

         connection.query(query, [answers.title, answers.salary, answers.department], (err, res) => {
            if (err) throw err;
            console.log('New role added successfully!');
            console.table(res);
         });
      });
   };

   newDepartment() {
      inquirer.prompt(
         {
            name: 'deptName',
            type: 'input',
            message: 'Enter new department name: '
         }
      )
      .then((answers) => {
         let query = 'INSERT INTO departments (?)';

         connection.query(query, [answers.deptName], (err, res) => {
            if (err) throw err;
            console.log('New department added successfully!');
            console.table(res);
         });
      });
   };
}

module.exports = Create;