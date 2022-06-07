-- -----------------------------------------------------
-- Schema-drop local_project
-- -----------------------------------------------------
 DROP SCHEMA IF EXISTS `local_project` ;

-- -----------------------------------------------------
-- Schema-create local_project
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `local_project` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `local_project` ;

-- -----------------------------------------------------
-- Table `local_project`.`categorie`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `local_project`.`categorie` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `libelle` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
)ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `local_project`.`artiste`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `local_project`.`artiste` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(255) DEFAULT NULL,
  `activite` VARCHAR(255) DEFAULT NULL,
  `description` MEDIUMTEXT  DEFAULT NULL,
  `image_url` VARCHAR(255) DEFAULT NULL,
  `email` VARCHAR(255) DEFAULT NULL,
  `weblink` VARCHAR(255) DEFAULT NULL,
  `facebook` VARCHAR(255) DEFAULT NULL,
  `instagram` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
  )ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `local_project`.`produit`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `local_project`.`produit` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `libelle` VARCHAR(45) DEFAULT NULL,
  `caracteristiques` VARCHAR(255) DEFAULT NULL,
  `description` MEDIUMTEXT DEFAULT NULL,
  `image_url` VARCHAR(255) DEFAULT NULL,
  `prix_unitaire` DECIMAL(13,2) DEFAULT NULL,
  `quantite_stock` INT DEFAULT NULL,
  `date_creation` DATETIME,
  `derniere_maj` DATETIME,
  `id_categorie` INT NOT NULL,
  `id_artiste` INT NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_categorie` (`id_categorie`),
  KEY `fk_artiste` (`id_artiste`),
  CONSTRAINT `fk_categorie` FOREIGN KEY (`id_categorie`) REFERENCES `categorie` (`id`),
  CONSTRAINT `fk_artiste` FOREIGN KEY (`id_artiste`) REFERENCES `artiste` (`id`)
  )ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `local_project`.`client`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `local_project`.`client` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(255) DEFAULT NULL,
  `prenom` VARCHAR(255) DEFAULT NULL,
  `email` VARCHAR(45) DEFAULT NULL UNIQUE,
  PRIMARY KEY (`id`)
  )ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `local_project`.`adresse`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `local_project`.`adresse` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `rue` VARCHAR(255) DEFAULT NULL,
  `ville` VARCHAR(255) DEFAULT NULL,
  `code_postal` VARCHAR(255) DEFAULT NULL,
  `pays` VARCHAR(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
  )ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `local_project`.`livraison`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `local_project`.`livraison` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(255) DEFAULT 'MAGASIN',
  `prix` DOUBLE DEFAULT NULL,
  PRIMARY KEY (`id`)
)ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `local_project`.`commande`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `local_project`.`commandes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `numero_commande` VARCHAR(255) DEFAULT NULL,
  `prix_total` DECIMAL(19,2) DEFAULT NULL,
  `quantite_totale` int DEFAULT NULL,
  `id_client` INT DEFAULT NULL,
  `adresse_livraison_id` INT DEFAULT NULL,
  `adresse_facturation_id` INT DEFAULT NULL,
  `type_livraison` INT DEFAULT NULL,
  `date_creation` DATETIME(6) DEFAULT NULL,
  `derniere_maj` DATETIME(6) DEFAULT NULL,
  `statut` VARCHAR(255) DEFAULT ('TRAITEMENT'),
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_adresse_facturation_id` (`adresse_facturation_id`),
  UNIQUE KEY `UK_adresse_livraison_id` (`adresse_livraison_id`),
  KEY `K_id_client` (`id_client`),
  CONSTRAINT `FK_id_client` FOREIGN KEY (`id_client`) REFERENCES `client` (`id`),
  CONSTRAINT `FK_adresse_facturation_id` FOREIGN KEY (`adresse_facturation_id`) REFERENCES `adresse` (`id`),
  CONSTRAINT `FK_adresse_livraison_id` FOREIGN KEY (`adresse_livraison_id`) REFERENCES `adresse` (`id`),
  CONSTRAINT `FK_livraison` FOREIGN KEY (`type_livraison`) REFERENCES `livraison` (`id`)
)ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `dvd_eshop_test`.`commande_produit`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `local_project`.`commande_produit` (
`id` int NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) DEFAULT NULL,
  `quantite` int DEFAULT NULL,
  `prix_unitaire` decimal(19,2) DEFAULT NULL,
  `id_commande` INT DEFAULT NULL,
  `id_produit` INT DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `K_id_commande` (`id_commande`),
  CONSTRAINT `FK_id_commande` FOREIGN KEY (`id_commande`) REFERENCES `commandes` (`id`),
  CONSTRAINT `FK_id_produit` FOREIGN KEY (`id_produit`) REFERENCES `produit` (`id`)
  )ENGINE = InnoDB;


-- -----------------------------------------------------
-- ALIMENTATION DONNEES
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Livraison
-- -----------------------------------------------------
INSERT INTO `local_project`.`livraison` (`type`, `prix`) VALUES
('DOMICILE', 3.23),
('RELAY', 2.64),
('MAGASIN', 0.00);

-- -----------------------------------------------------
-- Categories
-- -----------------------------------------------------
INSERT INTO `local_project`.`categorie` (`libelle`) VALUES
('Décoration maison'),
('Bijoux'),
('Tableaux'),
('Petits objets'),
('Vêtements');

-- -----------------------------------------------------
-- Artistes
-- -----------------------------------------------------
INSERT INTO `local_project`.`artiste` (`nom`,`activite`,`description`,`image_url`,`email`,`weblink`,`facebook`,`instagram`) VALUES
('Malodepaname', 'Objet d\'après des collages originaux','Malodepaname est Dyonisienne. De part son enfance et son parcours, l’image a toujours fait partie de sa vie, 
et le collage s’est avéré une suite logique. Elle récupère toutes sortes de papiers, photos, journaux, affiches, papier-peint… Et les découpes, les détournes, les
 assembles. Au fil du temps, une galerie de portraits (mais pas que) à vu le jour. avec un prénom à chaque fois, comme pour les rendre plus vivants. Un univers assez
 féminin, décliné sur différents objets selon son envie de l’accrocher ou de l’emporter avec soi.',
'https://i.postimg.cc/0N5RX4T2/malo-elodie.jpg','malodepaname@gmail.com','https://www.etsy.com/fr/shop/malodepaname','https://www.facebook.com/malodepaname/','@malodepaname'),
('Unica Séries', 'Objets sérigraphiés','Unica Series est un atelier de création et sérigraphie qui imagine une multitude d\'objets, vêtements, tableaux, affiches... 
en série limitée. Les sérigraphies d\'Antoine Petit, aux couleurs vives et acidulées, sur des pochettes et autres couvre-livres, attirent immédiatement le regard. 
« J’aime travailler sur des objets usuels : toiles de transat, abat-jours, hamac… Comme il est plus facile de vendre un objet peint qu’un tableau, alors je fais des 
tableaux sur des objets. ». Antoine donne régulièrement des cours individuels dans son atelier et organise des démonstration pour le public de tous âges.',
'https://i.postimg.cc/K4P0rZQc/unica-Antoine.jpg','aantoinepetit@gmail.com','','https://www.facebook.com/unicaserigraphie','@unicaseries'),
('De carton et d\'étoiles', 'Objets pops et impertinents','De Carton et d’Étoiles, c’est la marque française aux messages pop et impertinents, customisation de 
textile de seconde main mais surtout une multitude d’objets décalés et drôles ! Le Studio De Carton et d’Étoiles c’est également une agence créative pour vos 
projets de design graphique, communication visuelle et illustration',
'https://i.postimg.cc/66mxQzDy/carton.jpg','cartonetoiles@gmail.com','https://decartonetdetoiles.fr/','https://www.facebook.com/decartonetdetoiles','https://www.instagram.com/decartonetdetoiles/');

-- -----------------------------------------------------
-- Produits
-- -----------------------------------------------------
INSERT INTO `local_project`.`produit` (`libelle`,`caracteristiques`,`description`,`image_url`,`prix_unitaire`,
`quantite_stock`,`date_creation`,`derniere_maj`,`id_categorie`,`id_artiste`) VALUES
('Jade', 'Cadre 30x40 cm', 'Realisé d’après une création de collage originale. Imprimé sur papier fine art william Turner en série limitée', 'https://i.postimg.cc/fbZ6PP0g/malo2.jpg', 35.0, 3, NOW(), NOW(), 3, 1),
('Dora', 'Badge 56 mm', 'Realisé d’après une création de collage originale.', 'https://i.postimg.cc/RZwkXmqH/malo3.jpg', 4.0, 10, NOW(), NOW(), 2, 1),
('Smile', 'Housse de coussin 45x45 cm', 'Realisé d’après une création de collage originale. Imprimé sur cotton 100%.', 'https://i.postimg.cc/RFpyNVpj/malo4.jpg' , 35.0, 10, NOW(), NOW(), 1, 1),
('Angèle', 'Trousse 21x14 cm', 'Realisé d’après une création de collage originale. Imprimé sur cotton 100%.', 'https://i.etsystatic.com/7711299/r/il/b79d0e/3385153005/il_794xN.3385153005_6qao.jpg', 19.0, 8, NOW(), NOW(), 4, 1),
('Rouages', 'T-shirt taille unique', 'Sérigraphie sur textile réalisé manuellement. Série limitée. Support cotton 100%', 'https://i.postimg.cc/52WGHrpN/Unica1.jpg', 40.0, 10, NOW(), NOW(), 5, 2),
('Plantes en poche', 'Support vertical pour plantes', 'Sérigraphie sur bâche réalisé manuellement. Série limitée. Support bâche PVC de récupération', 'https://i.postimg.cc/BvqVp1dr/unica3.jpg', 70.0, 15, NOW(), NOW(), 1, 2),
('Scream', 'T-shirt taille unique', 'Sérigraphie sur textile réalisé manuellement. Série limitée. Support cotton 100%', 'https://i.postimg.cc/Jz3FjQd3/Unica2.jpg', 40.0, 10, NOW(), NOW(), 5, 2),
('Crayons enfants', 'Lot 3 crayons HB', 'Lot de 3 crayons à papier en bois avec gomme couleurs aléatoire bleu vert rose rouge jaune ou orange.
Gravés en découpe laser
Inscriptions : Caca boudin – Prout – Crotte de nez
Gravés à Paris', 'https://decartonetdetoiles.fr/wp-content/uploads/2021/11/crayons_enfant_1.jpg', 6.00, 50, NOW(), NOW(), 4, 3),
('A collectionner', 'Badges 38mm', 'Badge à message impertinent vendu à l’unité mais à collectionner. Choisissez-en 1 2 3… ou les 15 ! Diamètre d’un badge 38 mm
Épingle métal 15 déclinaisons.', 'https://decartonetdetoiles.fr/wp-content/uploads/2021/11/badges38-decartonetdetoiles1-scaled.jpg', 5.50, 50, NOW(), NOW(), 4, 3),
('Girls to the front', 'T-shirt, coupe femme', 'Les filles devant ! Référence à la culture punk féministe des années 90 qui refusait la dictature des hommes au 1er rang des concerts reléguant les filles derrière.
T-shirt noir col rond sans coutures aux emmanchures revers bas de manches. 3 déclinaisons (longueur cm / largeur face poitrine cm) : S 62/45 (France 36-38) M 67/49 (France 38-40) L 72/53 (France 40-42). Design et impression flex fait à Saint-Denis.', 'https://decartonetdetoiles.fr/wp-content/uploads/2021/11/tshirt-girlstothefront-decartonetdetoiles1.jpg', 30.00, 25, NOW(), NOW(), 5, 3),
('Samèrelipopette', 'T-shirt, coupe femme', 'T-shirt rose pâle col rond sans coutures aux emmanchures revers bas de manches. 3 déclinaisons (longueur cm / largeur face poitrine cm) : S 62/45 (France 36-38); M 67/49 (France 38-40); L 72/53 (France 40-42). Design et impression flex fait à Saint-Denis', 'https://decartonetdetoiles.fr/wp-content/uploads/2021/11/tshirt-samerelipopette-decartonetdetoiles1.jpg', 30.00, 25, NOW(), NOW(), 5, 3),
('Paracétamol', 'Mug', 'Mug en céramique blanche solide et douce. Inscription imprimée sur les deux côtés de la tasse pour gauchers et droitiers donc… Supporte micro-ondes mais lavage conseillé à la main. Design et fabrication française.', 'https://decartonetdetoiles.fr/wp-content/uploads/2021/10/mug-paracetamol-1.jpg', 12.00, 20, NOW(), NOW(), 4, 3);
