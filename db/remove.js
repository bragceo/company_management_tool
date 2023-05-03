// Purpose: Update data in the database

const db = require('./conn');
const consoleTable = require('console.table');
const inquirer = require('inquirer');

// delete a department
function deleteDepartment() {
    db.promise().query('SELECT * FROM department').then(([rows, fields]) => {
        const departments = rows.map(department => {
            return {
                name: department.name,
                value: department.id
            }
        });
        inquirer.prompt([
            {
                type: 'list',
                name: 'department',
                message: 'Which department would you like to delete?',
                choices: departments
            }
        ]).then(answers => {
            db.promise().query(`DELETE FROM department WHERE id = ${answers.department}`).then(([rows, fields]) => {
                console.log(`Deleted department.`);
                promptAgain();
            }).catch(console.log);
        });
    }).catch(console.log);
}

// delete a role
function deleteRole() {
    db.promise().query('SELECT * FROM role').then(([rows, fields]) => {
        const roles = rows.map(role => {
            return {
                name: role.title,
                value: role.id
            }
        });
        inquirer.prompt([
            {
                type: 'list',
                name: 'role',
                message: 'Which role would you like to delete?',
                choices: roles
            }
        ]).then(answers => {
            db.promise().query(`DELETE FROM role WHERE id = ${answers.role}`).then(([rows, fields]) => {
                console.log(`Deleted role.`);
                promptAgain();
            }).catch(console.log);
        });
    }).catch(console.log);
}

// delete an employee
function deleteEmployee() {
    db.promise().query('SELECT * FROM employee').then(([rows, fields]) => {
        const employees = rows.map(employee => {
            return {
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
            }
        });
        inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Which employee would you like to delete?',
                choices: employees
            }
        ]).then(answers => {
            db.promise().query(`DELETE FROM employee WHERE id = ${answers.employee}`).then(([rows, fields]) => {
                console.log(`Deleted employee.`);
                promptAgain();
            }).catch(console.log);
        });
    }).catch(console.log);
}



function promptAgain() {
    const promptUser = require('../utils/ui');
    promptUser();
}


module.exports = {
    deleteDepartment,
    deleteRole,
    deleteEmployee
}