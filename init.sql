-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-05-2024 a las 00:28:49
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `otatime`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category`
--

CREATE TABLE `category` (
  `id_category` int(11) NOT NULL,
  `name_category` varchar(50) DEFAULT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `category`
--

INSERT INTO `category` (`id_category`, `name_category`, `image`) VALUES
(1, 'Hotel', 'https://cdn-icons-png.flaticon.com/512/594/594106.png'),
(2, 'Restaurante', 'https://cdn-icons-png.flaticon.com/512/1205/1205774.png'),
(3, 'Parque', 'https://cdn-icons-png.flaticon.com/512/3104/3104941.png'),
(4, 'Museo', 'https://cdn-icons-png.flaticon.com/512/508/508875.png'),
(5, 'Galería de arte', 'https://cdn-icons-png.flaticon.com/512/2535/2535847.png'),
(6, 'Mirador', 'https://cdn-icons-png.flaticon.com/512/4773/4773945.png'),
(7, 'Cascada', 'https://cdn-icons-png.flaticon.com/512/1788/1788666.png'),
(8, 'Iglesia', 'https://cdn-icons-png.flaticon.com/512/2737/2737125.png'),
(9, 'Hostal', 'https://cdn-icons-png.flaticon.com/512/9068/9068564.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comment`
--

CREATE TABLE `comment` (
  `id_comment` int(11) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `rate` int(11) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `place_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comment`
--

INSERT INTO `comment` (`id_comment`, `content`, `user_id`, `rate`, `date`, `place_id`) VALUES
(1, 'Hola ', 6, 5, '2024-05-08 03:21:49', 1),
(2, 'Jdjej', 6, 2, '2024-05-08 03:22:09', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `country`
--

CREATE TABLE `country` (
  `id_country` int(11) NOT NULL,
  `name_country` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `country`
--

INSERT INTO `country` (`id_country`, `name_country`) VALUES
(1, 'Ecuador'),
(2, 'Estados Unidos'),
(3, 'China'),
(4, 'India'),
(5, 'Alemania'),
(6, 'Francia'),
(7, 'Italia'),
(8, 'Reino Unido'),
(9, 'España'),
(10, 'México'),
(11, 'Canadá'),
(12, 'Brasil'),
(13, 'Japón'),
(14, 'Australia'),
(15, 'Rusia'),
(16, 'Corea del Sur'),
(17, 'Indonesia'),
(18, 'Arabia Saudita'),
(19, 'Turquía'),
(20, 'Sudáfrica'),
(21, 'Argentina'),
(22, 'Colombia'),
(23, 'Malasia'),
(24, 'Tailandia'),
(25, 'Irán'),
(26, 'Egipto'),
(27, 'Vietnam'),
(28, 'Nigeria'),
(29, 'Filipinas'),
(30, 'Bangladesh'),
(31, 'Pakistán'),
(32, 'Países Bajos'),
(33, 'Suecia'),
(34, 'Suiza'),
(35, 'Bélgica'),
(36, 'Noruega'),
(37, 'Austria'),
(38, 'Grecia'),
(39, 'Portugal'),
(40, 'Israel'),
(41, 'Dinamarca'),
(42, 'Singapur'),
(43, 'Finlandia'),
(44, 'Chile'),
(45, 'Irlanda'),
(46, 'Polonia'),
(47, 'Ucrania'),
(48, 'República Checa'),
(49, 'Rumania'),
(50, 'Nueva Zelanda'),
(51, 'Hungría'),
(52, 'Emiratos Árabes Unidos'),
(53, 'Iraq'),
(54, 'Kazajistán'),
(55, 'Perú'),
(56, 'Venezuela'),
(57, 'Bangladés'),
(58, 'Filipinas'),
(59, 'Egipto'),
(60, 'Suecia'),
(61, 'Argelia'),
(62, 'Países Bajos'),
(63, 'Angola'),
(64, 'Sudán'),
(65, 'Kenia'),
(66, 'Ucrania'),
(67, 'Irak'),
(68, 'Marruecos'),
(69, 'Etiopía'),
(70, 'Uganda'),
(71, 'Argelia'),
(72, 'Sudáfrica'),
(73, 'Perú'),
(74, 'Ghana'),
(75, 'Venezuela'),
(76, 'Yemen'),
(77, 'Mozambique'),
(78, 'Camboya');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `place`
--

CREATE TABLE `place` (
  `id_place` int(11) NOT NULL,
  `name_place` varchar(50) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `description_en` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `lng` double DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `place`
--

INSERT INTO `place` (`id_place`, `name_place`, `description`, `description_en`, `image`, `address`, `lat`, `lng`, `category_id`) VALUES
(1, 'Cascada de Peguche', 'Hola munfo', 'Hello word', 'assets\\uploads\\a02573567ee2121f79d4af624c197127', '6QR5+VHQ', 0.24050593527718914, -78.24005875736475, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `type_user`
--

CREATE TABLE `type_user` (
  `id_usertype` int(11) NOT NULL,
  `rol` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `type_user`
--

INSERT INTO `type_user` (`id_usertype`, `rol`) VALUES
(1, 'Admin'),
(2, 'Visitante');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `mail` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `usertype_id` int(11) DEFAULT NULL,
  `state` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id_user`, `name`, `last_name`, `country_id`, `age`, `mail`, `password`, `usertype_id`, `state`) VALUES
(1, 'Maicol', 'Cachiguango ', 1, 27, 'michael@mail.com', '$2b$10$BapXhzsTmFhplh.ov6YDu.bJ2rm0Enlzv25tIimP63vH/H6Vq3gui', 2, 1),
(6, 'Xavier', 'Puentestar', 1, 26, 'xavierpuentestar97@gmail.com', '$2b$10$7x98ALkIBYWmQXvZ/MRE0eFSD0nGfJzOOD3CN3xUHcSUqr9JvzMdC', 2, 1),
(7, 'Alma', 'Graff', 9, 27, 'almagraff20@gmail.com', '$2b$10$4hK5O4pRmjfsonnCWrmgoePH5aK4rKIDcxjUkNLwcG1eqMcHFNw/i', 2, 1),
(8, 'Rosa', 'Puentestar', 2, 35, 'rosaesperanza@gmail.com', '$2b$10$nucHlPFB27cg.RykBtfBxOXorKaBmFRSEFnznUQ9mMQg.TNEtXigW', 2, 1),
(9, 'hola', 'mundo', 5, 24, 'holamundo@mail.com', '$2b$10$yKeaAdN0lTp/kyaSQTUGfeIxHhmMSuVlND60e5G5Rjsx2ihGn/2wa', 2, 0),
(10, 'Hanna', 'Cordova', 1, 18, 'hana@gmail.com', '$2b$10$0952f81mknEcvYKJJIl..evX/NHKW4cLSECt8zz1m3YMmc6u81C3G', 2, 0),
(11, 'Admin', 'OtaTime', 1, 27, 'otatime42@gmail.com', '$2b$10$/o00x.ml9haXrYXUe.YvkO0x7gQFWMrIWK3j5M90iMeCWSuzKFjSy', 1, 1),
(12, 'Henry', 'Flores', 1, 27, 'rockstarcks@gmail.com', '$2b$10$TIQ9M8y7gHAFrfRqapDb5eh93WYmrr4.2oHKU3E34XvjJzYtjmrG6', 2, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id_category`);

--
-- Indices de la tabla `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id_comment`),
  ADD KEY `usuario_id` (`user_id`),
  ADD KEY `sitio_id` (`place_id`);

--
-- Indices de la tabla `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`id_country`);

--
-- Indices de la tabla `place`
--
ALTER TABLE `place`
  ADD PRIMARY KEY (`id_place`),
  ADD KEY `categoria_id` (`category_id`);

--
-- Indices de la tabla `type_user`
--
ALTER TABLE `type_user`
  ADD PRIMARY KEY (`id_usertype`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `tipouser_id` (`usertype_id`),
  ADD KEY `pais_id` (`country_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `category`
--
ALTER TABLE `category`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `comment`
--
ALTER TABLE `comment`
  MODIFY `id_comment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `country`
--
ALTER TABLE `country`
  MODIFY `id_country` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT de la tabla `place`
--
ALTER TABLE `place`
  MODIFY `id_place` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `type_user`
--
ALTER TABLE `type_user`
  MODIFY `id_usertype` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`place_id`) REFERENCES `place` (`id_place`);

--
-- Filtros para la tabla `place`
--
ALTER TABLE `place`
  ADD CONSTRAINT `place_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id_category`);

--
-- Filtros para la tabla `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`usertype_id`) REFERENCES `type_user` (`id_usertype`),
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`country_id`) REFERENCES `country` (`id_country`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
