TRUNCATE users, leader RESTART IDENTITY;

INSERT INTO users (name, email, pass) 
VALUES
('Adam10', 'adams@gmail.com', 'password'),
('Mark1', 'mark@gmail.com', 'password'),
('Apple5', 'apple@gmail.com', 'password');



INSERT INTO leader (name, correct, total_quest, time, percentage)
VALUES
('Adam10', 5, 10, '2008-01-01 00:00:01', 0.5),
('Mark1', 7, 10, '2008-01-01 00:00:02', 0.7),
('Apple5', 10, 10, '2008-01-01 00:00:03', 1);

