CREATE DATABASE  IF NOT EXISTS `demo` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `demo`;
-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: demo
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL,
  `quantity` int NOT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKl70asp4l4w0jmbm1tqyofho4o` (`user_id`),
  CONSTRAINT `FKl70asp4l4w0jmbm1tqyofho4o` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (15,0,14),(17,0,16),(123,0,122);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_item`
--

DROP TABLE IF EXISTS `cart_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_item` (
  `id` int NOT NULL,
  `quantity` int NOT NULL,
  `cart_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1uobyhgl1wvgt1jpccia8xxs3` (`cart_id`),
  KEY `FKjcyd5wv4igqnw413rgxbfu4nv` (`product_id`),
  CONSTRAINT `FK1uobyhgl1wvgt1jpccia8xxs3` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`),
  CONSTRAINT `FKjcyd5wv4igqnw413rgxbfu4nv` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_item`
--

LOCK TABLES `cart_item` WRITE;
/*!40000 ALTER TABLE `cart_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL,
  `active` bit(1) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `description` text DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,_binary '','2023-11-06 15:35:44','<p>sản phẩm mới2</p>','http://res.cloudinary.com/dhyfblkux/image/upload/v1700518192/dm1.jpg','Giường'),(2,_binary '','2023-11-06 17:52:24','<p>sản phẩm mới2</p>','http://res.cloudinary.com/dhyfblkux/image/upload/v1700518360/m2.jpg','Tủ'),(19,_binary '\0','2023-11-07 08:59:55','San Pham Moi','http://res.cloudinary.com/dhyfblkux/image/upload/v1699322392/quan11.jpg','Nguyễn Văn Hoàng'),(21,_binary '\0','2023-11-07 09:14:18','Ban Tinh','http://res.cloudinary.com/dhyfblkux/image/upload/v1699195980/quan6.jpg','Ban'),(22,_binary '\0','2023-11-07 10:08:08','San ham','http://res.cloudinary.com/dhyfblkux/image/upload/v1699195646/quan7.jpg','Day');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (157);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_item`
--

DROP TABLE IF EXISTS `order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item` (
  `id` int NOT NULL,
  `amount` double NOT NULL,
  `quantity` int NOT NULL,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK551losx9j75ss5d6bfsqvijna` (`product_id`),
  KEY `FKt4dc2r9nbvbujrljv3e23iibt` (`order_id`),
  CONSTRAINT `FK551losx9j75ss5d6bfsqvijna` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `FKt4dc2r9nbvbujrljv3e23iibt` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item`
--

LOCK TABLES `order_item` WRITE;
/*!40000 ALTER TABLE `order_item` DISABLE KEYS */;
INSERT INTO `order_item` VALUES (67,150000,1,65,3),(73,300000,2,69,3),(78,150000,1,76,3),(96,150000,1,94,3),(102,150000,1,98,3),(109,10000,1,106,18),(114,150000,1,112,3),(121,10000,1,116,18),(127,150000,1,125,3),(135,400000,2,131,128),(141,200000,1,137,128),(147,150000,1,145,3),(153,200000,1,149,20);
/*!40000 ALTER TABLE `order_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL,
  `amount` double NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `note` text DEFAULT NULL,
  `quantity` int NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `payment_type` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKel9kyl84ego2otj2accfd8mr7` (`user_id`),
  CONSTRAINT `FKel9kyl84ego2otj2accfd8mr7` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (65,150000,'2023-11-14 04:17:19','ok',1,'COMPLETED',16,'COD',NULL),(69,300000,'2023-11-19 11:34:09','ok',1,'COMPLETED',16,'COD',NULL),(76,150000,'2023-11-19 12:12:13','ok',1,'SUBMITTED',16,'COD',NULL),(79,0,'2023-11-19 12:12:14',NULL,0,'SUBMITTED',16,'COD',NULL),(80,0,'2023-11-19 12:12:14',NULL,0,'SUBMITTED',16,'COD',NULL),(83,0,'2023-11-19 12:34:59',NULL,0,'SUBMITTED',16,'COD',NULL),(85,0,'2023-11-19 12:35:38',NULL,0,'SUBMITTED',16,'COD',NULL),(87,0,'2023-11-19 12:36:04',NULL,0,'SUBMITTED',16,'COD',NULL),(89,0,'2023-11-19 12:37:17',NULL,0,'SUBMITTED',16,'COD',NULL),(91,0,'2023-11-19 12:37:17',NULL,0,'SUBMITTED',16,'COD',NULL),(94,150000,'2023-11-19 12:42:41','ok',1,'SUBMITTED',16,'COD',NULL),(98,150000,'2023-11-19 13:36:48','ook',1,'SUBMITTED',16,'COD',NULL),(106,1000000,'2023-11-19 14:09:28','ok',1,'SUBMITTED',16,'Online',NULL),(112,150000,'2023-11-19 14:20:47','ok',1,'COMPLETED',16,'COD',NULL),(116,1000000,'2023-11-19 16:57:41','ok',1,'SUBMITTED',16,'Online',NULL),(125,150000,'2023-11-21 05:20:44','ok',1,'SUBMITTED',16,'COD','DH21112023'),(131,40000000,'2023-11-21 05:26:59','ok',1,'SUBMITTED',16,'Online','DH21112023'),(137,20000000,'2023-11-21 05:31:29','ok',1,'COMPLETED',16,'Online','DH21112023'),(145,150000,'2023-11-21 07:57:11','ok',1,'SUBMITTED',16,'COD','DH21112023'),(149,200000,'2023-11-21 08:01:46','?k',1,'SUBMITTED',16,'Online','DH21112023');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL,
  `active` bit(1) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `mass` double NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` double NOT NULL,
  `quantity` int NOT NULL,
  `categry_id` int DEFAULT NULL,
  `sale` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FKjgdcm077jox2usqqh888lavdq` (`categry_id`),
  CONSTRAINT `FKjgdcm077jox2usqqh888lavdq` FOREIGN KEY (`categry_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (3,_binary '','2023-11-07 01:52:56','<p>San Pham moi</p>','http://res.cloudinary.com/dhyfblkux/image/upload/v1700518478/giuong-sat-sinh-vien-jsv.jpg',50,'Giường sắt sinh viên JSV',150000,98,1,7),(18,_binary '','2023-11-07 08:38:02','<p>San Pham moi</p><p>đẹp tô<strong>ss</strong></p>','http://res.cloudinary.com/dhyfblkux/image/upload/v1700535208/giuong-go-khung-sat-2-tang-js-2t-g.jpg',50,'Giường gỗ khung sắt 2 tầng JS-2T-G',100000,100,1,2),(20,_binary '','2023-11-07 09:01:52','<p>San Pham Moi</p>','http://res.cloudinary.com/dhyfblkux/image/upload/v1700518628/tu-go-cao-khong-canh-tg04-0.jpg',70,'Tủ gỗ cao không cánh TG04-0',200000,99,2,1),(128,_binary '','2023-11-21 05:23:40','<p>Sản phẩm tốt</p>','http://res.cloudinary.com/dhyfblkux/image/upload/v1700519006/tu-locker-go-lk09.jpg',90,'Tủ locker gỗ LK09',200000,97,2,3);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipment`
--

DROP TABLE IF EXISTS `shipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipment` (
  `id` int NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `receiver` varchar(255) DEFAULT NULL,
  `order_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8amw90d62x67honrwucvjado7` (`order_id`),
  CONSTRAINT `FK8amw90d62x67honrwucvjado7` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipment`
--

LOCK TABLES `shipment` WRITE;
/*!40000 ALTER TABLE `shipment` DISABLE KEYS */;
INSERT INTO `shipment` VALUES (66,'Mieng Ha Hoa Son Ung Hoa Ha Noi','0374263823','Van  Hoang',65),(71,'Mieng Ha Hoa Son Ung Hoa Ha Noi','0374263823','Van  Hoang',69),(77,'Mieng Ha Hoa Son Ung Hoa Ha Noi','0374263823','Van  Hoang',76),(81,NULL,NULL,NULL,79),(82,NULL,NULL,NULL,80),(84,NULL,NULL,NULL,83),(86,NULL,NULL,NULL,85),(88,NULL,NULL,NULL,87),(90,NULL,NULL,NULL,89),(92,NULL,NULL,NULL,91),(95,'Mieng Ha Hoa Son Ung Hoa Ha Noi','0374263823','Van  Hoang',94),(101,'Mieng Ha Hoa Son Ung Hoa Ha Noi','0374263823','Van  Hoang',98),(107,'Mieng Ha Hoa Son Ung Hoa Ha Noi','0374263823','Van  Hoang',106),(113,'Mieng Ha Hoa Son Ung Hoa Ha Noi','0374263823','Van  Hoang',112),(119,'Mieng Ha Hoa Son Ung Hoa Ha Noi','0374263823','Van  Hoang',116),(126,'Mieng Ha Hoa Son Ung Hoa Ha Noi','0374263823','Van  Hoang',125),(133,'Mieng Ha Hoa Son Ung Hoa Ha Noi','0374263823','Van  Hoang',131),(139,'Mieng Ha Hoa Son Ung Hoa Ha Noi','0374263823','Van  Hoang',137),(146,'Mieng Ha Hoa Son Ung Hoa Ha Noi','0374263823','Van  Hoang',145),(152,'Mieng Ha Hoa Son Ung Hoa Ha Noi','0374263823','Van  Hoang',149);
/*!40000 ALTER TABLE `shipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `create_at` datetime NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `enable` bit(1) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `otp` varchar(255) DEFAULT NULL,
  `otp_expired` datetime DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `reset_password_token` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `token_expiration` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (14,NULL,'2023-11-07 07:39:47','hoangkoo@gmail.com',_binary '','Nguyễn Văn Hoàng','$2a$10$JRJ3Rt2DTyyCwHm22bETyuVK5nmvSXdZw.q8FMlPmGFooP7T3jvcC','2023-11-07 08:39:47','$2a$10$ESfpN85tl5L2PO.71eQ1xu29sTvRxClvPMc2s5ba9sGT2ebgXClXG',NULL,NULL,'USER',NULL),(16,'Mieng Ha Hoa Son Ung Hoa Ha Noi','2023-11-07 08:05:40','hoangkooh@gmail.com',_binary '','Nguyễn Văn Hoàng','$2a$10$ZGc0kjTcZp4FW62FYaApGO0KRiGmfbchZ9X78g7gNEwyj0UsSoLxq','2023-11-07 09:05:39','$2a$10$ty2ABcgDtSzYzgxrM87EvOw2oBtVKofYZPQ65jqeJW1A2iISrf.OG','0374263823',NULL,'USER','2023-11-07 11:07:52'),(122,NULL,'2023-11-19 21:25:30','hoang2782001@gmail.com',_binary '','admin','$2a$10$14lwIbwUiVHQj8UewHw/weE21ak4U3VAcpcO2B1oFfVCMJB8u9Kem','2023-11-19 22:25:30','$2a$10$2XEdUBd.1eQ/v3omTprDs.UlfPznewORFIBI8o1M/SeSu5qHGZAQC',NULL,NULL,'ADMIN',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-22 21:18:36
