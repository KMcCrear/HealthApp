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

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(512) NOT NULL,
  `surname` varchar(512) NOT NULL,
  `email` varchar(512) NOT NULL,
  `password` varchar(512) NOT NULL,
  `role` varchar(10) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `surname`, `email`, `password`, `role`) VALUES
(1, 'Kyle', 'McCrear', 'test@gmail.com', 'test', 'user'),
(2, 'test', 'test', 'test123@gmail.com', '$2b$10$u6dT/I4crqKcrVnum98Dk.gBGWN.dyNquSxK4xWcJtgokfxRodiJ6', 'user'),
(3, 'Kyle', 'McCrear', 'google@gmail.com', '$2b$10$9lNdystBBA5S7LzHZg33iuTwZEelOck.664jR6mqBCZzjKEsNhI0a', 'user'),
(6, 'TEst', 'test', 'test@dsfsd', '$2b$10$PsBTvi7Kv7pubDesDxmy2ukoA1C38JTu4FDni1phXVYq2yfcc3J3e', 'user'),
(7, 'asdasd', '', '', '$2b$10$y7wXJYCZ6lG5EJQQl0K8HOAi20yA1tePHCMnO1vzZp9UWZSq6pLXm', 'user'),
(12, 'admin', 'admin', 'admin@gcuhealth.co.uk', '$2b$10$neyGefUfXF.7aKtJvVxDD.Amx1D/lTfsS3X5q9r7gq2xw8y9MoBke', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
