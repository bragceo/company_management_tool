const { query } = require('./db');
const prompts = require('./prompts');

async function runApp() {
  let exit = false;

  while (!exit) {
    const { action } = await prompts.mainMenu();

    switch (action) {
      case 'View all departments':
        await viewDepartments();
        break;
      case 'View all roles':
        await viewRoles();
        break;
      case 'View all employees':
        await viewEmployees();
        break;
      case 'Add a department':
        await addDepartment();
        break;
      case 'Add a role':
        await addRole();
        break;
      case 'Add an employee':
        await addEmployee();
        break;
      case 'Update an employee role':
        await updateEmployeeRole();
        break;
      case 'Exit':
        exit = true;
        break;
    }
  }
}

async function viewDepartments() {
  const departments = await query('SELECT * FROM department');
  console.table(departments);
}

async function viewRoles() {
  const roles = await query('SELECT role.id, title, salary, department.name AS department FROM role JOIN department ON department_id = department.id');
  console.table(roles);
}

async function viewEmployees() {
  const employees = await query('SELECT e1.id, e1.first_name, e1.last_name, role.title, department.name AS department, role.salary, CONCAT(e2.first_name, " ", e2.last_name) AS manager FROM employee e1 LEFT JOIN employee e2 ON e1.manager_id = e2.id JOIN role ON e1.role_id = role.id JOIN department ON role.department_id = department.id');
  console.table(employees);
}

async function addDepartment() {
  const { name } = await prompts.addDepartmentPrompt();
  await query('INSERT INTO department (name) VALUES (?)', [name]);
  console.log(`Added department: ${name}`);
}

async function addRole() {
  const departments = await query('SELECT * FROM department');
  const { title, salary, department_id } = await prompts.addRolePrompt(departments);
  await query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id]);
  console.log(`Added role: ${title}`);
}

async function addEmployee() {
  const roles = await query('SELECT * FROM role');
  const managers = await query('SELECT * FROM employee');
  const { first_name, last_name, role_id, manager_id } = await prompts.addEmployeePrompt(roles, managers);
  await query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [first_name, last_name, role_id, manager_id]);
  console.log(`Added employee: ${first_name} ${last_name}`);
}

async function updateEmployeeRole() {
  const employees = await query('SELECT * FROM employee');
  const roles = await query('SELECT * FROM role');
  const { employee_id, role_id } = await prompts.updateEmployeeRolePrompt(employees, roles);
  await query('UPDATE employee SET role_id = ? WHERE id = ?', [role_id, employee_id]);
  console.log(`Updated employee role`);
}

runApp();

