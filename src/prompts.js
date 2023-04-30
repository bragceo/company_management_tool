const inquirer = require('inquirer');

async function mainMenu() {
  return inquirer.prompt([
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
        'Exit'
      ]
    }
  ]);
}

// Other prompts for adding and updating data go here

module.exports = { mainMenu };

async function addDepartmentPrompt() {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the new department?'
      }
    ]);
  }
  
  async function addRolePrompt(departments) {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the title of the new role?'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary for the new role?'
      },
      {
        type: 'list',
        name: 'department_id',
        message: 'Which department does the new role belong to?',
        choices: departments.map((department) => ({
          name: department.name,
          value: department.id
        }))
      }
    ]);
  }
  
  async function addEmployeePrompt(roles, managers) {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'first_name',
        message: "What is the employee's first name?"
      },
      {
        type: 'input',
        name: 'last_name',
        message: "What is the employee's last name?"
      },
      {
        type: 'list',
        name: 'role_id',
        message: "What is the employee's role?",
        choices: roles.map((role) => ({
          name: role.title,
          value: role.id
        }))
      },
      {
        type: 'list',
        name: 'manager_id',
        message: "Who is the employee's manager?",
        choices: managers.map((manager) => ({
          name: `${manager.first_name} ${manager.last_name}`,
          value: manager.id
        })).concat({ name: 'None', value: null })
      }
    ]);
  }
  
  async function updateEmployeeRolePrompt(employees, roles) {
    return inquirer.prompt([
      {
        type: 'list',
        name: 'employee_id',
        message: 'Which employee do you want to update?',
        choices: employees.map((employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id
        }))
      },
      {
        type: 'list',
        name: 'role_id',
        message: "What is the employee's new role?",
        choices: roles.map((role) => ({
          name: role.title,
          value: role.id
        }))
      }
    ]);
  }
  
  module.exports = {
    mainMenu,
    addDepartmentPrompt,
    addRolePrompt,
    addEmployeePrompt,
    updateEmployeeRolePrompt
  };
  