-- This file contains the initial DB data

USE employee_mgmtDB;

-- Insert 3 employees each with one of the 3 initial available roles
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Kaladin", "Stormblessed", 2, 1), ("Jasnah", "Kholin", 3, 1), ("Dalinar", "Kholin", 1);

-- Insert 3 roles each with one of the 3 initial departments
INSERT INTO emp_roles (title, salary, department_id)
VALUES ("Windrunner", 4, 3), ("Monarch", 15, 2), ("Executive", 50, 1);

-- Insert 3 departments
INSERT INTO departments (dept_name)
VALUES ("Global Leadership", "Local Leadership", "Knights Radiant");