INSERT INTO department (name)
VALUES ("Make-up");
       
INSERT INTO role (title, salary, department_id)
VALUES ("sales associate", 14.5, 1),
       ("manager", 20.5, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ana", "Auad", 1, 2),  
       ("Ana", "Stiles", 2, NULL);
