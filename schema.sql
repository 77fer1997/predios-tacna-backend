CREATE DATABASE predios_tacna;
USE predios_tacna;

CREATE TABLE administrador(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    lastnames VARCHAR(255),
    email VARCHAR(255),
    user VARCHAR(60) UNIQUE NOT NULL,
    password VARCHAR(60)
);
CREATE TABLE predio(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(2000),
    url360 VARCHAR(255),
    lat VARCHAR(100),
    lon VARCHAR(100),
    administrador_id INT NOT NULL,
    FOREIGN KEY (administrador_id) REFERENCES administrador(id) ON DELETE CASCADE
);
CREATE TABLE predio_images(
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255),
    descripcion varchar(255),
    predio_id INT NOT NULL,
    FOREIGN KEY (predio_id) REFERENCES predio(id) ON DELETE CASCADE
);
CREATE TABLE predio_url_videos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255),
    predio_id INT NOT NULL,
    FOREIGN KEY (predio_id) REFERENCES predio(id) ON DELETE CASCADE
);
CREATE TABLE vendedor(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    lastname VARCHAR(255),
    email VARCHAR(255),
    telefono VARCHAR(255),
    user VARCHAR(60) UNIQUE NOT NULL,
    password VARCHAR(60),
    fecha_inicio DATE,
    fecha_end DATE,
    predio_id INT NOT NULL,
    FOREIGN KEY (predio_id) REFERENCES predio(id) ON DELETE CASCADE
);
CREATE TABLE productos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    price int,
    image VARCHAR(255),
    vendedor_id INT NOT NULL,
    FOREIGN KEY (vendedor_id) REFERENCES vendedor(id) ON DELETE CASCADE
);
INSERT INTO administrador (name, lastnames, email, user, password) VALUES ('Beto', 'calcina', 'lufer@gmail.com', "papa123", "papa");
INSERT INTO vendedor (name, lastname, email, telefono,user, password, fecha_inicio, fecha_end, predio_id) VALUES ('Patricio', 'Parodi', 'patricio@gmail.com', "954774714", "patri123", "patri", "2023-08-23", "2023-09-23", 8 );
INSERT INTO predio (name, lat, lon, administrador_id, url360) VALUES ('Las fosas', '12313123', '523532523', 1);
INSERT INTO vendedor (name, lastname, email, telefono,user, password, fecha_inicio, fecha_end, predio_id) VALUES ('Patricio', 'Parodi', 'patricio@gmail.com', "954774714", "fernando123", "patri", "2023-08-23", "2023-09-23", 8 );
/* Vendedores */
SELECT 
vendedor.id, 
vendedor.name, 
vendedor.lastname, 
vendedor.email, 
vendedor.telefono, 
vendedor.fecha_inicio, 
vendedor.fecha_end, 
predio.name as predio_name,
predio.id as predio_id
FROM vendedor inner JOIN predio ON predio.id = vendedor.predio_id

SELECT 
    vendedor.id, 
    vendedor.name, 
    vendedor.lastname, 
    vendedor.email, 
    vendedor.telefono, 
    vendedor.fecha_inicio, 
    vendedor.fecha_end, 
    predio.name as predio_name,
    predio.id as predio_id
    FROM vendedor inner JOIN predio ON predio.id = vendedor.predio_id WHERE vendedor.id = 1
/* Administrador */
SELECT * FROM administrador 
SELECT * FROM administrador WHERE id = 1
/* Productos */
SELECT * FROM productos
SELECT * FROM productos WHERE id = 1
SELECT 
    productos.id,
    productos.name,
    productos.description,
    productos.price,
    productos.imagen,
    predio.id as predio_id
    FROM productos inner JOIN vendedor ON productos.vendedor_id = vendedor.id inner JOIN predio ON vendedor.predio_id = predio.id WHERE predio.id = 1
/* Predios */
SELECT * FROM predio
SELECT * FROM predio_images
SELECT * FROM predio_images WHERE predio_id=1
SELECT * FROM predio WHERE id = 1
SELECT * FROM predio_url_videos WHERE predio_id = 1
SELECT * FROM predio_url_videos WHERE id = 1 AND predio_id = 1
MySQL Scheduled Event


set SQL_SAFE_UPDATES=1;