// Purpose: View data from the database
const inquirer = require('inquirer');

const db = require('./conn');
const consoleTable = require('console.table');

// View all departments
function allDepartments() {
    db.promise().query('SELECT * FROM department').then(([rows, fields]) => {
        console.table('\n', rows, '\n');
        promptAgain();
    }).catch(console.log);
}

// View all roles
function allRoles() {
    db.promise().query('SELECT r.id as id, r.title as title, d.name as department, r.salary as salary from role r left join department d on r.department_id = d.id').then(([rows, fields]) => {
        console.table('\n', rows, '\n');
        promptAgain();
    }).catch(console.log);
}

// View all employees
function allEmployees() {
    db.promise().query(`SELECT e.id as id, e.first_name as first_name, e.last_name as last_name, r.title as title, d.name as department, r.salary as salary, CONCAT(e2.first_name, " ", e2.last_name) as manager
    FROM role r
    LEFT JOIN department d ON r.department_id = d.id
    INNER JOIN employee e ON e.role_id = r.id
    LEFT JOIN employee e2 ON e2.id = e.manager_id;`).then(([rows, fields]) => {
        console.table('\n', rows, '\n');
        promptAgain();
    }).catch(console.log);
}

// View employees by manager
function employeesByManager() {
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
                name: 'manager',
                message: 'Which manager\'s employees would you like to view?',
                choices: employees
            }
        ]).then(answers => {
            db.promise().query(`SELECT e.id as id, e.first_name as first_name, e.last_name as last_name, r.title as title, d.name as department, r.salary as salary, CONCAT(e2.first_name, " ", e2.last_name) as manager
            FROM role r
            LEFT JOIN department d ON r.department_id = d.id
            INNER JOIN employee e ON e.role_id = r.id
            LEFT JOIN employee e2 ON e2.id = e.manager_id
            WHERE e.manager_id = ${answers.manager};`).then(([rows, fields]) => {
                console.table('\n', rows, '\n');
                promptAgain();
            }).catch(console.log);
        });
    }).catch(console.log);
}

// view employees by department
function employeesByDepartment() {
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
                message: 'Which department\'s employees would you like to view?',
                choices: departments
            }
        ]).then(answers => {
            db.promise().query(`SELECT e.id as id, e.first_name as first_name, e.last_name as last_name, r.title as title, d.name as department, r.salary as salary, CONCAT(e2.first_name, " ", e2.last_name) as manager
            FROM role r
            LEFT JOIN department d ON r.department_id = d.id
            INNER JOIN employee e ON e.role_id = r.id
            LEFT JOIN employee e2 ON e2.id = e.manager_id
            WHERE d.id = ${answers.department};`).then(([rows, fields]) => {
                console.table('\n', rows, '\n');
                promptAgain();
            }).catch(console.log);
        });
    }).catch(console.log);
}

// View total utilized budget of a department
function departmentBudget() {
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
                message: 'Which department\'s utilized budget would you like to view?',
                choices: departments
            }
        ]).then(answers => {
            db.promise().query(`SELECT d.name as department, SUM(r.salary) as utilized_budget
            FROM role r
            LEFT JOIN department d ON r.department_id = d.id
            INNER JOIN employee e ON e.role_id = r.id
            LEFT JOIN employee e2 ON e2.id = e.manager_id
            WHERE d.id = ${answers.department};`).then(([rows, fields]) => {
                console.table('\n', rows, '\n');
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
    allDepartments,
    allRoles,
    allEmployees,
    employeesByManager,
    employeesByDepartment,
    departmentBudget
}