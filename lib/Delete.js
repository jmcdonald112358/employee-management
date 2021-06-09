//This file contains a class to hold all functions for deleting a DB entry

const inquirer = require("inquirer");

class Delete {
   async employee(connection, doMore) {
      await inquirer.prompt(
         [{
            name: 'targetEmp',
            type: 'input',
            message: 'Enter ID of the employee you wish to delete: '
         }]
      ).then(({targetEmp}) => {
         let query = 'DELETE FROM employees WHERE ?? = ?';

         return connection.query(query, ['emp_id', targetEmp], (err, res) => {
            if (err) throw err;
            console.log('Employee removed successfully!');
            doMore();
         })
      })
   }

   async role(connection, doMore) {
      await inquirer.prompt(
         [{
            name: 'targetRole',
            type: 'input',
            message: 'Enter ID of the role you wish to delete: '
         }]
      ).then(({targetRole}) => {
         let query = 'DELETE FROM emp_roles WHERE ?? = ?';

         return connection.query(query, ['role_id', targetRole], (err, res) => {
            if (err) throw err;
            console.log('Role removed successfully!');
            doMore();
         })
      })
   }

   async department(connection, doMore) {
      await inquirer.prompt(
         [{
            name: 'targetDept',
            type: 'input',
            message: 'Enter ID of the department you wish to delete: '
         }]
      ).then(({targetDept}) => {
         let query = 'DELETE FROM departments WHERE ?? = ?';

         return connection.query(query, ['dept_id', targetDept], (err, res) => {
            if (err) throw err;
            console.log('Department removed successfully!');
            doMore();
         })
      })
   }
}

module.exports = Delete;