-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-10-2016 a las 17:20:53
-- Versión del servidor: 5.5.50-0ubuntu0.14.04.1
-- Versión de PHP: 5.5.9-1ubuntu4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `bd_gamebets`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `id_prod` int(20) NOT NULL,
  `prod_name` varchar(200) COLLATE utf8_bin NOT NULL,
  `price` int(15) NOT NULL,
  `dis_date` varchar(15) COLLATE utf8_bin NOT NULL,
  `exp_date` varchar(15) COLLATE utf8_bin NOT NULL,
  `status` varchar(40) COLLATE utf8_bin NOT NULL,
  `avatar` varchar(200) COLLATE utf8_bin NOT NULL,
  `country` varchar(30) COLLATE utf8_bin NOT NULL,
  `province` varchar(30) COLLATE utf8_bin NOT NULL,
  `population` varchar(30) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id_prod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id_prod`, `prod_name`, `price`, `dis_date`, `exp_date`, `status`, `avatar`, `country`, `province`, `population`) VALUES
(12346542, 'ADSSA', 654, '10/06/2016', '10/27/2016', 'Preowned', 'media/default-avatar.jpg', 'ES', '37', 'Abusejo'),
(25265843, 'Raton', 22, '10/15/2016', '11/31/2016', 'New', 'media/default-avatar.jpg', 'ES', '37', 'Abusejo'),
(65487585, 'Knqe', 98, '10/06/2016', '10/27/2016', 'Preowned', 'media/default-avatar.jpg', 'ES', '01', 'Sabando'),
(65652885, 'Teclado', 98, '08/12/2016', '10/20/2016', 'Preowned', 'media/default-avatar.jpg', 'ES', '01', 'Sabando'),
(98756258, 'Adsadsad', 1500, '10/07/2016', '10/22/2016', 'Preowned', 'media/default-avatar.jpg', 'ES', '03', 'Alcoi/alcoy'),
(98756586, 'Monitor', 1500, '09/05/2016', '10/26/2016', 'Repair', 'media/default-avatar.jpg', 'ES', '03', 'Alcoi/alcoy');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;