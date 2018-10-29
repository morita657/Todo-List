create database todolist;
CREATE TABLE users (
    id integer PRIMARY KEY,
    name varchar(255)
);

create table task(
    task_id integer primary key,
    task varchar(255),
    isdone boolean,
    user_id integer REFERENCES users (id)
);

insert into users values (1, 'Metallica');
insert into users values(2, 'White Snake');
insert into users values(3, 'KISS');

insert into task values(1, 'House keeping', 0, 1);
insert into task values(2, 'Cooking', 0, 1);
insert into task values(3, 'Open an account', 0, 2);
insert into task values(4, 'Compose a new song', 0, 3);
insert into task values(5, 'Meet up with fans', 0, 2);