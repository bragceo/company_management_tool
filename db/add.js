// Purpose: Add data to the database

const db = require('./conn');
const consoleTable = require('console.table');
const inquirer = require('inquirer');

// Add a department
function newDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?'
        }
    ]).then(answers => {
        db.promise().query(`INSERT INTO department (name) VALUES ("${answers.name}")`).then(([rows, fields]) => {
            console.log(`Added ${answers.name} to the database.`);
            promptAgain();
        }).catch(console.log);
    });
}

// Add a role
function newRole() {
    db.promise().query('SELECT * FROM department').then(([rows, fields]) => {
        const departments = rows.map(department => {
            return {
                name: department.name,
                value: department.id
            }
        });
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the name of the role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?'
            },
            {
                type: 'list',
                name: 'department',
                message: 'Which department does the role belong to?',
                choices: departments
            }
        ]).then(answers => {
            db.promise().query(`INSERT INTO role (title, salary, department_id) VALUES ("${answers.title}", ${answers.salary}, ${answers.department})`).then(([rows, fields]) => {
                console.log(`Added ${answers.title} to the database.`);
                promptAgain();
            }).catch(console.log);
        });
    }).catch(console.log);
}

// Add an employee
function newEmployee() {
    db.promise().query('SELECT * FROM role').then(([rows, fields]) => {
        const roles = rows.map(role => {
            return {
                name: role.title,
                value: role.id
            }
        });
        db.promise().query('SELECT * FROM employee').then(([rows, fields]) => {
            const managers = rows.map(employee => {
                return {
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id
                }
            });
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'What is the first name of the employee?'
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'What is the last name of the employee?'
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'What is the role of the employee?',
                    choices: roles
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: 'Who is the manager of the employee?',
                    choices: managers
                }
            ]).then(answers => {
                db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answers.first_name}", "${answers.last_name}", ${answers.role}, ${answers.manager})`).then(([rows, fields]) => {
                    console.log(`Added ${answers.first_name} ${answers.last_name} to the database.`);
                    promptAgain();
                }).catch(console.log);
            });
        }).catch(console.log);
    }).catch(console.log);
}

function promptAgain() {
    const promptUser = require('../utils/ui');
    promptUser();
}


module.exports = {
    newDepartment,
    newRole,
    newEmployee
}