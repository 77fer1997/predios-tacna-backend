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
    description VARCHAR(255),
    lat VARCHAR(100),
    lon VARCHAR(100),
    administrador_id INT NOT NULL,
    FOREIGN KEY (administrador_id) REFERENCES administrador(id) ON DELETE CASCADE
)
CREATE TABLE predio_images(
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255),
    descripcion varchar(255),
    predio_id INT NOT NULL,
    FOREIGN KEY (predio_id) REFERENCES predio(id) ON DELETE CASCADE
)
CREATE TABLE predio_url_videos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255),
    predio_id INT NOT NULL,
    FOREIGN KEY (predio_id) REFERENCES predio(id) ON DELETE CASCADE
)
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
)
CREATE TABLE productos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    price int,
    vendedor_id INT NOT NULL,
    FOREIGN KEY (vendedor_id) REFERENCES vendedor(id) ON DELETE CASCADE
)
INSERT INTO administrador (name, lastnames, email, user, password) VALUES ('Beto', 'calcina', 'lufer@gmail.com', "papa123", "papa");
INSERT INTO predio (name, lat, lon, administrador_id) VALUES ('Las fosas', '12313123', '523532523', 1);