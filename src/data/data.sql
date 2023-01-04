
/*Insertar categorías de productos*/
INSERT INTO sio2.products_categories (productCategoryName) VALUES('Botellas');
INSERT INTO sio2.products_categories (productCategoryName) VALUES('Chops');
INSERT INTO sio2.products_categories (productCategoryName) VALUES('Copas');
INSERT INTO sio2.products_categories (productCategoryName) VALUES('Decantadores');
INSERT INTO sio2.products_categories (productCategoryName) VALUES('Jarras');
INSERT INTO sio2.products_categories (productCategoryName) VALUES('Tazas');
INSERT INTO sio2.products_categories (productCategoryName) VALUES('Vajilla');
INSERT INTO sio2.products_categories (productCategoryName) VALUES('Vasos');

/*Insertar categorías de usuarios*/
INSERT INTO sio2.users_categories (userCategoryName) VALUES('administrador');
INSERT INTO sio2.users_categories (userCategoryName) VALUES('cliente');

/*Insertar rubros de los usuarios*/
INSERT INTO sio2.users_sectors (userSectorName) VALUES('Bazar');
INSERT INTO sio2.users_sectors (userSectorName) VALUES('Distribuidor');
INSERT INTO sio2.users_sectors (userSectorName) VALUES('Gastronomía');
INSERT INTO sio2.users_sectors (userSectorName) VALUES('Hotelería');
INSERT INTO sio2.users_sectors (userSectorName) VALUES('Otros');

/*Insertar usuarios*/
INSERT INTO sio2.users (userName,cuitCuil,userSectorId,userCategoryId,email,address,city ,phoneNumber,userImage,password) VALUES('Company1',11111111,1,2,'Company1@gmail.com','adress Company1','city Company1',1111111111,'Company1.jpg','pswcompany1');
INSERT INTO sio2.users (userName,cuitCuil,userSectorId,userCategoryId,email,address,city ,phoneNumber,userImage,password) VALUES('Company2',22222222,2,2,'Company2@gmail.com','adress Company2','city Company2',1122222222,'Company2.jpg','pswcompany2');
INSERT INTO sio2.users (userName,cuitCuil,userSectorId,userCategoryId,email,address,city ,phoneNumber,userImage,password) VALUES('Company3',33333333,3,2,'Company3@gmail.com','adress Company3','city Company3',1133333333,'Company3.jpg','pswcompany3');
INSERT INTO sio2.users (userName,cuitCuil,userSectorId,userCategoryId,email,address,city ,phoneNumber,userImage,password) VALUES('Company4',44444444,4,2,'Company4@gmail.com','adress Company4','city Company4',1144444444,'Company4.jpg','pswcompany4');
INSERT INTO sio2.users (userName,cuitCuil,userSectorId,userCategoryId,email,address,city ,phoneNumber,userImage,password) VALUES('Company5',55555555,5,2,'Company5@gmail.com','adress Company5','city Company5',1155555555,'Company5.jpg','pswcompany5');
INSERT INTO sio2.users (userName,cuitCuil,userSectorId,userCategoryId,email,address,city ,phoneNumber,userImage,password) VALUES('Company6',66666666,2,2,'Company6@gmail.com','adress Company6','city Company6',1166666666,'Company6.jpg','pswcompany6');
INSERT INTO sio2.users (userName,cuitCuil,userSectorId,userCategoryId,email,address,city ,phoneNumber,userImage,password) VALUES('Adm1',11111111,5,1,'Adm1@gmail.com','adress Adm1','city Adm1',1111111111,'Adm1.jpg','pswadm1');
INSERT INTO sio2.users (userName,cuitCuil,userSectorId,userCategoryId,email,address,city ,phoneNumber,userImage,password) VALUES('Adm2',22222222,5,1,'Adm2@gmail.com','adress Adm2','city Adm2',1122222222,'Adm2.jpg','pswadm2');
INSERT INTO sio2.users (userName,cuitCuil,userSectorId,userCategoryId,email,address,city ,phoneNumber,userImage,password) VALUES('Adm3',33333333,5,1,'Adm3@gmail.com','adress Adm3','city Adm3',1133333333,'Adm3.jpg','pswadm3');

