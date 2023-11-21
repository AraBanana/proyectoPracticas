create database domas; 

CREATE TABLE usuarios (
    idUser SERIAL PRIMARY KEY,
    nombre VARCHAR, 
    correo_institucional VARCHAR CHECK (correo_institucional LIKE '%@unach.mx'),
    password VARCHAR(60)
);


insert into usuarios values
    (3, 'asdas Juarez', 'arael.hidalgo54@gmail.com', 'ts0asd3bgr'),;
