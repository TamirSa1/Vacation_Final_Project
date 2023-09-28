-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: project3
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `VacationID` int NOT NULL AUTO_INCREMENT,
  `Destination` varchar(100) DEFAULT NULL,
  `Description` text,
  `StartDate` date DEFAULT NULL,
  `EndDate` date DEFAULT NULL,
  `Price` decimal(10,2) DEFAULT NULL,
  `ImageFileName` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`VacationID`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (25,'Hawaii','Experience the beautiful beaches and tropical landscapes.','2023-09-15','2023-09-25',1600.00,'https://media.istockphoto.com/id/938335974/photo/aerial-view-of-kualoa-area-of-oahu-hawaii.jpg?s=612x612&w=0&k=20&c=OqqkjtRGFffwCx5Ac4kyfO9AReN-wnc6hGW8jJp7vok='),(26,'Paris','Explore the romantic streets and iconic landmarks of Paris.','2023-10-10','2023-10-20',1200.00,'https://media.istockphoto.com/id/1145422105/photo/eiffel-tower-aerial-view-paris.jpg?s=612x612&w=0&k=20&c=sFn6FwTJR0TpX3rP_W4VHrbkTB__6l5kr-lkkqdYrtE='),(27,'Bali','Relax and rejuvenate in the serene atmosphere of Bali.','2023-11-05','2023-11-15',1800.00,'https://media.istockphoto.com/id/675172642/photo/pura-ulun-danu-bratan-temple-in-bali.jpg?s=612x612&w=0&k=20&c=_MPdmDviIyhldqhf7t6s63C-bZbTGfNHMlJP9SIa8Y0='),(28,'New York','Discover the bustling energy of the city that never sleeps.','2023-09-25','2023-10-05',1300.00,'https://i.natgeofe.com/k/5b396b5e-59e7-43a6-9448-708125549aa1/new-york-statue-of-liberty.jpg'),(29,'Tokyo','Immerse yourself in the vibrant culture and technology of Tokyo.','2023-10-30','2023-11-10',1600.00,'https://media.istockphoto.com/id/1131743616/photo/aerial-view-of-tokyo-cityscape-with-fuji-mountain-in-japan.jpg?s=612x612&w=0&k=20&c=0QcSwnyzP__YpBewnQ6_-OZkn0XDtq-mXyvLSSakjZE='),(30,'Rome','Explore the ancient history and architecture of Rome.','2023-11-15','2023-11-25',1400.00,'https://www.edreams.com/blog/wp-content/uploads/sites/3/2018/07/view-rome.jpg'),(31,'Maldives','Experience luxury and relaxation on stunning island resorts.','2023-12-01','2023-12-10',2000.00,'https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?cs=srgb&dl=pexels-asad-photo-maldives-1483053.jpg&fm=jpg'),(32,'Sydney','Enjoy the beauty of Sydney\'s harbor and diverse culture.','2023-12-20','2023-12-30',1700.00,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuCpwVXupRQGJN0MO8ha2Ggi0pmXUISeeZIg&usqp=CAU'),(33,'Cancun','Party and unwind on the beaches of Cancun.','2023-09-10','2023-09-20',1400.00,'https://st.depositphotos.com/2944235/54459/i/450/depositphotos_544592770-stock-photo-view-of-beautiful-hotels-in.jpg'),(34,'London','Experience the mix of history and modernity in London.','2023-10-15','2023-10-25',1500.00,'https://images.unsplash.com/photo-1520986606214-8b456906c813?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxvbmRvbnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'),(35,'Santorini','Witness breathtaking sunsets and stunning views in Santorini.','2023-11-20','2023-11-30',1700.00,'https://media.istockphoto.com/id/1145450965/photo/santorini-island-greece.jpg?s=612x612&w=0&k=20&c=AY_kxRrkTjbDLhqpotxgW8CZp4ovEIM1tRdTrvXKcAM='),(36,'Rio de Janeiro','Celebrate life and culture in the vibrant city of Rio.','2023-12-10','2023-12-20',1600.00,'https://media.istockphoto.com/id/608540602/photo/aerial-panorama-of-botafogo-bay-rio-de-janeiro.jpg?s=170667a&w=0&k=20&c=i7tD6i6BV2aNoGJrBzgceRVpHWSYR9o_2gR93CXZnoQ=');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-28 15:24:17
