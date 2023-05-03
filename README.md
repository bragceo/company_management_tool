# Company_Management_Tool

## Description 

The code provided is for a command-line application that allows a business owner to view and manage the departments, roles, and employees in their company. The application is built using Node.js and interacts with a MySQL database to store and retrieve data. The Inquirer package is used to handle user input via the command line.

## User Story

AS A business owner <br>
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business <br>

## Acceptance Criteria

GIVEN a command-line application that accepts user input <br>
WHEN I start the application <br>
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role <br>
WHEN I choose to view all departments <br>
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles <br>
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role <br>
WHEN I choose to view all employees <br>
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to <br>
WHEN I choose to add a department <br>
THEN I am prompted to enter the name of the department and that department is added to the database <br>
WHEN I choose to add a role <br>
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database <br>
WHEN I choose to add an employee <br>
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database <br>
WHEN I choose to update an employee role <br>
THEN I am prompted to select an employee to update and their new role and this information is updated in the database <br>


## Deployed URL


Please find a walkthrough video of the application here:

Screencastify and Google Links

https://watch.screencastify.com/v/0gjBecXJj7mogfDtWQLp

https://drive.google.com/file/d/1uOW5_TeTpDLFlCvIYTJju0xt6-mXSyaG/view?usp=sharing



Bonus Video (Screencastify and Google Links)

https://watch.screencastify.com/v/0TkvO2RhtFgsqWjig8Hb

https://drive.google.com/file/d/1fWfRKzYgw6CxbC1M7fkD9GGxQp1WIMBa/view?usp=sharing


## Github Repository

https://github.com/bragceo/company_management_tool


## Overview of Code structure and its components:

index.js: This file is the entry point for the application. It imports the asciiart-logo module and a function called promptUser from ./utils/ui. It then calls the init function, which displays the logo using console.log and prompts the user for input by calling promptUser.

utils/ui.js: This file exports a function called promptUser, which uses the inquirer module to prompt the user for input. Based on the user's input, it calls functions from the db/view.js, db/add.js, db/update.js, or db/remove.js modules to perform database operations.

db/add.js: This file exports functions that add data to the database. There are three functions in this file:

newDepartment(): Prompts the user for a new department name and inserts it into the department table.

newRole(): Prompts the user for a new role title, salary, and department, and inserts it into the role table.

newEmployee(): Prompts the user for a new employee's first name, last name, role, and manager, and inserts it into the employee table.

db/remove.js: This file exports functions that remove data from the database. There are three functions in this file:

deleteDepartment(): Prompts the user to select a department to delete and removes it from the department table.

deleteRole(): Prompts the user to select a role to delete and removes it from the role table.

deleteEmployee(): Prompts the user to select an employee to delete and removes it from the employee table.

Each of the files uses the mysql2 module to interact with the database. The console.table module is used to display the results of queries to the console in a formatted table. The inquirer module is used to prompt the user for input and handle their responses. The functions in db/view.js, db/update.js, db/remove.js, and db/add.js are exported so that they can be used by utils/ui.js. Finally, utils/ui.js exports the promptUser function so that it can be called by index.js
 

## How to run the application
 
You can run the application by running this command in the application directory
node index.js

Note, Node.js installed on their system to make it work,
 
Node.js must be installed to make it work.




## Special Thanks 

Shout out to the awesome Instructors and TAs who worked with me through numerous challenges. These indiviudals include: Diego, Enrique Gomes, and Erik Hoverstein. 

Additional resources:

In addition to the above, I reviewed various parts from this Udemy tutorial: 

https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/learn/lecture/15080918#overview




## Authors 

Lavell Juan<br>


## Credits 

N/a

## License 

Please refer to license in repo 
