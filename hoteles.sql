DROP DATABASE IF EXISTS hoteles;
CREATE DATABASE IF NOT EXISTS hoteles DEFAULT CHARACTER SET UTF8MB4;
USE hoteles;

CREATE TABLE hoteles(
id_htl			INTEGER NOT NULL AUTO_INCREMENT,
nombre			VARCHAR(70) NOT NULL,
direccion		VARCHAR(200) NOT NULL,
telefono		VARCHAR(10) NOT NULL,
correo			VARCHAR(30) NOT NULL,
PRIMARY KEY (id_htl)
)DEFAULT CHARACTER SET UTF8MB4;

CREATE TABLE gerentes(
id_grt			INTEGER AUTO_INCREMENT,
nombre			VARCHAR(30) NOT NULL,
ap_paterno		VARCHAR(15) NOT NULL,
ap_materno		VARCHAR(15) NOT NULL,
telefono		VARCHAR(10) NOT NULL,
id_htl			INTEGER NOT NULL,
PRIMARY KEY (id_grt),
CONSTRAINT uk_htl UNIQUE(id_htl),
FOREIGN KEY (id_htl) REFERENCES hoteles(id_htl) ON DELETE CASCADE ON UPDATE CASCADE
)DEFAULT CHARACTER SET UTF8MB4;

CREATE TABLE habitaciones(
id_hbt			INTEGER NOT NULL AUTO_INCREMENT,
piso				VARCHAR(10) NOT NULL,
nombre			VARCHAR(30) NOT NULL,
refrigerador	BOOLEAN NOT NULL,
id_htl			INTEGER,
PRIMARY KEY (id_hbt),
FOREIGN KEY (id_htl) REFERENCES hoteles(id_htl) ON DELETE CASCADE 
)DEFAULT CHARACTER SET UTF8MB4;

CREATE table imgHabs(
	id_imgHab	INTEGER NOT NULL AUTO_INCREMENT,
    nombre		VARCHAR(100) NOT NULL,
    id_hbt		INTEGER,
    PRIMARY KEY (id_imgHab),
    CONSTRAINT uk_imgHab UNIQUE(id_hbt, nombre),
    FOREIGN KEY (id_hbt) REFERENCES habitaciones(id_hbt)
)DEFAULT CHARACTER SET UTF8MB4;

CREATE table imgHtls(
	id_imgHtl	INTEGER NOT NULL AUTO_INCREMENT,
    nombre		VARCHAR(100) ,
    id_htl		INTEGER,
    PRIMARY KEY (id_imgHtl),
    CONSTRAINT uk_imgHtl UNIQUE(id_htl, nombre),
    FOREIGN KEY (id_htl) REFERENCES hoteles(id_htl) ON UPDATE CASCADE ON DELETE CASCADE
)DEFAULT CHARACTER SET UTF8MB4;

DELIMITER $$
CREATE TRIGGER caps_gerentes BEFORE INSERT ON gerentes FOR EACH ROW
BEGIN
SET NEW.nombre=UPPER(NEW.nombre);
SET NEW.ap_paterno=UPPER(NEW.ap_paterno);
SET NEW.ap_materno=UPPER(NEW.ap_materno);
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER caps_hoteles BEFORE INSERT ON hoteles FOR EACH ROW
BEGIN
SET NEW.nombre=UPPER(NEW.nombre);
SET NEW.direccion=UPPER(NEW.direccion);
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER caps_habitaciones BEFORE INSERT ON habitaciones FOR EACH ROW
BEGIN
SET NEW.piso=UPPER(NEW.piso);
SET NEW.nombre=UPPER(NEW.nombre);
END$$
DELIMITER ;

INSERT INTO hoteles(nombre,direccion,telefono,correo) VALUES('Hotel Posada Don Ramon','Leandro Valle 23, Colonia Centro, Zacatlán','5564879250','posadadonramon@gmail.com');
INSERT INTO hoteles(nombre,direccion,telefono,correo) VALUES('El paraiso de Zacatlan','Carretera San Miguel Tenango s/n SanPedro','5678942331','paraisozacatlan@hotmail.com');
INSERT INTO hoteles(nombre,direccion,telefono,correo) VALUES('Hotel Orquidea','Agustin Balderas 5-Planta alta','5678942323','orquidea@gmail.com');
INSERT INTO hoteles(nombre,direccion,telefono,correo) VALUES('Cabañas Zacatlan','Constitucion, Supermanzana Tomatlan 73314','5678942365','cabanaszacatlan@gmail.com');
INSERT INTO hoteles(nombre,direccion,telefono,correo) VALUES('La Tierra Grande','Av. Leandro Valle 26, Centro','5678942683','tierragrande@gmail.com');

INSERT INTO gerentes(nombre,ap_paterno,ap_materno,telefono,id_htl) VALUES('ALAN','GOMEZ','HERNANDEZ','5520313536',1);
INSERT INTO gerentes(nombre,ap_paterno,ap_materno,telefono,id_htl) VALUES('ANA','VARGAS','CARRILLO','5520313578',2);
INSERT INTO gerentes(nombre,ap_paterno,ap_materno,telefono,id_htl) VALUES('PATRICIA','CRUZ','SANCHEZ','5520314512',3);
INSERT INTO gerentes(nombre,ap_paterno,ap_materno,telefono,id_htl) VALUES('JESUS','OCAMPO','GARCIA','5545313530',4);

INSERT INTO habitaciones(piso,nombre,refrigerador,id_htl) VALUES('1','doble',TRUE,2);
INSERT INTO habitaciones(piso,nombre,refrigerador,id_htl) VALUES('2','sencilla',TRUE,2);
INSERT INTO habitaciones(piso,nombre,refrigerador,id_htl) VALUES('10','doble',FALSE,3);
INSERT INTO habitaciones(piso,nombre,refrigerador,id_htl) VALUES('5','king',FALSE,1);
INSERT INTO habitaciones(piso,nombre,refrigerador,id_htl) VALUES('8','suite',TRUE,4);
INSERT INTO habitaciones(piso,nombre,refrigerador,id_htl) VALUES('1','individual',FALSE,5);
INSERT INTO habitaciones(piso,nombre,refrigerador,id_htl) VALUES('3','individual',TRUE,4);
INSERT INTO habitaciones(piso,nombre,refrigerador,id_htl) VALUES('11','sencilla',FALSE,5);