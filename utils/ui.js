const inquirer = require('inquirer');
const view = require('../db/view');
const add = require('../db/add');
const update = require('../db/update');
const remove = require('../db/remove');

function promptUser() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Update an employee\'s manager',
                'View employees by manager',
                'View employees by department',
                'Delete a department',
                'Delete a role',
                'Delete an employee',
                'View department budgets',
                'Quit'
            ]
        }
    ]).then(answers => {
        switch (answers.action) {
            case 'View all departments':
                view.allDepartments();
                break;
            case 'View all roles':
                view.allRoles();
                break;
            case 'View all employees':
                view.allEmployees();
                break;
            case 'Add a department':
                add.newDepartment();
                break;
            case 'Add a role':
                add.newRole();
                break;
            case 'Add an employee':
                add.newEmployee();
                break;
            case 'Update an employee role':
                update.employeeRole();
                break;
            case 'Update an employee\'s manager':
                update.employeeManager();
                break;
            case 'View employees by manager':
                view.employeesByManager();
                break;
            case 'View employees by department':
                view.employeesByDepartment();
                break;
            case 'Delete a department':
                remove.deleteDepartment();
                break;
            case 'Delete a role':
                remove.deleteRole();
                break;
            case 'Delete an employee':
                remove.deleteEmployee();
                break;
            case 'View department budgets':
                view.departmentBudget();
                break;
            case 'Quit':
                console.log('Goodbye!');
                process.exit();
        }
    });
}

module.exports = promptUser;