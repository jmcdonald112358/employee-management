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
            }
         );
      });
   };

   async employeeManager(connection, doMore) {

      await inquirer.prompt([
         {
            name: 'empId',
            type: 'input',
            message: 'Enter the employee ID you wish to modify: '
         },
         {
            name: 'newMgr',
            type: 'input',
            message: 'Enter new manager ID: '
         }
      ])
      .then(({empId, newMgr}) => {
         console.log('You are updating employee ' + empId + ' to manager ' + newMgr);

         let query = 'UPDATE employees SET manager_id = ? WHERE emp_id = ?'
         connection.query(query, [newMgr, empId], (err, res) => {
            if (err) throw err;
            console.log('Manager updated successfully!');
            doMore();
         });
      })
   };

   async deptName(connection, doMore) {

      await connection.query('SELECT * from departments', (err, res) => {
         if (err) throw err;

         console.log('Current departments:');
         console.table(res);

         inquirer.prompt([
            {
               name: 'deptSelection',
               type: 'input',
               message: 'Enter ID of the department you want to update: '
            }
         ])
         .then(({deptSelection}) => {
            inquirer.prompt([
               {
                  name: 'newDeptName',
                  type: 'input',
                  message: 'Enter new department name: '
               }
            ])
            .then(({newDeptName}) => {
               connection.query('UPDATE departments SET ?? = ? WHERE ?? = ?', ['dept_name', newDeptName, 'dept_id', deptSelection], (err, res) => {
                  if (err) throw err;
                  doMore();
               })
            })
         })
      })   
   }
}

module.exports = Update;