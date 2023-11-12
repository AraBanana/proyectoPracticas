create database domas; 

CREATE TABLE usuarios (
    idUser SERIAL PRIMARY KEY,
    nombre VARCHAR, 
    correo_institucional VARCHAR CHECK (correo_institucional LIKE '%@unach.mx')
);


insert into usuarios values
    (1, 'Arael Hidalgo Juarez', 'arael.hidalgo54@unach.mx'),
    (2, 'Julian', 'julian.sa@unach.mx');
