-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 07, 2024 at 04:47 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `refugiocanino`
--

-- --------------------------------------------------------

--
-- Table structure for table `perrosdisponbles`
--

CREATE TABLE `perrosdisponbles` (
  `id` int(11) NOT NULL,
  `Nombre` text NOT NULL,
  `Caracter` text NOT NULL,
  `Raza` int(11) NOT NULL,
  `Tamaño_Estimado` int(11) NOT NULL,
  `Hogar_Necesario` int(11) NOT NULL,
  `Edad_Aprox` text NOT NULL,
  `Castración` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `perrosdisponbles`
--

INSERT INTO `perrosdisponbles` (`id`, `Nombre`, `Caracter`, `Raza`, `Tamaño_Estimado`, `Hogar_Necesario`, `Edad_Aprox`, `Castración`) VALUES
(1, 'oreo', 'Hembra, Activa, Alegre y Sociable', 2, 3, 2, '1 Año y 6 Meses', 'Realizada en Octubre 2023'),
(2, 'Pepa', 'Hembra, Tranquila y Sociable', 4, 4, 4, '6 Meses', 'Pendiente de Primer Celo'),
(3, 'Rambo', 'Macho, Guardian y Activo', 3, 1, 1, '6 Años', 'Realizada con Anterioridad al rescate'),
(4, 'Nuria', 'Hebra, Sal Pimienta', 1, 2, 2, '1 Año', 'Pendiente'),
(5, 'Pampa', 'Macho, Negro, Pelo Corto, Elegante', 1, 1, 1, '3 Años', 'Realizada con Anterioridad Al Rescate'),
(6, 'Pana', 'Hembra, Gris, Curiosa', 2, 3, 3, '2 Meses', 'Pendiente al Primer Celo');

-- --------------------------------------------------------

--
-- Table structure for table `raza`
--

CREATE TABLE `raza` (
  `Raza_id` int(11) NOT NULL,
  `Raza_Nombre` text NOT NULL,
  `Raza_Uso` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `raza`
--

INSERT INTO `raza` (`Raza_id`, `Raza_Nombre`, `Raza_Uso`) VALUES
(1, 'Schnauzer', 'vigilancia y protección'),
(2, 'Cocker Spaniel', 'cazadores y perros de aguas'),
(3, 'Maltés', 'perros de compañía'),
(4, 'Desconocida', 'Cruza de Razas y Usos');

-- --------------------------------------------------------

--
-- Table structure for table `req_hogar`
--

CREATE TABLE `req_hogar` (
  `Req_id` int(11) NOT NULL,
  `Tipo` text NOT NULL,
  `Parque` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `req_hogar`
--

INSERT INTO `req_hogar` (`Req_id`, `Tipo`, `Parque`) VALUES
(1, 'Departamento-Cuidad', 0),
(2, 'Casa-Ciudad', 1),
(3, 'Casa de Campo', 1),
(4, 'Puesto-Monte-Campo', 1);

-- --------------------------------------------------------

--
-- Table structure for table `sizes`
--

CREATE TABLE `sizes` (
  `Size_id` int(11) NOT NULL,
  `Size_name` text NOT NULL,
  `Size_peso` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sizes`
--

INSERT INTO `sizes` (`Size_id`, `Size_name`, `Size_peso`) VALUES
(1, 'Pequeño', '3 a 10 kg'),
(2, 'Mediano', '10 a 25 kg'),
(3, 'Grande', '25 a 45 kg'),
(4, 'Gigantes', 'Mayor a  45kg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `perrosdisponbles`
--
ALTER TABLE `perrosdisponbles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Tamaño` (`Tamaño_Estimado`),
  ADD KEY `Requerimientos` (`Hogar_Necesario`),
  ADD KEY `Raza` (`Raza`);

--
-- Indexes for table `raza`
--
ALTER TABLE `raza`
  ADD PRIMARY KEY (`Raza_id`);

--
-- Indexes for table `req_hogar`
--
ALTER TABLE `req_hogar`
  ADD PRIMARY KEY (`Req_id`);

--
-- Indexes for table `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`Size_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `perrosdisponbles`
--
ALTER TABLE `perrosdisponbles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `raza`
--
ALTER TABLE `raza`
  MODIFY `Raza_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `sizes`
--
ALTER TABLE `sizes`
  MODIFY `Size_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `perrosdisponbles`
--
ALTER TABLE `perrosdisponbles`
  ADD CONSTRAINT `Raza` FOREIGN KEY (`Raza`) REFERENCES `raza` (`Raza_id`),
  ADD CONSTRAINT `Requerimientos` FOREIGN KEY (`Hogar_Necesario`) REFERENCES `req_hogar` (`Req_id`),
  ADD CONSTRAINT `Tamaño` FOREIGN KEY (`Tamaño_Estimado`) REFERENCES `sizes` (`Size_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
