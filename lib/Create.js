// This file contains a class to hold all functions for creating a new DB entry

const inquirer = require("inquirer");

class Create {
   async newEmployee(connection, doMore) {
      await inquirer.prompt(
         [{
         name: 'firstName',
         type: 'input',
         message: 'Enter employee first name: ',
         validate: function (input) {
            if (input === null) {
               return 'Please enter a number'
            };
            return true;
            }
         },
         {
            name: 'lastName',
            type: 'input',
            message: 'Enter employee last name: ',
            validate: function (input) {
               if (input === null) {
                  return 'Please enter a number'
               };
               return true;
            }
         },
         {
            name: 'role',
            type: 'input',
            message: 'Enter employee role ID: ',
            validate: function (input) {
               if (input === null) {
                  return 'Please enter a number'
               };
               return true;
            }
         },
         {
            name: 'manager',
            type: 'input',
            message: 'Enter employee manager ID: ',
            default: 'Enter 0 if the employee does not have a manager'
         }
         ])
      .then((answers) => {
         let query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';

         return connection.query(query, [answers.firstName, answers.lastName, parseInt(answers.role), parseInt(answers.manager)], (err, res) => {
            if (err) throw err;
            console.log('Employee added successfully!');
            console.table(res);
            doMore();
         });
      });
   };

   async newRole(connection, doMore) {
      await inquirer.prompt(
         [{
            name: 'title',
            type: 'input',
            message: 'Enter title for new role: ',
            validate: function (input) {
               if (input === null) {
                  return 'Please enter a number'
               };
               return true;
            }
         },
         {
            name: 'salary',
            type: 'input',
            message: 'Enter salary for the new role: ',
            validate: function (input) {
               if (input === null) {
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
               if (input === null) {
                  return 'Please enter a number'
               };
               return true;
            }
         }
         ])
      .then((answers) => {
         let query = 'INSERT INTO emp_roles (title, salary, department_id) VALUES (?, ?, ?)';

         return connection.query(query, [answers.title, parseInt(answers.salary), parseInt(answers.department)], (err, res) => {
            if (err) throw err;
            console.log('New role added successfully!');
            console.table(res);
            doMore();
         });
      });
   };

   newDepartment(connection, doMore) {
      inquirer.prompt(
         [{
            name: 'deptName',
            type: 'input',
            message: 'Enter new department name: ',
            validate: function (input) {
               if (input === null) {
                  return 'Please enter a number'
               };
               return true;
            }
         }
         ])
      .then((answers) => {
         let query = 'INSERT INTO departments (dept_name) VALUES (?)';

         return connection.query(query, [answers.deptName], (err, res) => {
            if (err) throw err;
            console.log('New department added successfully!');
            console.table(res);
            doMore();
         });
      });
   };
}

module.exports = Create;