/*This file contains the DB schema that creates the DB*/

DROP DATABASE IF EXISTS employee_mgmtDB;

CREATE database employee_mgmtDB;

USE employee_mgmtDB;

CREATE TABLE employees (
   emp_id INTEGER AUTO_INCREMENT NOT NULL,
   first_name VARCHAR(30) NOT NULL,
   last_name VARCHAR(30) NOT NULL,
   role_id INTEGER NOT NULL,
   manager_id INTEGER, /* NULL is OK because employees may not have a manager*/
   PRIMARY KEY (emp_id)
);

CREATE TABLE emp_roles (
   role_id INTEGER AUTO_INCREMENT NOT NULL,
   title VARCHAR(50) NOT NULL,
   salary INTEGER NOT NULL,
   department_id INTEGER NOT NULL,
   PRIMARY KEY (role_id)
);

CREATE TABLE departments (
   dept_id INTEGER AUTO_INCREMENT NOT NULL,
   dept_name VARCHAR(50) NOT NULL,
   PRIMARY KEY (dept_id)
);