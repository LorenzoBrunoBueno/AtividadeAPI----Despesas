create database if not exists expenses;
use expenses;

create table if not exists user(
	id char(36) primary key not null,
    name varchar(255) not null,
    email varchar(255) not null unique,
    password_hash text not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);

create table if not exists category(
	id char(36) primary key not null,
    name varchar(255) not null,
    description text
);

CREATE TABLE if not exists expense (
    id char(36) primary key not null,
    description text,
    value decimal(20,2) unsigned not null ,
    date_expense date not null,
    status ENUM('pendente', 'paga') default 'pendente' not null,
    categoria_Id char(36) not null references category(id),
    user_id char(36) not null references user(id)
);