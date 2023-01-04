/*Crear la base de datos*/
CREATE DATABASE sio2;

/*Crear la tabla de las categorías de productos*/
CREATE TABLE sio2.products_categories (
    productCategoryId INT NOT NULL AUTO_INCREMENT,
    productCategoryName VARCHAR(45) NOT NULL UNIQUE,
    PRIMARY KEY (productCategoryId)
);

/*Crear la tabla de  productos*/
CREATE TABLE sio2.products (
    productId INT NOT NULL AUTO_INCREMENT,
    productName VARCHAR(20) NOT NULL UNIQUE,
    productDescription VARCHAR(100) NOT NULL,
    productCategoryId INT NOT NULL,
    price DECIMAL(7,2) NOT NULL,
    discount INT NOT NULL,
    stock INT NOT NULL,
    productImage VARCHAR(100) NOT NULL,
    PRIMARY KEY (productId),
    FOREIGN KEY (productCategoryId) REFERENCES products_categories(productCategoryId)
);

/*Crear la tabla de categorías de usuarios*/
CREATE TABLE sio2.users_categories (
    userCategoryId INT NOT NULL AUTO_INCREMENT,
    userCategoryName VARCHAR(45) NOT NULL UNIQUE,
    PRIMARY KEY (userCategoryId)
);

/*Crear la tabla de rubros de los usuarios*/
CREATE TABLE sio2.users_sectors (
    userSectorId INT NOT NULL AUTO_INCREMENT,
    userSectorName VARCHAR(45) NOT NULL UNIQUE,
    PRIMARY KEY (userSectorId)
);

/*Crear la tabla de usuarios*/
CREATE TABLE sio2.users (
    userId INT NOT NULL AUTO_INCREMENT,
    userName VARCHAR(20) NOT NULL UNIQUE,
    cuitCuil INT NOT NULL,
    userSectorId INT NOT NULL,
    userCategoryId INT NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    address VARCHAR(100) NOT NULL,
    city VARCHAR(20) NOT NULL,
    phoneNumber INT NOT NULL,
    userImage VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY (userId),
    FOREIGN KEY (userSectorId) REFERENCES users_sectors(userSectorId),
    FOREIGN KEY (userCategoryId) REFERENCES users_categories(userCategoryId)
)