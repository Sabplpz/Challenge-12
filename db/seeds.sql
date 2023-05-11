INSERT INTO department (id, name)
VALUES (001, "Make-up");
       
INSERT INTO role (id, title, salary, department_id)
VALUES (001, "sales associate", 14.5, 001),
       (002, "manager", 20.5, 001);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (001, "Ana", "Auad", 001, 005),  
       (005, "Ana", "Stiles", 002, NULL);
