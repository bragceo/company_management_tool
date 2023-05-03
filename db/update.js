// Purpose: Update data in the database

const db = require('./conn');
const consoleTable = require('console.table');
const inquirer = require('inquirer');

// Update employee role
function employeeRole() {
    db.promise().query('SELECT * FROM employee').then(([rows, fields]) => {
        const employees = rows.map(employee => {
            return {
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
            }
        });
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
                    name: 'employee',
                    message: 'Which employee\'s role would you like to update?',
                    choices: employees
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'What is the employee\'s new role?',
                    choices: roles
                }
            ]).then(answers => {
                db.promise().query(`UPDATE employee SET role_id = ${answers.role} WHERE id = ${answers.employee}`).then(([rows, fields]) => {
                    console.log(`Updated employee role.`);
                    promptAgain();
                }).catch(console.log);
            });
        }).catch(console.log);
    }).catch(console.log);
}

// Update employee manager
function employeeManager() {
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
                message: 'Which employee\'s manager would you like to update?',
                choices: employees
            },
            {
                type: 'list',
                name: 'manager',
                message: 'Who is the employee\'s new manager?',
                choices: employees
            }
        ]).then(answers => {
            db.promise().query(`UPDATE employee SET manager_id = ${answers.manager} WHERE id = ${answers.employee}`).then(([rows, fields]) => {
                console.log(`Updated employee manager.`);
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
    employeeRole,
    employeeManager
}