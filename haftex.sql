-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 20, 2025 at 09:48 PM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `haftex`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `koszty`
--

CREATE TABLE `koszty` (
  `id` int(11) NOT NULL,
  `nazwa_produktu` varchar(255) NOT NULL,
  `miesiac` text NOT NULL,
  `ilosc` int(11) NOT NULL,
  `cena` float NOT NULL,
  `suma` float NOT NULL,
  `rok` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `koszty`
--

INSERT INTO `koszty` (`id`, `nazwa_produktu`, `miesiac`, `ilosc`, `cena`, `suma`, `rok`) VALUES
(0, 'Nitka', 'Luty', 100, 12.5, 1250, 2025),
(0, 'olavoga_45', 'Luty', 355, 7.6, 2698, 2025),
(0, 'olavoga_45', 'Czerwiec', 355, 7.67, 2722.85, 2028),
(0, 'olavoga_45', 'Czerwiec', 355, 7.67, 2722.85, 2028),
(0, 'asjdsa', 'Luty', 232, 2, 464, 2025);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `produkty`
--

CREATE TABLE `produkty` (
  `id` int(11) NOT NULL,
  `nazwa_produktu` varchar(255) NOT NULL,
  `miesiac` text NOT NULL,
  `ilosc` int(11) NOT NULL,
  `cena` float NOT NULL,
  `suma` float NOT NULL,
  `rok` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `produkty`
--

INSERT INTO `produkty` (`id`, `nazwa_produktu`, `miesiac`, `ilosc`, `cena`, `suma`, `rok`) VALUES
(151, 'olavoga_45', 'Luty', 355, 7.6, 2698, 2025),
(152, 'olavoga_45', 'Luty', 355, 7.6, 2698, 2025),
(153, 'olavoga_45', 'Luty', 355, 7.6, 2698, 2025),
(154, 'olavoga_45', 'Luty', 355, 7.6, 2698, 2025),
(155, 'olavoga_45', 'Luty', 355, 7.6, 2698, 2025),
(156, 'olavoga_45', 'Luty', 355, 7.6, 2698, 2025),
(157, 'olavoga_45', 'Luty', 355, 7.6, 2698, 2025),
(158, 'olavoga_45', 'Czerwiec', 355, 7.67, 2722.85, 2028),
(159, 'olavoga_45', 'Czerwiec', 355, 7.67, 2722.85, 2028),
(160, 'olavoga_45', 'Czerwiec', 355, 7.67, 2722.85, 2028),
(161, 'olavoga_45', 'Luty', 6765, 86, 581790, 2025),
(162, 'olavoga_45', 'Luty', 6765, 86, 581790, 2025),
(163, 'olavoga_45', 'Luty', 6765, 86, 581790, 2025),
(164, 'olavoga_45', 'Luty', 6765, 86, 581790, 2025),
(165, 'olavoga_45', 'Luty', 6765, 86, 581790, 2025),
(166, 'asjdsa', 'Luty', 222, 32, 7104, 2025),
(167, 'asjdsa', 'Luty', 222, 32, 7104, 2025);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `produkty`
--
ALTER TABLE `produkty`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `produkty`
--
ALTER TABLE `produkty`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=168;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
