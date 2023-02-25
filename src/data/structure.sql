/*Delete database if exists*/
DROP DATABASE IF EXISTS sio2;

/*Crear la base de datos*/
CREATE DATABASE sio2;

/*Crear la tabla de las categorías de productos*/
CREATE TABLE sio2.product_categories (
    product_category_id INT NOT NULL AUTO_INCREMENT,
    product_category_name VARCHAR(45) NOT NULL UNIQUE,
    PRIMARY KEY (product_category_id)
);

/*Crear la tabla de  productos*/
CREATE TABLE sio2.products (
    product_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(20) NOT NULL UNIQUE,
    product_description VARCHAR(100) NOT NULL,
    product_category_id INT NOT NULL,
    price DECIMAL(7,2) NOT NULL,
    discount INT NOT NULL,
    stock INT NOT NULL,
    product_image VARCHAR(100) NOT NULL,
    PRIMARY KEY (product_id),
    FOREIGN KEY (product_category_id) REFERENCES product_categories(product_category_id)
);

/*Crear la tabla de categorías de usuarios*/
CREATE TABLE sio2.user_categories (
    user_category_id INT NOT NULL AUTO_INCREMENT,
    user_category_name VARCHAR(45) NOT NULL UNIQUE,
    PRIMARY KEY (user_category_id)
);

/*Crear la tabla de rubros de los usuarios*/
CREATE TABLE sio2.user_sectors (
    user_sector_id INT NOT NULL AUTO_INCREMENT,
    user_sector_name VARCHAR(45) NOT NULL UNIQUE,
    PRIMARY KEY (user_sector_id)
);

/*Crear la tabla de usuarios*/
CREATE TABLE sio2.users (
    user_id INT NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(50) NOT NULL,
    cuit_cuil BIGINT NOT NULL,
    user_sector_id INT NOT NULL,
    user_category_id INT NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    address VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    user_image VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY (user_id),
    FOREIGN KEY (user_sector_id) REFERENCES user_sectors(user_sector_id),
    FOREIGN KEY (user_category_id) REFERENCES user_categories(user_category_id)
);

/*Crear la tabla de Carro de compras*/
/*CREATE TABLE sio2.cart_details (
    cart_detail_id INT NOT NULL AUTO_INCREMENT,
    sale_id INT NOT NULL,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    product_qty INT NOT NULL,
    product_price DECIMAL(7,2) NOT NULL,
    PRIMARY KEY (cart_detail_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
)*/