//This file contains a class to hold all functions for updating DB entries

const inquirer = require("inquirer");

class Update {
   async employeeRole(connection, doMore){

      await connection.query('SELECT * from emp_roles', async (err, res) => {
         if (err) throw err;

         console.log('Current role information:');
         console.table(res);
         

         inquirer.prompt(
            [{
               name: 'selectRole',
               type: 'input',
               message: 'Enter ID of the role you want to modify: '
            }])
            .then(({selectRole}) => {
               inquirer.prompt(
                  [{
                     name: 'newRole',
                     type: 'list',
                     choices: ['title', 'salary', 'department_id'],
                     message: 'Select role element to update: '
                  }])
                  .then(({newRole}) => {
                     inquirer.prompt(
                        [{
                           name: 'newInfo',
                           type: 'input',
                           message: `Enter new ${newRole}: `
                        }]
                     )
                     .then(({newInfo}) => {
                        connection.query('UPDATE emp_roles SET ?? = ? WHERE role_id = ?', [newRole, newInfo, selectRole], (err, res) => {
                           if (err) throw err;
                           doMore();
                        })
                     })
                  }
               )
            });
      });
      
   };

   employeeManager() {

   };

   deptName() {

   };
}

module.exports = Update;