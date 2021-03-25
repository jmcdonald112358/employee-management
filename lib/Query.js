//This file contains a single class to hold all DB queries

const inquirer = require("inquirer");

class Query {

   readEmployees () {
      connection.query('SELECT * FROM employees', (err, res) => {
         if (err) throw err;
         console.table(res);
      });
   };

   readRoles () {
      connection.query('SELECT * FROM emp_roles', (err, res) => {
         if (err) throw err;
         console.table(res);
      });
   };

   readDepartments () {
      connection.query('SELECT * FROM departments', (err, res) => {
         if (err) throw err;
         console.table(res);
      });
   };

   empByMgr () {
      inquirer.prompt({
         name: 'selectMgr',
         type: 'input',
         message: 'Enter manager ID to view: ',
         validate: function (input) {
            if (typeof input != 'number') {
               return 'Please enter a number'
            };
            return true;
         }
      }).then((answer) => {
         let query = 'SELECT * FROM employees WHERE manager_id = ?';

         connection.query(query, [answer.selectMgr], (err, res) => {
            if (err) throw err;
            console.table(res);
         });
      });
   };

   budgets () {
      inquirer.prompt({
         name: 'selectDept',
         type: 'input',
         message: 'Enter department ID to view: ',
         validate: function (input) {
            if (typeof input != 'number') {
               return 'Please enter a number'
            };
            return true;
         }
      }).then((answer) => {
      let query = 'SELECT role_id FROM employees INNER JOIN emp_roles ON role_id WHERE department_id = ?';

      connection.query(query, [answer.selectDept], (err, res) => {
         if (err) throw err;
         console.table(res);
         });
      });
   };
}

module.exports = Query;