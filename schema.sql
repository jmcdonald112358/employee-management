--This file contains the DB schema that creates the DB

DROP DATABASE IF EXISTS employee_mgmtDB;

CREATE database employee_mgmtDB;

USE employee_mgmtDB;

CREATE TABLE employees (
   emp_id INTEGER(5) AUTO_INCREMENT NOT NULL,
   first_name VARCHAR(30) NOT NULL,
   last_name VARCHAR(30) NOT NULL,
   role_id INTEGER(2) NOT NULL,
   manager_id INTEGER(2),
   PRIMARY KEY (emp_id)
);

CREATE TABLE emp_role (
   role_id  INTEGER(2) NOT NULL,
   title VARCHAR(50) NOT NULL,
   salary INTEGER(6) NOT NULL,
   department_id INTEGER(2) NOT NULL,
   PRIMARY KEY (role_id)
);

CREATE TABLE department (
   dept_id INTEGER(2) NOT NULL,
   dept_name VARCHAR(50) NOT NULL,
   PRIMARY KEY (dept_id)
);