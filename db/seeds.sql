USE company_db;

INSERT INTO department (name)
VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Marketing');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Sales Manager', 85000, 1),
  ('Software Engineer', 75000, 2),
  ('Accountant', 55000, 3),
  ('Marketing Specialist', 60000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Jim', 'Brown', 3, 1),
  ('Jill', 'Johnson', 4, 1);
