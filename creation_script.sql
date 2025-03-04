
CREATE DATABASE IF NOT EXISTS Prueba;

USE Prueba;

DROP USER IF EXISTS 'pfUsuario'@'localhost';
CREATE USER 'pfUsuario'@'localhost' IDENTIFIED BY 'abc123**';

GRANT ALL PRIVILEGES ON Prueba.* TO 'pfUsuario'@'localhost';
FLUSH PRIVILEGES;

ALTER USER 'pfUsuario'@'localhost' IDENTIFIED WITH mysql_native_password BY 'abc123**';
FLUSH PRIVILEGES;


CREATE TABLE IF NOT EXISTS Vendedor (
	idVendedor  INT AUTO_INCREMENT PRIMARY KEY,
    nombre      VARCHAR(45) NOT NULL,
	apellido    VARCHAR(45) NOT NULL,
	direccion   VARCHAR(45),
	edad        INT(3) NOT NULL,
	profesion   VARCHAR(45),
	estadocivil VARCHAR(45)
);

INSERT INTO vendedor(nombre,apellido,direccion,edad,profesion,estadocivil) 
VALUES ('Vendedor2','AVendedor2','DVendedor1',29,'PVendedor1','EVendedor1');

    
    
