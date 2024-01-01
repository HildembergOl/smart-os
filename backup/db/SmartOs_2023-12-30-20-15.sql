-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: localhost    Database: SmartOs
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Groups`
--

DROP TABLE IF EXISTS `Groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Groups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `note` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parentId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Groups_parentId_fkey` (`parentId`),
  CONSTRAINT `Groups_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Groups` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Groups`
--

LOCK TABLES `Groups` WRITE;
/*!40000 ALTER TABLE `Groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `Groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrderService`
--

DROP TABLE IF EXISTS `OrderService`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OrderService` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `tenancyId` int NOT NULL,
  `situationId` int NOT NULL,
  `customerId` int NOT NULL,
  `typeOsId` int NOT NULL,
  `dateCreated` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `dateAppoint` datetime(3) DEFAULT NULL,
  `dateService` datetime(3) DEFAULT NULL,
  `codeOS` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amountService` decimal(65,30) NOT NULL DEFAULT '0.000000000000000000000000000000',
  `amountDiscount` decimal(65,30) NOT NULL DEFAULT '0.000000000000000000000000000000',
  `amount` decimal(65,30) NOT NULL DEFAULT '0.000000000000000000000000000000',
  `note` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `OrderService_tenancyId_fkey` (`tenancyId`),
  KEY `OrderService_situationId_fkey` (`situationId`),
  KEY `OrderService_customerId_fkey` (`customerId`),
  KEY `OrderService_typeOsId_fkey` (`typeOsId`),
  CONSTRAINT `OrderService_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `tbPerson` (`id`),
  CONSTRAINT `OrderService_situationId_fkey` FOREIGN KEY (`situationId`) REFERENCES `Groups` (`id`),
  CONSTRAINT `OrderService_tenancyId_fkey` FOREIGN KEY (`tenancyId`) REFERENCES `tbTenancy` (`id`),
  CONSTRAINT `OrderService_typeOsId_fkey` FOREIGN KEY (`typeOsId`) REFERENCES `tbTypeOs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderService`
--

LOCK TABLES `OrderService` WRITE;
/*!40000 ALTER TABLE `OrderService` DISABLE KEYS */;
/*!40000 ALTER TABLE `OrderService` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbPerson`
--

DROP TABLE IF EXISTS `tbPerson`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbPerson` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `tenancyId` int NOT NULL,
  `reference` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `corporateName` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `socialName` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `document` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `situationId` int NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `zipCode` varchar(8) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `numberAddress` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `complement` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `district` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `codeIBGE` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tbPerson_tenancyId_fkey` (`tenancyId`),
  KEY `tbPerson_situationId_fkey` (`situationId`),
  CONSTRAINT `tbPerson_situationId_fkey` FOREIGN KEY (`situationId`) REFERENCES `Groups` (`id`),
  CONSTRAINT `tbPerson_tenancyId_fkey` FOREIGN KEY (`tenancyId`) REFERENCES `tbTenancy` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbPerson`
--

LOCK TABLES `tbPerson` WRITE;
/*!40000 ALTER TABLE `tbPerson` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbPerson` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbService`
--

DROP TABLE IF EXISTS `tbService`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbService` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `tenancyId` int NOT NULL,
  `situationId` int NOT NULL,
  `reference` int NOT NULL,
  `price` decimal(65,30) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tbService_tenancyId_fkey` (`tenancyId`),
  KEY `tbService_situationId_fkey` (`situationId`),
  CONSTRAINT `tbService_situationId_fkey` FOREIGN KEY (`situationId`) REFERENCES `Groups` (`id`),
  CONSTRAINT `tbService_tenancyId_fkey` FOREIGN KEY (`tenancyId`) REFERENCES `tbTenancy` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbService`
--

LOCK TABLES `tbService` WRITE;
/*!40000 ALTER TABLE `tbService` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbService` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbTenancy`
--

DROP TABLE IF EXISTS `tbTenancy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbTenancy` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `document` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `corporateName` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `socialName` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `situationId` int NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `zipCode` varchar(8) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `numberAddress` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `complement` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `district` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `codeIBGE` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tbTenancy_situationId_fkey` (`situationId`),
  CONSTRAINT `tbTenancy_situationId_fkey` FOREIGN KEY (`situationId`) REFERENCES `Groups` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbTenancy`
--

LOCK TABLES `tbTenancy` WRITE;
/*!40000 ALTER TABLE `tbTenancy` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbTenancy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbTypeOs`
--

DROP TABLE IF EXISTS `tbTypeOs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbTypeOs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `description` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `invoice` tinyint(1) NOT NULL DEFAULT '0',
  `tenancyId` int NOT NULL,
  `situationId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tbTypeOs_situationId_fkey` (`situationId`),
  KEY `tbTypeOs_tenancyId_fkey` (`tenancyId`),
  CONSTRAINT `tbTypeOs_situationId_fkey` FOREIGN KEY (`situationId`) REFERENCES `Groups` (`id`),
  CONSTRAINT `tbTypeOs_tenancyId_fkey` FOREIGN KEY (`tenancyId`) REFERENCES `tbTenancy` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbTypeOs`
--

LOCK TABLES `tbTypeOs` WRITE;
/*!40000 ALTER TABLE `tbTypeOs` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbTypeOs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbUser`
--

DROP TABLE IF EXISTS `tbUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbUser` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `situationId` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tbUser_situationId_fkey` (`situationId`),
  CONSTRAINT `tbUser_situationId_fkey` FOREIGN KEY (`situationId`) REFERENCES `Groups` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbUser`
--

LOCK TABLES `tbUser` WRITE;
/*!40000 ALTER TABLE `tbUser` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbUserTenancy`
--

DROP TABLE IF EXISTS `tbUserTenancy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbUserTenancy` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tenancyId` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tbUserTenancy_tenancyId_fkey` (`tenancyId`),
  KEY `tbUserTenancy_userId_fkey` (`userId`),
  CONSTRAINT `tbUserTenancy_tenancyId_fkey` FOREIGN KEY (`tenancyId`) REFERENCES `tbTenancy` (`id`),
  CONSTRAINT `tbUserTenancy_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `tbUser` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbUserTenancy`
--

LOCK TABLES `tbUserTenancy` WRITE;
/*!40000 ALTER TABLE `tbUserTenancy` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbUserTenancy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'SmartOs'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-30 20:15:54
