-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               10.6.0-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for privatnicasovi
DROP DATABASE IF EXISTS `privatnicasovi`;
CREATE DATABASE IF NOT EXISTS `privatnicasovi` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `privatnicasovi`;

-- Dumping structure for table privatnicasovi.city
DROP TABLE IF EXISTS `city`;
CREATE TABLE IF NOT EXISTS `city` (
  `city_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`city_id`),
  UNIQUE KEY `uq_city_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table privatnicasovi.city: ~18 rows (approximately)
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` (`city_id`, `name`) VALUES
	(1, 'Beograd'),
	(13, 'Jagodina'),
	(7, 'Kragujevac'),
	(9, 'Kraljevo'),
	(8, 'Kruševac'),
	(15, 'Leskovac'),
	(40, 'Loznica'),
	(12, 'Niš'),
	(2, 'Novi Sad'),
	(6, 'Pančevo'),
	(14, 'Pirot'),
	(10, 'Požarevac'),
	(5, 'Sremska Mitrovica'),
	(3, 'Subotica'),
	(25, 'Ub'),
	(16, 'Vranje'),
	(11, 'Zaječar'),
	(4, 'Zrenjanin');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;

-- Dumping structure for table privatnicasovi.offer
DROP TABLE IF EXISTS `offer`;
CREATE TABLE IF NOT EXISTS `offer` (
  `offer_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `price` decimal(10,2) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `city_id` int(10) unsigned NOT NULL,
  `subject_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`offer_id`),
  UNIQUE KEY `uq_offer_user_id_city_id_subject_id` (`user_id`,`city_id`,`subject_id`),
  KEY `fk_offer_city_id` (`city_id`),
  KEY `fk_offer_subject_id` (`subject_id`),
  CONSTRAINT `fk_offer_city_id` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_offer_subject_id` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_offer_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table privatnicasovi.offer: ~0 rows (approximately)
/*!40000 ALTER TABLE `offer` DISABLE KEYS */;
/*!40000 ALTER TABLE `offer` ENABLE KEYS */;

-- Dumping structure for table privatnicasovi.review
DROP TABLE IF EXISTS `review`;
CREATE TABLE IF NOT EXISTS `review` (
  `review_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rating` tinyint(3) unsigned NOT NULL DEFAULT 5,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `rated__user_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`review_id`),
  UNIQUE KEY `uq_review_rated__user_id_user_id` (`rated__user_id`,`user_id`),
  KEY `fk_review_user_id` (`user_id`),
  CONSTRAINT `fk_review_rated__user_id` FOREIGN KEY (`rated__user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_review_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table privatnicasovi.review: ~2 rows (approximately)
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` (`review_id`, `rating`, `created_at`, `rated__user_id`, `user_id`) VALUES
	(3, 5, '2021-06-12 15:32:43', 2, 3),
	(21, 2, '2021-06-14 15:06:58', 6, 3);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;

-- Dumping structure for table privatnicasovi.subject
DROP TABLE IF EXISTS `subject`;
CREATE TABLE IF NOT EXISTS `subject` (
  `subject_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`subject_id`),
  UNIQUE KEY `uq_subject_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table privatnicasovi.subject: ~10 rows (approximately)
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
INSERT INTO `subject` (`subject_id`, `name`) VALUES
	(8, 'Biologija'),
	(6, 'Engleski jezik'),
	(2, 'Fizika'),
	(9, 'Geografija'),
	(3, 'Hemija'),
	(10, 'Istorija'),
	(1, 'Matematika'),
	(4, 'Programiranje'),
	(7, 'Ruski jezik'),
	(5, 'Srpski jezik');
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;

-- Dumping structure for table privatnicasovi.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `forename` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `surname` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('student','professor') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_active` tinyint(1) unsigned NOT NULL DEFAULT 1,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uq_user_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table privatnicasovi.user: ~4 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`user_id`, `forename`, `surname`, `email`, `password_hash`, `role`, `created_at`, `is_active`) VALUES
	(2, 'Marko', 'Markovic', 'mmarkovic@mail.com', '$2b$11$r7YkEMD4x2w3waPk/2dEMecCBFQEBIO81fs.lPEcKj9Agu88esKRW', 'professor', '2021-06-11 16:00:01', 1),
	(3, 'Pera', 'Peric', 'pperic@mail.com', '$2b$11$QAE4IgsqsCfDwBKji6mcieDp9uHJVRl28xIJZAyy1CNkdzwhLEmM2', 'student', '2021-06-11 17:45:08', 0),
	(6, 'Jovan', 'Jovanovic', 'jjovanovic@mail.com', '$2b$11$LtMd/xLp.L5W/FekVfmKw.Vz5vLJYczki0XC1DTO0vdeEKU2f5mAa', 'professor', '2021-06-13 14:29:29', 1),
	(17, 'Milica', 'Milicevic', 'milicamilicevic@mail.com', '$2b$11$KMYz1SPbvzIsCDmkVqAxBuSJcXbXI6Y2u66x.nDW33x.WzXrpB1Li', 'student', '2021-06-15 14:00:33', 1),
	(18, 'Mika', 'Mikic', 'mmikic@mail.com', '$2b$11$q5iX5jAdy0xYShkNhFxdG.wMaKJLVLwr7O7v6QwWJ6IPz1WcCdxym', 'professor', '2021-06-15 14:04:59', 1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- Dumping structure for table privatnicasovi.user_city
DROP TABLE IF EXISTS `user_city`;
CREATE TABLE IF NOT EXISTS `user_city` (
  `user_city_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `city_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`user_city_id`),
  UNIQUE KEY `uq_user_city_user_id_city_id` (`user_id`,`city_id`),
  KEY `fk_user_city_city_id` (`city_id`),
  CONSTRAINT `fk_user_city_city_id` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_user_city_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table privatnicasovi.user_city: ~3 rows (approximately)
/*!40000 ALTER TABLE `user_city` DISABLE KEYS */;
INSERT INTO `user_city` (`user_city_id`, `user_id`, `city_id`) VALUES
	(1, 2, 1),
	(2, 2, 2),
	(3, 2, 3),
	(12, 18, 2),
	(13, 18, 3),
	(14, 18, 4),
	(15, 18, 5);
/*!40000 ALTER TABLE `user_city` ENABLE KEYS */;

-- Dumping structure for table privatnicasovi.user_subject
DROP TABLE IF EXISTS `user_subject`;
CREATE TABLE IF NOT EXISTS `user_subject` (
  `user_subject_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `subject_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`user_subject_id`),
  UNIQUE KEY `uq_user_subject_user_id_subject_id` (`user_id`,`subject_id`),
  KEY `fk_user_subject_subject_id` (`subject_id`),
  CONSTRAINT `fk_user_subject_subject_id` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_user_subject_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table privatnicasovi.user_subject: ~0 rows (approximately)
/*!40000 ALTER TABLE `user_subject` DISABLE KEYS */;
INSERT INTO `user_subject` (`user_subject_id`, `user_id`, `subject_id`) VALUES
	(5, 18, 1),
	(6, 18, 4);
/*!40000 ALTER TABLE `user_subject` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
