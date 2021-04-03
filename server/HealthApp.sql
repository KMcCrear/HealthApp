-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 23, 2021 at 02:56 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
CREATE DATABASE IF NOT EXISTS HealthApp;
USE HealthApp;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `HealthApp`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--
DROP TABLE  IF EXISTS `users`;

CREATE TABLE IF NOT EXISTS`users` (
  `id` int(11) PRIMARY KEY NOT NULL,
  `firstname` varchar(512) NOT NULL,
  `userLocation` varchar(512),
  `surname` varchar(512) NOT NULL,
  `email` varchar(512) NOT NULL,
  `password` varchar(512) NOT NULL,
  `role` varchar(10) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--
DROP TABLE  IF EXISTS `reminders`;
CREATE TABLE IF NOT EXISTS `reminders`(
  `id` int(11) NOT NUll AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  `userid` int(11) NOT NULL,
  `info` varchar(512) NOT NULL,
  `date` varchar(20),
  `time` varchar(20),
  `location` varchar(512)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE  IF EXISTS `workouts`;
CREATE TABLE `workouts` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `workoutname` varchar(512) NOT NULL,
  `totaltime` varchar(20) DEFAULT NULL,
  `distance` int(20) DEFAULT NULL,
  `calories` int(20) DEFAULT NULL,
  `avgheartrate` int(20) DEFAULT NULL,
  `location` varchar(512) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE  IF EXISTS `activities`;

CREATE TABLE `activities` (
  `id` int(11) NOT NULL,
  `activityName` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `activities`
--

INSERT INTO `activities` (`id`, `activityName`) VALUES
(1, 'Outdoor Run'),
(3, 'Swimming'),
(4, 'Cycling');
 INSERT INTO `users` (`id`, `firstname`, `surname`, `email`, `password`, `role`) VALUES
(1, 'Kyle', 'McCrear', 'test@gmail.com', 'test', 'user'),
(2, 'test', 'test', 'test123@gmail.com', '$2b$10$u6dT/I4crqKcrVnum98Dk.gBGWN.dyNquSxK4xWcJtgokfxRodiJ6', 'user'),
(3, 'Kyle', 'McCrear', 'google@gmail.com', '$2b$10$9lNdystBBA5S7LzHZg33iuTwZEelOck.664jR6mqBCZzjKEsNhI0a', 'user'),
(6, 'TEst', 'test', 'test@dsfsd', '$2b$10$PsBTvi7Kv7pubDesDxmy2ukoA1C38JTu4FDni1phXVYq2yfcc3J3e', 'user'),
(7, 'asdasd', '', '', '$2b$10$y7wXJYCZ6lG5EJQQl0K8HOAi20yA1tePHCMnO1vzZp9UWZSq6pLXm', 'user'),
(12, 'admin', 'admin', 'admin@gcuhealth.co.uk', '$2b$10$neyGefUfXF.7aKtJvVxDD.Amx1D/lTfsS3X5q9r7gq2xw8y9MoBke', 'admin');
INSERT INTO `reminders` (`id`,`userid`, `info`, `date`,`time`,`location`) VALUES (1, 13, 'reminder in db lmao','01/01/2040' ,'4:20pm','idk some st.');
--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
DROP TABLE  IF EXISTS `userdetails`;
CREATE TABLE `userdetails` (
  `userid` int(11) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `weight` int(4) DEFAULT NULL,
  `height` int(4) DEFAULT NULL,
  `contact` bigint(255) DEFAULT NULL,
  `gender` varchar(512) DEFAULT NULL,
  `bloodtype` varchar(512) DEFAULT NULL,
  `isdiabetic` varchar(512) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
-- AUTO_INCREMENT for dumped tables
--
ALTER TABLE `userdetails`
  ADD PRIMARY KEY (`userid`),
  ADD KEY `userid` (`userid`);

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13; 
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `activities`
  MODIFY `id` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;
ALTER TABLE `workouts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
ALTER TABLE `userdetails`
  ADD CONSTRAINT `id_fk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;