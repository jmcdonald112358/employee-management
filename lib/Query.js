//This file contains a single class to hold all DB queries

const inquirer = require("inquirer");

class Query {

   readEmployees (connection, doMore) {
      return connection.query('SELECT * FROM employees', (err, res) => {
         if (err) throw err;
         console.table(res);
         doMore();
      });
   };

   readRoles (connection, doMore) {
      return connection.query('SELECT * FROM emp_roles', (err, res) => {
         if (err) throw err;
         console.table(res);
         doMore();
      });
   };

   readDepartments (connection, doMore) {
      return connection.query('SELECT * FROM departments', (err, res) => {
         if (err) throw err;
         console.table(res);
         doMore();
      });
   };

   empByMgr (connection, doMore) {
      inquirer.prompt({
         name: 'selectMgr',
         type: 'input',
         message: 'Enter manager ID to view: ',
         // validate: function (input) {
         //    let id = parseInt(input);
         //    if (typeof id != 'number') {
         //       return 'Please enter a number'
         //    };
         //    return true;
         // }
      }).then((answer) => {
         let query = 'SELECT * FROM employees WHERE manager_id = ?';

         return connection.query(query, [answer.selectMgr], (err, res) => {
            if (err) throw err;
            console.table(res);
            doMore();
         });
      });
   };

   budgets (connection, doMore) {
      let query = 'SELECT departments.dept_id, departments.dept_name, SUM(emp_roles.salary) AS budget FROM departments LEFT JOIN emp_roles ON emp_roles.department_id = departments.dept_id LEFT JOIN employees ON employees.role_id = emp_roles.role_id GROUP BY departments.dept_id, departments.dept_name';

      return connection.query(query, (err, res) => {
         if (err) throw err;
         console.table(res);
         doMore();
         });
   };
}

module.exports = Query;