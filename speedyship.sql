-- phpMyAdmin SQL Dump
-- version 6.0.0-dev+20251017.e515ecd108
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 27, 2025 at 06:01 AM
-- Server version: 8.4.3
-- PHP Version: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `speedyship`
--

-- --------------------------------------------------------

--
-- Table structure for table `assignments`
--

CREATE TABLE `assignments` (
  `id` int NOT NULL,
  `shipment_id` int DEFAULT NULL,
  `driver_id` int DEFAULT NULL,
  `assigned_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` enum('assigned','picking','delivering','completed','failed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'assigned'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `assignments`
--

INSERT INTO `assignments` (`id`, `shipment_id`, `driver_id`, `assigned_at`, `status`) VALUES
(1, 23, 12, '2025-10-21 21:54:52', 'delivering'),
(2, 22, 12, '2025-10-21 21:54:53', 'delivering'),
(3, 6, 4, '2025-10-21 21:56:55', 'completed'),
(4, 3, 4, '2025-10-21 21:56:55', 'completed'),
(5, 4, 4, '2025-10-21 21:56:56', 'completed'),
(6, 6, 3, '2025-10-21 22:12:18', 'completed'),
(7, 5, 3, '2025-10-21 22:12:58', 'completed'),
(8, 2, 12, '2025-10-21 22:12:59', 'assigned'),
(9, 19, 12, '2025-10-21 22:13:59', 'completed'),
(10, 18, 12, '2025-10-21 22:14:01', 'completed'),
(11, 6, 3, '2025-10-21 23:20:01', 'completed'),
(12, 4, 11, '2025-10-21 23:20:04', 'completed'),
(13, 3, 9, '2025-10-21 23:20:05', 'completed'),
(14, 24, 1, '2025-10-22 12:30:00', 'completed'),
(15, 24, 5, '2025-10-22 12:36:23', 'completed'),
(16, 26, 1, '2025-10-22 12:55:07', 'picking'),
(17, 25, 5, '2025-10-22 12:55:21', 'completed'),
(18, 24, 1, '2025-10-22 16:23:45', 'completed'),
(19, 27, 1, '2025-10-22 16:31:35', 'completed'),
(20, 27, 6, '2025-10-25 12:55:41', 'picking'),
(21, 31, 5, '2025-10-25 13:46:42', 'assigned'),
(22, 30, 8, '2025-10-25 13:47:50', 'completed'),
(23, 28, 8, '2025-10-25 13:47:54', 'completed'),
(24, 29, 8, '2025-10-25 13:47:55', 'completed'),
(25, 37, 8, '2025-10-25 19:26:41', 'completed'),
(26, 34, 14, '2025-10-25 19:48:18', 'assigned'),
(27, 33, 14, '2025-10-25 19:48:21', 'picking'),
(28, 32, 14, '2025-10-25 19:48:23', 'picking'),
(29, 112, 14, '2025-11-03 14:31:23', 'picking'),
(30, 111, 14, '2025-11-03 14:31:37', 'picking'),
(31, 29, 8, '2025-11-03 14:31:54', 'completed'),
(32, 110, 8, '2025-11-03 14:32:51', 'picking'),
(33, 109, 14, '2025-11-03 14:36:40', 'picking'),
(34, 46, 8, '2025-11-03 14:36:44', 'completed'),
(35, 45, 8, '2025-11-03 14:39:29', 'delivering'),
(36, 44, 14, '2025-11-03 14:47:06', 'picking'),
(37, 113, 14, '2025-11-03 15:02:28', 'assigned'),
(38, 114, 14, '2025-11-03 15:04:20', 'assigned'),
(39, 116, 14, '2025-11-03 15:16:11', 'assigned'),
(40, 115, 8, '2025-11-03 15:17:58', 'picking'),
(41, 119, 14, '2025-11-03 15:40:43', 'assigned'),
(42, 118, 14, '2025-11-03 15:41:16', 'assigned'),
(43, 120, 14, '2025-11-03 15:47:09', 'assigned'),
(44, 126, 14, '2025-11-03 16:38:28', 'assigned'),
(45, 122, 17, '2025-11-04 17:23:51', 'completed'),
(46, 165, 31, '2025-11-18 15:56:23', 'delivering'),
(49, 171, 30, '2025-11-19 19:00:54', 'picking'),
(51, 164, 31, '2025-11-19 19:40:19', 'assigned'),
(52, 169, 31, '2025-11-19 19:40:22', 'assigned'),
(53, 174, 30, '2025-11-20 15:52:16', 'assigned'),
(54, 173, 30, '2025-11-20 15:53:09', 'delivering'),
(55, 183, 30, '2025-11-25 15:47:44', 'assigned'),
(56, 182, 30, '2025-11-25 15:48:27', 'picking'),
(57, 188, 30, '2025-11-25 16:25:44', 'picking'),
(58, 191, 12, '2025-11-26 11:21:51', 'assigned');

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `id` int NOT NULL,
  `customer_id` int NOT NULL,
  `dispatcher_id` int DEFAULT NULL,
  `status` enum('active','closed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `started_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ended_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `chats`
--

INSERT INTO `chats` (`id`, `customer_id`, `dispatcher_id`, `status`, `started_at`, `ended_at`) VALUES
(1, 9, NULL, 'closed', '2025-10-26 07:44:46', '2025-10-26 07:49:00'),
(2, 9, NULL, 'closed', '2025-10-26 07:49:03', '2025-10-26 07:54:48'),
(3, 9, NULL, 'closed', '2025-10-26 07:54:51', '2025-10-26 08:23:47'),
(4, 9, NULL, 'closed', '2025-10-26 08:23:54', '2025-10-26 08:26:26'),
(5, 9, NULL, 'closed', '2025-10-26 08:26:29', '2025-10-26 08:57:27'),
(6, 9, NULL, 'closed', '2025-10-26 08:57:30', '2025-10-26 09:37:49'),
(7, 9, NULL, 'closed', '2025-10-26 09:37:52', '2025-10-26 09:43:51'),
(8, 9, NULL, 'closed', '2025-10-26 09:43:54', '2025-10-26 09:44:31'),
(9, 9, NULL, 'closed', '2025-10-26 09:44:36', '2025-10-26 10:14:21'),
(10, 9, NULL, 'closed', '2025-10-26 10:14:28', '2025-10-26 10:14:48'),
(11, 9, NULL, 'closed', '2025-10-26 10:14:51', '2025-10-26 10:15:21'),
(12, 9, NULL, 'closed', '2025-10-26 10:15:24', '2025-10-26 10:27:17'),
(13, 9, NULL, 'closed', '2025-10-26 10:27:20', '2025-10-26 10:27:34'),
(14, 9, NULL, 'closed', '2025-10-26 10:27:41', '2025-10-27 08:11:26'),
(15, 9, NULL, 'closed', '2025-10-27 08:11:28', '2025-10-27 08:13:30'),
(16, 9, NULL, 'closed', '2025-10-27 08:13:32', '2025-10-27 08:19:30'),
(17, 9, NULL, 'closed', '2025-10-27 08:19:32', '2025-10-27 08:19:50'),
(18, 9, NULL, 'closed', '2025-10-27 08:19:52', '2025-10-27 08:22:42'),
(19, 9, NULL, 'closed', '2025-10-27 08:22:45', '2025-10-27 08:22:58'),
(20, 9, NULL, 'closed', '2025-10-27 08:23:01', '2025-10-28 13:30:35'),
(21, 9, NULL, 'closed', '2025-10-28 13:30:37', '2025-10-28 13:30:50'),
(22, 9, NULL, 'closed', '2025-11-03 09:45:24', '2025-11-03 09:55:18'),
(23, 9, NULL, 'closed', '2025-11-03 09:56:24', '2025-11-03 09:56:44'),
(24, 9, NULL, 'closed', '2025-11-03 09:56:51', '2025-11-03 09:56:56'),
(25, 9, NULL, 'closed', '2025-11-03 09:57:01', '2025-11-03 09:57:11'),
(26, 9, NULL, 'closed', '2025-11-03 09:58:06', '2025-11-03 10:02:45'),
(27, 9, NULL, 'closed', '2025-11-03 10:02:51', '2025-11-03 10:08:24'),
(28, 9, NULL, 'closed', '2025-11-03 10:08:41', '2025-11-03 10:08:54'),
(29, 9, NULL, 'closed', '2025-11-03 10:08:58', '2025-11-03 10:09:31'),
(30, 9, NULL, 'closed', '2025-11-03 10:09:34', '2025-11-03 10:12:07'),
(31, 9, NULL, 'closed', '2025-11-03 10:12:10', '2025-11-03 10:12:20'),
(32, 9, NULL, 'closed', '2025-11-03 10:12:25', '2025-11-13 11:28:44'),
(33, 9, NULL, 'closed', '2025-11-13 11:33:10', '2025-11-13 11:33:12'),
(34, 9, NULL, 'closed', '2025-11-13 11:34:44', '2025-11-13 11:37:02'),
(35, 9, NULL, 'closed', '2025-11-13 11:44:29', '2025-11-13 11:44:30'),
(36, 9, NULL, 'closed', '2025-11-13 11:49:22', '2025-11-13 11:49:24'),
(37, 9, NULL, 'closed', '2025-11-13 11:49:29', '2025-11-13 11:49:47'),
(38, 9, NULL, 'closed', '2025-11-13 11:49:29', '2025-11-13 11:49:47'),
(39, 9, NULL, 'closed', '2025-11-13 11:49:51', '2025-11-13 11:50:04'),
(40, 9, NULL, 'closed', '2025-11-13 11:49:51', '2025-11-13 11:50:04'),
(41, 9, NULL, 'closed', '2025-11-13 11:54:27', '2025-11-13 11:54:29'),
(42, 9, NULL, 'closed', '2025-11-13 11:54:27', '2025-11-13 11:54:29'),
(43, 9, NULL, 'closed', '2025-11-13 12:10:06', '2025-11-13 12:10:07'),
(44, 9, NULL, 'closed', '2025-11-13 12:10:06', '2025-11-13 12:10:07');

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `assigned_to` int DEFAULT NULL,
  `status` enum('pending','approved','in_progress','resolved','rejected') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `email`, `phone`, `message`, `assigned_to`, `status`, `note`, `created_at`, `updated_at`) VALUES
(1, 'Ngọc Trường', 'truongdubai107@gmail.com', '0363337081', 'Yêu Cầu 2', 10, 'resolved', 'Chúng tôi đã xử lý xong yêu cầu liên hệ của bạn', '2025-10-31 09:14:53', '2025-10-31 10:07:56'),
(2, 'Ngọc Trường 3', 'truongdubaix@gmail.com', '0363337081', 'Yêu cầu 3', 10, 'resolved', 'Ghi Chú 3', '2025-10-31 09:35:35', '2025-10-31 10:16:28'),
(3, 'Ngọc Trường He He', 'truongdubaix@gmail.com', '0363337081', 'Yêu Cầu 4', 10, 'resolved', 'Ghi chú 4', '2025-10-31 09:43:24', '2025-10-31 10:16:38'),
(4, 'Bao minh', 'nbaominh1207@gmail.com', '09005844598', 'Bao Minh yêu cầu hỗ trợ ....', 10, 'resolved', 'Chúng tôi đã liên hệ và xử lý yêu cầu của bạn, xin lỗi quý khách hàng, trân trọng.', '2025-11-12 09:41:24', '2025-11-13 06:49:58'),
(5, 'bao minh', 'nbaominh1207@gmail.com', '0909123456', 'Bảo minh yêu cầu hỗ trợ đơn SP009005', 10, 'resolved', 'chúng tôi đã sử lý đơn hàng SP009005 của bạn thành công ', '2025-11-18 08:53:08', '2025-11-18 08:54:38');

-- --------------------------------------------------------

--
-- Table structure for table `drivers`
--

CREATE TABLE `drivers` (
  `id` int NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `license_no` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vehicle_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('available','delivering','inactive') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'available',
  `user_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `latitude` decimal(10,6) DEFAULT '10.762622',
  `longitude` decimal(10,6) DEFAULT '106.660172',
  `vehicle_id` int DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `drivers`
--

INSERT INTO `drivers` (`id`, `name`, `email`, `phone`, `license_no`, `vehicle_type`, `status`, `user_id`, `created_at`, `latitude`, `longitude`, `vehicle_id`, `updated_at`) VALUES
(1, 'Tài xế A', 'driver1@speedyship.vn', '0909222222', '79A-123.45', 'Xe tải 1.5T', 'delivering', NULL, '2025-10-20 14:02:02', 10.762622, 106.660172, NULL, NULL),
(3, 'Điều phối viên', 'dispatcher@speedyship.vn', '0909111111', '51B-67890', 'Xe tải lớn', 'delivering', NULL, '2025-10-20 14:02:02', 21.028511, 105.804817, NULL, NULL),
(4, 'Truong tai xe', 'truongtaixe@speedyship.vn', '0123456789', '92B-67891', 'Xe SH', 'delivering', NULL, '2025-10-20 14:08:19', 16.054407, 108.202167, NULL, '2025-10-25 12:44:57'),
(5, 'Nguyễn Văn A', 'driverA@speedyship.vn', '0909123456', '79A-12345', 'Xe tải nhỏ', 'delivering', 4, '2025-10-21 04:39:26', 16.054407, 108.202167, NULL, '2025-10-25 12:44:57'),
(6, 'Trần Văn B', 'driverB@speedyship.vn', '0909234567', '51B-56789', 'Xe máy', 'delivering', 5, '2025-10-21 04:39:26', 16.054407, 108.202167, NULL, '2025-10-25 12:44:57'),
(7, 'Lê Văn C', 'driverC@speedyship.vn', '0909345678', '30B-34567', 'Xe tải lớn', 'available', 6, '2025-10-21 04:39:26', 16.054407, 108.202167, NULL, '2025-10-25 12:44:57'),
(8, 'Phạm Văn D', 'driverD@speedyship.vn', '0909456789', '60B-98765', 'SEEP', 'delivering', 7, '2025-10-21 04:39:26', 16.054407, 108.202167, 2, '2025-10-25 12:44:57'),
(9, 'Hoàng Văn E', 'driverE@speedyship.vn', '0909567890', '43C-11111', 'Xe tải 1.5T', 'available', 8, '2025-10-21 04:39:26', 16.054407, 108.202167, NULL, '2025-10-25 12:44:57'),
(10, 'Ngô Văn F', 'driverF@speedyship.vn', '0909678901', '81D-55555', 'Xe máy', 'available', 9, '2025-10-21 04:39:26', 16.054407, 108.202167, NULL, '2025-10-25 12:44:57'),
(11, 'Đỗ Văn G', 'driverG@speedyship.vn', '0909789012', '77B-77777', 'Xe tải 2T', 'available', 10, '2025-10-21 04:39:26', 16.054407, 108.202167, NULL, '2025-10-25 12:44:57'),
(12, 'Bùi Văn H', 'driverH@speedyship.vn', '0909890123', '88C-88888', 'Xe container', 'delivering', 11, '2025-10-21 04:39:26', 16.054407, 108.202167, 2, '2025-11-26 04:21:51'),
(13, 'Phan Văn I', 'driverI@speedyship.vn', '0909901234', '92A-99999', 'Xe máy', 'available', 12, '2025-10-21 04:39:26', 16.054407, 108.202167, 1, '2025-10-25 12:44:57'),
(14, 'truong ne', 'driver@speedyship.vn', '0363337081', NULL, 'SH', 'delivering', NULL, '2025-10-22 09:32:06', 10.762622, 106.660172, 2, '2025-11-03 07:31:23'),
(17, 'Truong TestOTP', 'truongdubai2704@gmail.com', '', NULL, NULL, 'delivering', NULL, '2025-11-04 10:15:27', 10.762622, 106.660172, 2, '2025-11-04 10:23:51'),
(18, 'Driver 1', 'driver1@test.com', '0901000001', NULL, NULL, 'available', 18, '2025-11-06 08:56:56', 10.762622, 106.660172, NULL, NULL),
(19, 'Driver 2', 'driver2@test.com', '0901000002', NULL, NULL, 'available', 19, '2025-11-06 08:58:54', 10.762622, 106.660172, NULL, NULL),
(20, 'Driver 4', 'driver4@test.com', '0901000004', NULL, NULL, 'available', 20, '2025-11-06 08:58:55', 10.762622, 106.660172, NULL, NULL),
(21, 'Driver 5', 'driver5@test.com', '0901000005', NULL, NULL, 'available', 21, '2025-11-06 08:58:56', 10.762622, 106.660172, NULL, NULL),
(22, 'Driver 6', 'driver6@test.com', '0901000006', NULL, NULL, 'available', 22, '2025-11-06 08:58:57', 10.762622, 106.660172, NULL, NULL),
(23, 'Driver 7', 'driver7@test.com', '0901000007', NULL, NULL, 'available', 23, '2025-11-06 08:58:58', 10.762622, 106.660172, NULL, NULL),
(24, 'Driver 8', 'driver8@test.com', '0901000008', NULL, NULL, 'available', 24, '2025-11-06 08:58:59', 10.762622, 106.660172, NULL, NULL),
(25, 'Driver 9', 'driver9@test.com', '0901000009', NULL, NULL, 'available', 25, '2025-11-06 08:59:00', 10.762622, 106.660172, NULL, NULL),
(26, 'Driver 10', 'driver10@test.com', '0901000010', NULL, NULL, 'available', 26, '2025-11-06 08:59:01', 10.762622, 106.660172, NULL, NULL),
(27, 'Nguyen Van A', 'driver@gmail.com', '0987654321', '43A1-12345', 'Xe máy', 'available', NULL, '2025-11-06 09:15:38', 10.762622, 106.660172, NULL, NULL),
(28, 'Nguyen Van Xe', 'truongdubai107@gmail.com', '0363337081', '92K1 - 01430', 'Xe AB', 'available', NULL, '2025-11-06 09:31:38', 10.762622, 106.660172, NULL, NULL),
(30, 'Bao Minh', 'truongdubai2704@gmail.com', '0909123456', '92K1 - 01430', 'Xe Sirus', 'delivering', NULL, '2025-11-06 09:40:13', 10.762622, 106.660172, NULL, '2025-11-19 12:00:43'),
(31, 'Bảo Minh ', 'truongdubaix@gmail.com', '012345788', '43G1 - 88888', 'Xe Wave', 'delivering', 34, '2025-11-06 09:43:19', 10.762622, 106.660172, NULL, '2025-11-18 08:56:23'),
(32, 'Ngoc Truong', 'truongdubai107@gmail.com', '0363337081', '92K1 - 44444', 'SH', 'available', 35, '2025-11-07 07:31:46', 10.762622, 106.660172, 3, '2025-11-25 09:36:05'),
(36, 'Tai xe test', 'taixe22@gmail.com', '0123456789', NULL, NULL, 'available', NULL, '2025-11-25 09:35:13', 10.762622, 106.660172, NULL, '2025-11-25 09:35:33'),
(37, 'truong ne', 'nbminh1207@gmail.com', '0909123456', '92K1 - 01430', 'Bike', 'available', NULL, '2025-11-25 09:37:13', 10.762622, 106.660172, NULL, NULL),
(38, 'truong ne', 'nbminh1207@gmail.com', '0909123456', '92K1 - 01430', 'Bike', 'available', NULL, '2025-11-25 09:37:14', 10.762622, 106.660172, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `driver_applications`
--

CREATE TABLE `driver_applications` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `license_plate` varchar(50) NOT NULL,
  `vehicle_type` varchar(50) NOT NULL,
  `experience` varchar(255) DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `driver_applications`
--

INSERT INTO `driver_applications` (`id`, `name`, `phone`, `email`, `license_plate`, `vehicle_type`, `experience`, `status`, `created_at`) VALUES
(1, 'Nguyen Van A', '0987654321', 'driver@gmail.com', '43A1-12345', 'Xe máy', '2 năm chạy giao hàng', 'approved', '2025-11-06 09:15:08'),
(2, 'Truong Tai Xe Test', '0123457899', 'truongtaixe2@speedyship.vn', '92K1 - 01430', 'Xe máy', NULL, 'rejected', '2025-11-06 09:16:48'),
(3, 'Nguyen Van Xe', '0363337081', 'truongdubai107@gmail.com', '92K1 - 01430', 'Xe AB', '2 năm kinh nghiệm tài xế tại j&t express', 'approved', '2025-11-06 09:30:16'),
(4, 'Viet Ngoc', '012346789', 'truongdubai107@gmail.com', '92KA - 01730', 'Xe Sirius', '2 năm kinh nghiệm tài xế tại shopee express', 'rejected', '2025-11-06 09:34:30'),
(5, 'Bao Minh', '0909123456', 'truongdubai2704@gmail.com', '92K1 - 01430', 'Xe Sirus', '2 năm kinh nghiệm tài xế tại shopee', 'approved', '2025-11-06 09:37:30'),
(6, 'Bảo Minh ', '012345788', 'truongdubaix@gmail.com', '43G1 - 88888', 'Xe Wave', '', 'approved', '2025-11-06 09:42:24'),
(7, 'Ngoc Truong', '0363337081', 'truongdubai107@gmail.com', '92K1 - 44444', 'SH', '', 'approved', '2025-11-07 07:29:36'),
(8, 'Bảo Minh ', '0905844598', 'nbaominh1207@gmail.com', '43G1  - 88888', 'AB', 'Có 2 năm kinh nghiệm shipper công nghệ', 'approved', '2025-11-12 09:52:41'),
(9, 'Bảo Minh Nguyễn', '0909888888', 'nminh12072004@gmail.com', '43G1 - 55555', 'Wave S', '3 năm kinh nghiệm vận chuyển', 'rejected', '2025-11-20 02:47:36'),
(10, 'truong ne', '0909123456', 'nbminh1207@gmail.com', '92K1 - 01430', 'Bike', '', 'approved', '2025-11-25 09:36:50');

-- --------------------------------------------------------

--
-- Table structure for table `feedbacks`
--

CREATE TABLE `feedbacks` (
  `id` int NOT NULL,
  `customer_id` int DEFAULT NULL,
  `shipment_id` int DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `rating` int DEFAULT '5',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `feedbacks`
--

INSERT INTO `feedbacks` (`id`, `customer_id`, `shipment_id`, `content`, `rating`, `created_at`) VALUES
(1, 9, 41, 'Tuyệt', 5, '2025-10-25 12:02:43'),
(2, 9, 43, 'Tuyệt vời Speedyship', 5, '2025-10-25 13:29:59');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int NOT NULL,
  `chat_id` int NOT NULL,
  `sender_id` int DEFAULT NULL,
  `role` enum('customer','dispatcher') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `chat_id`, `sender_id`, `role`, `content`, `created_at`) VALUES
(1, 1, 9, 'customer', 'alo', '2025-10-26 07:44:53'),
(2, 1, 9, 'customer', 'alo', '2025-10-26 07:45:01'),
(3, 2, 9, 'customer', 'a;lo', '2025-10-26 07:49:07'),
(4, 2, 9, 'customer', 'alo', '2025-10-26 07:49:26'),
(5, 2, 9, 'customer', 'alo', '2025-10-26 07:51:25'),
(6, 2, 9, 'customer', 'alo', '2025-10-26 07:51:47'),
(7, 2, 9, 'customer', 'alo', '2025-10-26 07:54:41'),
(8, 3, 9, 'customer', 'alo', '2025-10-26 07:54:56'),
(9, 3, 9, 'customer', 'alo', '2025-10-26 08:05:42'),
(10, 3, 9, 'customer', 'alo', '2025-10-26 08:05:51'),
(11, 3, 9, 'customer', 'alo', '2025-10-26 08:05:59'),
(12, 3, 9, 'customer', 'ola', '2025-10-26 08:06:11'),
(13, 3, 9, 'customer', 'alo', '2025-10-26 08:07:53'),
(14, 3, 9, 'customer', 'alo', '2025-10-26 08:08:05'),
(15, 3, 9, 'customer', 'xin chào', '2025-10-26 08:08:12'),
(16, 3, 9, 'customer', 'truong dep trai', '2025-10-26 08:09:17'),
(17, 3, 9, 'customer', 'hello', '2025-10-26 08:10:17'),
(18, 3, 0, 'dispatcher', 'alo', '2025-10-26 08:12:55'),
(19, 3, 9, 'customer', 'xin chào fen', '2025-10-26 08:13:08'),
(20, 3, 0, 'dispatcher', 'tuyệt vời', '2025-10-26 08:13:21'),
(21, 3, 9, 'customer', 'ok đó', '2025-10-26 08:13:28'),
(22, 4, 9, 'customer', 'xin chào', '2025-10-26 08:24:04'),
(23, 4, 9, 'customer', 'xin chào', '2025-10-26 08:24:13'),
(24, 4, 0, 'dispatcher', 'alo', '2025-10-26 08:24:20'),
(25, 4, 9, 'customer', 'chào', '2025-10-26 08:24:27'),
(26, 4, 9, 'customer', 'alo', '2025-10-26 08:26:14'),
(27, 4, 9, 'customer', 'ola', '2025-10-26 08:26:22'),
(28, 5, 9, 'customer', 'alo', '2025-10-26 08:26:33'),
(29, 5, 9, 'customer', 'alo', '2025-10-26 08:33:51'),
(30, 5, 0, 'dispatcher', 'alo', '2025-10-26 08:48:19'),
(31, 5, 9, 'customer', 'heeloo', '2025-10-26 08:52:01'),
(32, 5, 9, 'customer', 'alo', '2025-10-26 08:52:20'),
(33, 5, 0, 'dispatcher', 'alo', '2025-10-26 08:52:26'),
(34, 5, 9, 'customer', '...', '2025-10-26 08:52:32'),
(35, 5, 9, 'customer', 'aloo', '2025-10-26 08:52:41'),
(36, 5, 0, 'dispatcher', 'aloooo', '2025-10-26 08:52:47'),
(37, 5, 0, 'dispatcher', 'không được à', '2025-10-26 08:52:55'),
(38, 5, 0, 'dispatcher', 'ok', '2025-10-26 08:53:19'),
(39, 5, 9, 'customer', 'ola', '2025-10-26 08:55:13'),
(40, 5, 0, 'dispatcher', 'ol', '2025-10-26 08:55:22'),
(41, 5, 9, 'customer', 'alo', '2025-10-26 08:57:13'),
(42, 6, 9, 'customer', 'alo', '2025-10-26 08:57:33'),
(43, 5, 0, 'dispatcher', 'alo', '2025-10-26 08:57:41'),
(44, 6, 9, 'customer', 'alo', '2025-10-26 09:05:46'),
(45, 6, 0, 'dispatcher', 'alo', '2025-10-26 09:05:57'),
(46, 6, 0, 'dispatcher', 'chào', '2025-10-26 09:06:02'),
(47, 6, 9, 'customer', 'alo', '2025-10-26 09:13:45'),
(48, 6, 9, 'customer', 'alo', '2025-10-26 09:14:41'),
(49, 6, 0, 'dispatcher', 'alo', '2025-10-26 09:14:50'),
(50, 6, 9, 'customer', 'alo', '2025-10-26 09:17:15'),
(51, 6, 9, 'customer', 'alo', '2025-10-26 09:26:53'),
(52, 6, 0, 'dispatcher', 'ok', '2025-10-26 09:27:00'),
(53, 6, 9, 'customer', 'alo', '2025-10-26 09:33:00'),
(54, 6, 9, 'customer', 'ola', '2025-10-26 09:33:14'),
(55, 6, 0, 'dispatcher', 'xin chào ạ', '2025-10-26 09:33:23'),
(56, 6, 0, 'dispatcher', 'Xin chào! 👋 Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-10-26 09:37:35'),
(57, 6, 9, 'customer', 'alo', '2025-10-26 09:37:39'),
(58, 7, 0, 'dispatcher', 'Xin chào! 👋 Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-10-26 09:37:53'),
(59, 7, 9, 'customer', 'alo', '2025-10-26 09:37:56'),
(60, 7, 0, 'dispatcher', 'xin chào', '2025-10-26 09:39:35'),
(61, 7, 0, 'dispatcher', 'Xin chào! 👋 Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-10-26 09:43:32'),
(62, 7, 9, 'customer', 'xin chào', '2025-10-26 09:43:43'),
(63, 8, 0, 'dispatcher', 'Xin chào! 👋 Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-10-26 09:43:54'),
(64, 8, 9, 'customer', 'chào bạn', '2025-10-26 09:43:59'),
(65, 8, 9, 'customer', 'chào', '2025-10-26 09:44:13'),
(66, 8, 9, 'customer', 'alo...', '2025-10-26 09:44:23'),
(67, 9, 0, 'dispatcher', 'Xin chào! 👋 Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-10-26 09:44:37'),
(68, 9, 9, 'customer', 'hello', '2025-10-26 09:44:45'),
(69, 9, 0, 'dispatcher', 'Xin chào! 👋 Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-10-26 10:02:05'),
(70, 9, 9, 'customer', 'alo', '2025-10-26 10:02:18'),
(71, 9, 0, 'dispatcher', 'alo', '2025-10-26 10:02:26'),
(72, 9, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip.', '2025-10-26 10:09:13'),
(73, 9, 9, 'customer', 'alo', '2025-10-26 10:09:18'),
(74, 9, 0, 'dispatcher', 'xin chào', '2025-10-26 10:09:23'),
(75, 9, 9, 'customer', 'alo', '2025-10-26 10:11:35'),
(76, 9, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip.', '2025-10-26 10:14:07'),
(77, 9, 9, 'customer', 'alo', '2025-10-26 10:14:14'),
(78, 10, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip.', '2025-10-26 10:14:28'),
(79, 10, 9, 'customer', 'hello', '2025-10-26 10:14:38'),
(80, 11, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip.', '2025-10-26 10:14:51'),
(81, 11, 9, 'customer', 'hello', '2025-10-26 10:14:59'),
(82, 12, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip.', '2025-10-26 10:15:24'),
(83, 12, 9, 'customer', 'hello', '2025-10-26 10:15:31'),
(84, 12, 9, 'customer', 'hello', '2025-10-26 10:16:47'),
(85, 12, 0, 'dispatcher', '...', '2025-10-26 10:16:52'),
(86, 12, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip.', '2025-10-26 10:17:01'),
(87, 12, 9, 'customer', 'chào bạn', '2025-10-26 10:17:09'),
(88, 12, 0, 'dispatcher', 'chào fen', '2025-10-26 10:17:30'),
(89, 12, 9, 'customer', 'helllo', '2025-10-26 10:18:19'),
(90, 12, 9, 'customer', 'được không', '2025-10-26 10:18:26'),
(91, 12, 9, 'customer', 'hello 2', '2025-10-26 10:20:41'),
(92, 12, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip.', '2025-10-26 10:21:24'),
(93, 12, 9, 'customer', 'hello', '2025-10-26 10:21:32'),
(94, 12, 9, 'customer', 'slo', '2025-10-26 10:22:59'),
(95, 12, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip.', '2025-10-26 10:23:08'),
(96, 12, 9, 'customer', 'alo', '2025-10-26 10:23:11'),
(97, 12, 0, 'dispatcher', 'alo', '2025-10-26 10:23:17'),
(98, 12, 9, 'customer', 'alo', '2025-10-26 10:23:40'),
(99, 12, 9, 'customer', 'alo', '2025-10-26 10:24:00'),
(100, 12, 9, 'customer', 'alo', '2025-10-26 10:24:11'),
(101, 12, 9, 'customer', 'alo', '2025-10-26 10:24:51'),
(102, 12, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip.', '2025-10-26 10:25:05'),
(103, 12, 9, 'customer', 'alo', '2025-10-26 10:25:13'),
(104, 12, 0, 'dispatcher', 'được rồi nè', '2025-10-26 10:25:19'),
(105, 12, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip.', '2025-10-26 10:26:57'),
(106, 12, 9, 'customer', 'alo', '2025-10-26 10:27:01'),
(107, 12, 0, 'dispatcher', 'alo', '2025-10-26 10:27:13'),
(108, 13, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip.', '2025-10-26 10:27:20'),
(109, 13, 9, 'customer', 'alo', '2025-10-26 10:27:27'),
(110, 14, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip.', '2025-10-26 10:27:41'),
(111, 14, 0, 'dispatcher', 'Xin chào! 👋 Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-10-27 08:00:11'),
(112, 14, 9, 'customer', 'alo', '2025-10-27 08:00:14'),
(113, 14, 0, 'dispatcher', 'Xin chào! 👋 Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-10-27 08:00:47'),
(114, 14, 9, 'customer', 'alo', '2025-10-27 08:00:52'),
(115, 14, 0, 'dispatcher', 'chào', '2025-10-27 08:00:56'),
(116, 14, 9, 'customer', 'đang làm gì đó', '2025-10-27 08:01:03'),
(117, 14, 0, 'dispatcher', 'đang chat nè', '2025-10-27 08:01:36'),
(118, 14, 9, 'customer', 'ok ', '2025-10-27 08:01:45'),
(119, 14, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-10-27 08:10:06'),
(120, 14, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-10-27 08:10:09'),
(121, 14, 9, 'customer', 'alo', '2025-10-27 08:10:15'),
(122, 14, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-10-27 08:10:33'),
(123, 14, 9, 'customer', 'alo', '2025-10-27 08:10:42'),
(124, 14, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-10-27 08:11:26'),
(125, 15, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-10-27 08:11:29'),
(126, 15, 9, 'customer', 'alo', '2025-10-27 08:11:31'),
(127, 16, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-10-27 08:13:33'),
(128, 16, 9, 'customer', 'a', '2025-10-27 08:13:34'),
(129, 16, 0, 'dispatcher', 'alo', '2025-10-27 08:13:40'),
(130, 16, 9, 'customer', '...', '2025-10-27 08:13:43'),
(131, 16, 0, 'dispatcher', 'hellop', '2025-10-27 08:13:47'),
(132, 16, 9, 'customer', 'ok', '2025-10-27 08:13:50'),
(133, 16, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-10-27 08:19:25'),
(134, 17, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-10-27 08:19:33'),
(135, 17, 9, 'customer', 'xalo', '2025-10-27 08:19:42'),
(136, 18, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-10-27 08:19:53'),
(137, 18, 9, 'customer', 'áda', '2025-10-27 08:19:56'),
(138, 19, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-10-27 08:22:46'),
(139, 19, 9, 'customer', 'alo', '2025-10-27 08:22:56'),
(140, 20, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-10-27 08:23:02'),
(141, 20, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-10-27 08:23:35'),
(142, 20, 0, 'dispatcher', 'alo', '2025-10-27 08:23:46'),
(143, 20, 9, 'customer', 'aol', '2025-10-27 08:23:49'),
(144, 20, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-10-27 08:26:17'),
(145, 20, 9, 'customer', 'alo', '2025-10-27 08:26:26'),
(146, 20, 0, 'dispatcher', 'tuyệt vời', '2025-10-27 08:26:34'),
(147, 20, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-10-28 13:30:26'),
(148, 21, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-10-28 13:30:38'),
(149, 21, 9, 'customer', 'alo', '2025-10-28 13:30:44'),
(150, 22, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-11-03 09:45:25'),
(151, 22, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-11-03 09:45:40'),
(152, 22, 9, 'customer', 'alo', '2025-11-03 09:45:45'),
(153, 22, 0, 'dispatcher', 'ola', '2025-11-03 09:45:50'),
(154, 22, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-11-03 09:46:20'),
(155, 22, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-11-03 09:46:41'),
(156, 22, 9, 'customer', 'a', '2025-11-03 09:46:50'),
(157, 22, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-11-03 09:47:31'),
(158, 22, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-11-03 09:48:10'),
(159, 22, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-11-03 09:49:52'),
(160, 22, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-11-03 09:53:40'),
(161, 22, 9, 'customer', 'a', '2025-11-03 09:53:53'),
(162, 22, 0, 'dispatcher', 'a', '2025-11-03 09:53:55'),
(163, 22, 0, 'dispatcher', 's', '2025-11-03 09:54:00'),
(164, 22, 0, 'dispatcher', 'b', '2025-11-03 09:54:03'),
(165, 22, 0, 'dispatcher', 'c', '2025-11-03 09:54:28'),
(166, 22, 9, 'customer', 'a', '2025-11-03 09:54:30'),
(167, 23, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-11-03 09:56:25'),
(168, 23, 9, 'customer', 'a', '2025-11-03 09:56:33'),
(169, 23, 9, 'customer', 's', '2025-11-03 09:56:40'),
(170, 24, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-11-03 09:56:52'),
(171, 25, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-11-03 09:57:02'),
(172, 26, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-11-03 09:58:06'),
(173, 26, 9, 'customer', 'aaa', '2025-11-03 09:58:10'),
(174, 26, 9, 'customer', 'aa', '2025-11-03 09:58:14'),
(175, 26, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-11-03 09:58:25'),
(176, 26, 9, 'customer', 'sads', '2025-11-03 09:58:28'),
(177, 27, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-11-03 10:02:51'),
(178, 27, 9, 'customer', 'a', '2025-11-03 10:02:57'),
(179, 27, 9, 'customer', 'ád', '2025-11-03 10:03:02'),
(180, 27, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-11-03 10:03:38'),
(181, 27, 9, 'customer', 'ádsad', '2025-11-03 10:03:40'),
(182, 28, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-11-03 10:08:42'),
(183, 28, 9, 'customer', 'a', '2025-11-03 10:08:47'),
(184, 29, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-11-03 10:08:59'),
(185, 29, 0, 'dispatcher', 's', '2025-11-03 10:09:28'),
(186, 29, 9, 'customer', 's', '2025-11-03 10:09:30'),
(187, 30, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-11-03 10:09:35'),
(188, 30, 0, 'dispatcher', 'a', '2025-11-03 10:09:40'),
(189, 31, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-11-03 10:12:11'),
(190, 32, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-11-03 10:12:26'),
(191, 32, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-11-13 11:28:16'),
(192, 32, 9, 'customer', 'alo', '2025-11-13 11:28:32'),
(193, 32, 0, 'dispatcher', 'xin chào', '2025-11-13 11:28:39'),
(194, 32, 9, 'customer', 'ola', '2025-11-13 11:28:42'),
(195, 33, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-11-13 11:33:11'),
(196, 34, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-11-13 11:34:45'),
(197, 34, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-11-13 11:37:01'),
(198, 35, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-11-13 11:44:30'),
(199, 36, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-11-13 11:49:24'),
(200, 36, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-11-13 11:49:24'),
(201, 37, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-11-13 11:49:30'),
(202, 38, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-11-13 11:49:30'),
(203, 38, 9, 'customer', 'a', '2025-11-13 11:49:38'),
(204, 38, 0, 'dispatcher', 'a', '2025-11-13 11:49:42'),
(205, 39, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-11-13 11:49:53'),
(206, 40, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-11-13 11:49:53'),
(207, 40, 9, 'customer', 'ssss', '2025-11-13 11:49:56'),
(208, 39, 0, 'dispatcher', 'a', '2025-11-13 11:49:59'),
(209, 41, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-11-13 11:54:28'),
(210, 42, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-11-13 11:54:28'),
(211, 43, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-11-13 12:10:07'),
(212, 44, 0, 'dispatcher', 'Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?', '2025-11-13 12:10:07');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int NOT NULL,
  `receiver_id` int DEFAULT NULL,
  `shipment_id` int DEFAULT NULL,
  `message` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `target_role` enum('driver','dispatcher') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'driver',
  `is_read` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `receiver_id`, `shipment_id`, `message`, `target_role`, `is_read`, `created_at`) VALUES
(1, 8, 37, 'Bạn vừa được phân công đơn hàng #37', 'driver', 1, '2025-10-25 12:26:41'),
(2, 14, 34, 'Bạn vừa được phân công đơn hàng #34', 'driver', 0, '2025-10-25 12:48:18'),
(3, 14, 33, 'Bạn vừa được phân công đơn hàng #33', 'driver', 0, '2025-10-25 12:48:21'),
(4, 14, 32, 'Bạn vừa được phân công đơn hàng #32', 'driver', 1, '2025-10-25 12:48:23'),
(5, 14, 112, '🚚 Bạn vừa được phân công đơn hàng #112', 'driver', 0, '2025-11-03 07:31:23'),
(6, 14, 111, '🚚 Bạn vừa được phân công đơn hàng #111', 'driver', 0, '2025-11-03 07:31:37'),
(7, 8, 29, '🚚 Bạn vừa được phân công đơn hàng #29', 'driver', 1, '2025-11-03 07:31:54'),
(8, 8, 110, '🚚 Bạn vừa được phân công đơn hàng #110', 'driver', 1, '2025-11-03 07:32:51'),
(9, 14, 109, '🚚 Bạn vừa được phân công đơn hàng #109', 'driver', 1, '2025-11-03 07:36:40'),
(10, 8, 46, '🚚 Bạn vừa được phân công đơn hàng #46', 'driver', 1, '2025-11-03 07:36:44'),
(11, 8, 45, '🚚 Bạn vừa được phân công đơn hàng #45', 'driver', 1, '2025-11-03 07:39:29'),
(12, 14, 44, '🚚 Bạn vừa được phân công đơn hàng #44', 'driver', 1, '2025-11-03 07:47:06'),
(13, 14, 114, 'Bạn vừa được phân công đơn hàng #114', 'driver', 1, '2025-11-03 08:04:20'),
(14, 14, 116, '🚚 Bạn vừa được phân công đơn hàng #116', 'driver', 1, '2025-11-03 08:16:11'),
(15, 8, 115, '🚚 Bạn vừa được phân công đơn hàng #115', 'driver', 1, '2025-11-03 08:17:58'),
(16, 14, 119, '🚚 Bạn vừa được phân công đơn hàng #119', 'driver', 0, '2025-11-03 08:40:43'),
(17, 14, 118, '🚚 Bạn vừa được phân công đơn hàng #118', 'driver', 0, '2025-11-03 08:41:16'),
(18, 14, 120, '🚚 Bạn vừa được phân công đơn hàng #120', 'driver', 0, '2025-11-03 08:47:09'),
(19, 1, 125, '🆕 Đơn hàng #125 vừa được khách hàng tạo mới.', 'dispatcher', 1, '2025-11-03 09:35:56'),
(20, 1, 127, '🆕 Đơn hàng #127 vừa được khách hàng tạo mới.', 'dispatcher', 1, '2025-11-03 09:38:15'),
(21, 14, 126, 'Bạn vừa được phân công đơn hàng #126', 'driver', 0, '2025-11-03 09:38:28'),
(22, 17, 122, 'Bạn vừa được phân công đơn hàng #122', 'driver', 0, '2025-11-04 10:23:51'),
(23, 1, 128, '🆕 Đơn hàng #128 vừa được khách hàng tạo mới.', 'dispatcher', 1, '2025-11-05 16:22:03'),
(24, 1, 146, '🆕 Đơn hàng #146 vừa được khách hàng tạo mới.', 'dispatcher', 1, '2025-11-05 18:17:39'),
(25, 1, 147, '🆕 Đơn hàng #147 vừa được khách hàng tạo mới.', 'dispatcher', 1, '2025-11-05 18:23:02'),
(26, 1, 148, '🆕 Đơn hàng #148 vừa được khách hàng tạo mới.', 'dispatcher', 1, '2025-11-05 18:27:28'),
(27, 1, 149, '🆕 Đơn hàng #149 vừa được khách hàng tạo mới.', 'dispatcher', 1, '2025-11-05 18:31:39'),
(28, 1, 150, '🆕 Đơn hàng #150 vừa được khách hàng tạo mới.', 'dispatcher', 1, '2025-11-05 18:34:54'),
(29, 1, 151, '🆕 Đơn hàng #151 vừa được khách hàng tạo mới.', 'dispatcher', 1, '2025-11-05 18:45:20'),
(30, 1, 152, '🆕 Đơn hàng #152 vừa được khách hàng tạo mới.', 'dispatcher', 1, '2025-11-05 18:49:03'),
(31, 1, 153, '🆕 Đơn hàng #153 vừa được khách hàng tạo mới.', 'dispatcher', 0, '2025-11-05 18:53:47'),
(32, 1, 154, '🆕 Đơn hàng #154 vừa được khách hàng tạo mới.', 'dispatcher', 0, '2025-11-05 18:55:23'),
(33, 1, 155, '🆕 Đơn hàng #155 vừa được khách hàng tạo mới.', 'dispatcher', 0, '2025-11-05 18:57:54'),
(34, 1, 156, '🆕 Đơn hàng #156 vừa được khách hàng tạo mới.', 'dispatcher', 0, '2025-11-05 19:03:45'),
(35, 1, 157, '🆕 Đơn hàng #157 vừa được khách hàng tạo mới.', 'dispatcher', 0, '2025-11-05 19:08:07'),
(36, 1, 158, '🆕 Đơn hàng #158 vừa được khách hàng tạo mới.', 'dispatcher', 0, '2025-11-05 19:14:56'),
(37, 1, 159, '🆕 Đơn hàng #159 vừa được khách hàng tạo mới.', 'dispatcher', 0, '2025-11-05 19:25:08'),
(38, 1, 160, '🆕 Đơn hàng #160 vừa được khách hàng tạo mới.', 'dispatcher', 0, '2025-11-05 19:41:24'),
(41, 1, 163, '🆕 Đơn hàng #163 vừa được khách hàng tạo mới.', 'dispatcher', 0, '2025-11-05 20:12:07'),
(42, 1, 164, '🆕 Đơn hàng #164 vừa được khách hàng tạo mới.', 'dispatcher', 0, '2025-11-05 20:13:07'),
(43, 1, 165, '🆕 Đơn hàng #165 vừa được khách hàng tạo mới.', 'dispatcher', 0, '2025-11-05 20:19:00'),
(47, 1, 169, '🆕 Đơn hàng #169 vừa được khách hàng tạo mới.', 'dispatcher', 0, '2025-11-19 06:26:45'),
(48, 1, 170, '🆕 Đơn hàng #170 vừa được khách hàng tạo mới.', 'dispatcher', 0, '2025-11-19 08:14:31'),
(49, 1, 171, '🆕 Đơn hàng #171 vừa được khách hàng tạo mới.', 'dispatcher', 0, '2025-11-19 08:28:22'),
(52, 30, 171, 'Bạn vừa được phân công đơn hàng #171', 'driver', 0, '2025-11-19 12:00:54'),
(53, 33, 170, 'Bạn vừa được phân công đơn hàng #170', 'driver', 0, '2025-11-19 12:04:36'),
(54, 1, 173, '🆕 Đơn hàng #173 vừa được khách hàng tạo mới.', 'dispatcher', 0, '2025-11-20 02:04:46'),
(55, 1, 174, '🆕 Đơn hàng #174 vừa được khách hàng tạo mới.', 'dispatcher', 0, '2025-11-20 08:45:08'),
(56, 30, 174, 'Bạn vừa được phân công đơn hàng #174', 'driver', 0, '2025-11-20 08:52:16'),
(57, 1, 175, '🆕 Đơn hàng #175 vừa được khách hàng tạo mới.', 'dispatcher', 0, '2025-11-25 08:30:13'),
(58, 1, 176, '🆕 Đơn hàng #176 vừa được khách hàng tạo mới.', 'dispatcher', 0, '2025-11-25 08:31:15'),
(59, 1, 177, '🆕 Đơn hàng #177 vừa được khách hàng tạo mới.', 'dispatcher', 0, '2025-11-25 08:32:39'),
(60, 1, 178, '🆕 Đơn hàng #178 vừa được khách hàng tạo mới.', 'dispatcher', 0, '2025-11-25 08:33:44'),
(61, 1, 179, '🆕 Đơn hàng #179 vừa được khách hàng tạo mới.', 'dispatcher', 0, '2025-11-25 08:34:57'),
(62, 1, 180, '🆕 Đơn hàng #180 vừa được khách hàng tạo mới.', 'dispatcher', 0, '2025-11-25 08:35:58'),
(63, 1, 181, '🆕 Đơn hàng #181 vừa được khách hàng tạo mới.', 'dispatcher', 0, '2025-11-25 08:36:58'),
(64, 1, 182, '🆕 Đơn hàng #182 vừa được khách hàng tạo mới.', 'dispatcher', 0, '2025-11-25 08:37:43'),
(65, 1, 183, '🆕 Đơn hàng #183 vừa được khách hàng tạo mới.', 'dispatcher', 0, '2025-11-25 08:38:19'),
(66, 30, 183, 'Bạn vừa được phân công đơn hàng #183', 'driver', 0, '2025-11-25 08:47:44'),
(67, 1, 184, '🆕 Đơn hàng #184 vừa được khách hàng tạo mới.', 'dispatcher', 0, '2025-11-25 08:54:36'),
(68, 1, 185, '🆕 Đơn hàng #185 vừa được khách hàng tạo mới.', 'dispatcher', 0, '2025-11-25 09:17:05'),
(69, 1, 186, '🆕 Đơn hàng #186 vừa được khách hàng tạo mới.', 'dispatcher', 0, '2025-11-25 09:18:08'),
(70, 1, 187, '🆕 Đơn hàng #187 vừa được khách hàng tạo mới.', 'dispatcher', 1, '2025-11-25 09:19:29'),
(71, 1, 188, '🆕 Đơn hàng #188 vừa được khách hàng tạo mới.', 'dispatcher', 0, '2025-11-25 09:20:40'),
(72, 30, 188, 'Bạn vừa được phân công đơn hàng #188', 'driver', 0, '2025-11-25 09:25:44'),
(74, 1, 190, '🆕 Đơn hàng #190 vừa được khách hàng tạo mới.', 'dispatcher', 1, '2025-11-25 09:32:22'),
(75, 1, 191, '🆕 Đơn hàng #191 vừa được khách hàng tạo mới.', 'dispatcher', 1, '2025-11-25 09:41:00'),
(76, 1, 192, '🆕 Đơn hàng #192 vừa được khách hàng tạo mới.', 'dispatcher', 1, '2025-11-25 09:41:40');

-- --------------------------------------------------------

--
-- Table structure for table `otp_codes`
--

CREATE TABLE `otp_codes` (
  `id` int NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires_at` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `otp_codes`
--

INSERT INTO `otp_codes` (`id`, `email`, `code`, `expires_at`) VALUES
(1, 'truongdubai107@gmail.com', '163755', 1761719813458),
(2, 'truongdubai107@gmail.com', '402514', 1761720078142),
(3, 'truongdubaix107@gmail.com', '280555', 1761720234122),
(4, 'truongdubai2704@gmail.com', '872278', 1761720559002),
(5, 'khuongkhuong1604@gmail.com', '375002', 1761720732400),
(6, 'nbminh1207@gmail.com', '747179', 1763455700524),
(7, 'truongdubai2704@gmail.com', '287972', 1763535089977),
(8, 'truongdubai2704@gmail.com', '201793', 1763535179878),
(9, 'truongdubai2704@gmail.com', '645945', 1763535446826),
(10, 'truongdubai2704@sadsads.cc', '206001', 1763535554595),
(11, 'truongdubai2704@sadsads.cc', '465590', 1763535711085),
(12, 'truongdubai2704@gmail.com', '623933', 1763535785224),
(13, 'truongdubai2704@gmail.com', '321939', 1763536051677),
(14, 'truongdubai2704@gmail.com', '139957', 1763536221498),
(15, 'truongdubai2704@gmail.com', '171852', 1763536626698),
(16, 'cs@g.c', '135180', 1763537000689),
(17, 'truongdubai2704@gmail.com', '542069', 1763537317257),
(18, 'truongdubai2704@gmail.com', '415969', 1763537769557),
(19, 'truongdubai2704@gmail.com', '332723', 1763537852709),
(20, 'truongdubai2704@gmail.com', '285552', 1763538346505),
(21, 'nbminh1207@gmail.com', '303094', 1764059221988),
(22, 'nbminh1207@gmail.com', '889078', 1764059360441),
(23, 'nbminh1207@gmail.com', '148338', 1764059446797),
(24, 'nbminh1207@gmail.com', '948651', 1764061869050),
(25, 'truongdubai2704@gmail.com', '427323', 1764062051666),
(26, 'nbminh1207@gmail.com', '753640', 1764062129626),
(27, 'occho1401@gmail.com', '427073', 1764132411527),
(28, 'khanh12b3cv@gmail.com', '311541', 1764132426763),
(29, 'khuongkhuong1604@gmail.com', '811302', 1764132525922),
(30, 'khuongkhuong1604@gmail.com', '118801', 1764132606853),
(31, 'khuongkhuong1604@gmail.com', '978693', 1764132692693),
(32, 'khanh12b3cv@gmail.com', '983843', 1764132712149),
(33, 'duongthikimloanbs274@gmail.com', '241220', 1764133025822);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int NOT NULL,
  `order_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipment_id` int NOT NULL,
  `customer_id` int NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  `method` enum('COD','BankTransfer','Momo') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'COD',
  `status` enum('pending','completed','failed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `order_id`, `shipment_id`, `customer_id`, `amount`, `method`, `status`, `created_at`, `updated_at`) VALUES
(9, NULL, 2, 4, 120000.00, 'COD', 'completed', '2025-10-20 17:23:09', '2025-10-20 17:23:09'),
(10, NULL, 3, 5, 90000.00, 'BankTransfer', 'completed', '2025-10-20 17:23:09', '2025-10-25 05:36:08'),
(11, NULL, 4, 6, 150000.00, 'Momo', 'completed', '2025-10-20 17:23:09', '2025-10-21 04:39:01'),
(12, NULL, 5, 11, 65000.00, 'COD', 'completed', '2025-10-20 17:23:09', '2025-10-25 05:36:07'),
(13, NULL, 6, 12, 210000.00, 'BankTransfer', 'completed', '2025-10-20 17:23:09', '2025-10-25 11:29:58'),
(15, NULL, 37, 9, 800000.00, 'COD', 'completed', '2025-10-25 11:18:39', '2025-10-25 11:19:37'),
(16, NULL, 38, 9, 440000.00, 'COD', 'completed', '2025-10-25 11:21:13', '2025-10-25 11:29:55'),
(17, NULL, 39, 9, 15000.00, 'COD', 'completed', '2025-10-25 11:22:08', '2025-10-25 11:29:54'),
(18, NULL, 40, 9, 18000.00, 'Momo', 'completed', '2025-10-25 11:22:45', '2025-10-25 11:24:19'),
(19, NULL, 41, 9, 80000.00, 'COD', 'completed', '2025-10-25 11:25:45', '2025-10-25 11:29:52'),
(20, NULL, 42, 9, 90000.00, 'Momo', 'completed', '2025-10-25 11:29:08', '2025-10-25 11:29:50'),
(21, NULL, 43, 9, 80000.00, 'Momo', 'pending', '2025-10-25 13:26:37', '2025-10-25 13:26:37'),
(22, NULL, 44, 9, 120000.00, 'Momo', 'completed', '2025-10-28 14:32:38', '2025-10-28 14:34:05'),
(23, NULL, 45, 9, 12000.00, 'Momo', 'pending', '2025-10-28 17:37:53', '2025-10-28 17:37:53'),
(24, NULL, 46, 9, 150000.00, 'Momo', 'pending', '2025-10-29 05:09:51', '2025-10-29 05:09:51'),
(41, NULL, 101, 4, 85000.00, 'COD', 'completed', '2025-07-12 03:25:00', '2025-07-12 03:25:00'),
(42, NULL, 102, 5, 92000.00, 'Momo', 'completed', '2025-07-25 07:10:00', '2025-07-25 07:10:00'),
(43, NULL, 103, 6, 110000.00, 'BankTransfer', 'completed', '2025-08-08 02:15:00', '2025-08-08 02:15:00'),
(45, NULL, 105, 8, 150000.00, 'Momo', 'completed', '2025-09-05 01:45:00', '2025-09-05 01:45:00'),
(46, NULL, 106, 9, 120000.00, 'BankTransfer', 'completed', '2025-09-22 10:20:00', '2025-09-22 10:20:00'),
(47, NULL, 107, 10, 95000.00, 'COD', 'completed', '2025-10-10 04:30:00', '2025-10-10 04:30:00'),
(48, NULL, 108, 11, 112000.00, 'Momo', 'completed', '2025-10-18 02:50:00', '2025-10-18 02:50:00'),
(49, NULL, 109, 9, 80000.00, 'Momo', 'pending', '2025-11-03 07:11:13', '2025-11-03 07:11:13'),
(50, NULL, 110, 9, 900000.00, 'COD', 'pending', '2025-11-03 07:19:14', '2025-11-03 07:19:14'),
(51, NULL, 111, 9, 900000.00, 'Momo', 'pending', '2025-11-03 07:20:19', '2025-11-03 07:20:19'),
(52, NULL, 112, 9, 90000.00, 'Momo', 'pending', '2025-11-03 07:24:48', '2025-11-03 07:24:48'),
(53, NULL, 113, 16, 80000.00, 'Momo', 'pending', '2025-11-03 08:01:47', '2025-11-03 08:01:47'),
(54, NULL, 114, 16, 90000.00, 'COD', 'pending', '2025-11-03 08:03:57', '2025-11-03 08:03:57'),
(55, NULL, 115, 16, 80000.00, 'COD', 'completed', '2025-11-03 08:09:13', '2025-11-04 08:18:23'),
(56, NULL, 116, 16, 90000.00, 'COD', 'completed', '2025-11-03 08:11:09', '2025-11-04 08:18:21'),
(57, NULL, 117, 16, 90000.00, 'COD', 'completed', '2025-11-03 08:27:52', '2025-11-04 08:18:20'),
(58, NULL, 118, 16, 80000.00, 'COD', 'completed', '2025-11-03 08:30:46', '2025-11-04 08:18:19'),
(59, NULL, 119, 16, 90000.00, 'COD', 'completed', '2025-11-03 08:38:54', '2025-11-04 08:18:16'),
(60, NULL, 120, 16, 90000.00, 'Momo', 'completed', '2025-11-03 08:41:51', '2025-11-04 08:18:14'),
(61, NULL, 121, 16, 90000.00, 'COD', 'completed', '2025-11-03 08:52:21', '2025-11-04 08:18:13'),
(62, NULL, 122, 9, 90000.00, 'COD', 'completed', '2025-11-03 09:26:04', '2025-11-04 08:18:11'),
(63, NULL, 123, 9, 90000.00, 'COD', 'completed', '2025-11-03 09:29:16', '2025-11-04 08:18:10'),
(64, NULL, 126, 9, 80000.00, 'COD', 'completed', '2025-11-03 09:36:59', '2025-11-04 08:18:06'),
(69, 'MM1762368245991', 150, 9, 171600.00, 'Momo', 'completed', '2025-11-05 18:44:06', '2025-11-05 18:56:43'),
(70, 'MM1762368321507', 151, 9, 144700.00, 'Momo', 'completed', '2025-11-05 18:45:21', '2025-11-05 18:56:42'),
(71, 'MM1762368548117', 152, 9, 165400.00, 'Momo', 'completed', '2025-11-05 18:49:08', '2025-11-05 18:56:40'),
(72, 'MM1762368936605', 154, 9, 224800.00, 'Momo', 'completed', '2025-11-05 18:55:36', '2025-11-05 18:56:41'),
(73, 'MM1762369080231', 155, 9, 214200.00, 'Momo', 'pending', '2025-11-05 18:58:00', '2025-11-05 18:58:00'),
(74, 'MM1762369427610', 156, 9, 180800.00, 'Momo', 'pending', '2025-11-05 19:03:47', '2025-11-05 19:03:47'),
(75, 'MM1762369691816', 157, 9, 235000.00, 'Momo', 'pending', '2025-11-05 19:08:11', '2025-11-05 19:08:11'),
(76, 'MM1762370107180', 158, 9, 431000.00, 'Momo', 'pending', '2025-11-05 19:15:07', '2025-11-05 19:15:07'),
(77, 'MM1762370205934', 158, 9, 431000.00, 'Momo', 'pending', '2025-11-05 19:16:46', '2025-11-05 19:16:46'),
(78, 'MM1762370659633', 158, 9, 431000.00, 'Momo', 'pending', '2025-11-05 19:24:19', '2025-11-05 19:24:19'),
(79, 'MM1762370712427', 159, 9, 177800.00, 'Momo', 'pending', '2025-11-05 19:25:12', '2025-11-05 19:25:12'),
(80, 'MM1762370951073', 159, 9, 177800.00, 'Momo', 'pending', '2025-11-05 19:29:11', '2025-11-05 19:29:11'),
(81, 'MM1762371025639', 159, 9, 177800.00, 'Momo', 'completed', '2025-11-05 19:30:25', '2025-11-05 19:30:32'),
(82, 'MM1762371741098', 160, 9, 346000.00, 'Momo', 'completed', '2025-11-05 19:42:21', '2025-11-05 19:42:27'),
(83, 'MM1762371867277', 160, 9, 346000.00, 'Momo', 'completed', '2025-11-05 19:44:27', '2025-11-05 19:44:33'),
(84, 'MM1762372079503', 160, 9, 346000.00, 'Momo', 'completed', '2025-11-05 19:47:59', '2025-11-05 19:48:06'),
(89, 'MM1762373528583', 163, 9, 208800.00, 'Momo', 'completed', '2025-11-05 20:12:08', '2025-11-05 20:12:15'),
(90, 'MM1762373588732', 164, 9, 217400.00, 'Momo', 'completed', '2025-11-05 20:13:08', '2025-11-05 20:13:17'),
(91, 'MM1762373635719', 164, 9, 217400.00, 'Momo', 'completed', '2025-11-05 20:13:55', '2025-11-05 20:14:06'),
(92, 'MM1762373873341', 164, 9, 217400.00, 'Momo', 'pending', '2025-11-05 20:17:53', '2025-11-05 20:17:53'),
(93, 'MM1762373942346', 165, 9, 252800.00, 'Momo', 'completed', '2025-11-05 20:19:02', '2025-11-05 20:19:48'),
(94, 'MM1762374077595', 165, 9, 252800.00, 'Momo', 'completed', '2025-11-05 20:21:17', '2025-11-05 20:32:01'),
(97, 'MM1763540933191', 171, 9, 243600.00, 'Momo', 'pending', '2025-11-19 08:28:53', '2025-11-19 08:28:53'),
(99, 'MM1763629319480', 174, 9, 1291600.00, 'Momo', 'pending', '2025-11-20 09:01:59', '2025-11-20 09:01:59'),
(100, 'MM1763629823468', 174, 9, 1291600.00, 'Momo', 'completed', '2025-11-20 09:10:23', '2025-11-20 09:12:14'),
(101, 'MM1764059628486', 178, 9, 268000.00, 'Momo', 'pending', '2025-11-25 08:33:48', '2025-11-25 08:33:48'),
(102, 'MM1764059901391', 183, 9, 185600.00, 'Momo', 'pending', '2025-11-25 08:38:21', '2025-11-25 08:38:21'),
(103, 'MM1764060879432', 184, 9, 181200.00, 'Momo', 'completed', '2025-11-25 08:54:39', '2025-11-25 08:54:48'),
(104, 'MM1764062441580', 188, 9, 203000.00, 'Momo', 'pending', '2025-11-25 09:20:41', '2025-11-25 09:20:41'),
(105, 'MM1764063702176', 192, 9, 1043200.00, 'Momo', 'completed', '2025-11-25 09:41:42', '2025-11-25 09:42:05');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int NOT NULL,
  `code` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `code`, `name`, `description`) VALUES
(1, 'admin', 'Quản trị', NULL),
(2, 'dispatcher', 'Điều phối', NULL),
(3, 'driver', 'Tài xế', NULL),
(4, 'customer', 'Khách hàng', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `shipments`
--

CREATE TABLE `shipments` (
  `id` int NOT NULL,
  `tracking_code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `sender_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sender_phone` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `receiver_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `receiver_phone` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `item_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pickup_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `delivery_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `weight_kg` decimal(8,2) DEFAULT NULL,
  `cod_amount` decimal(12,2) DEFAULT '0.00',
  `shipping_fee` decimal(10,2) DEFAULT '0.00',
  `payment_method` enum('COD','MOMO') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'COD',
  `status` enum('pending','assigned','picking','delivering','delivered','failed','completed','canceled') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `current_location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `pickup_lat` decimal(10,6) DEFAULT NULL,
  `pickup_lng` decimal(10,6) DEFAULT NULL,
  `delivery_lat` decimal(10,6) DEFAULT NULL,
  `delivery_lng` decimal(10,6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `shipments`
--

INSERT INTO `shipments` (`id`, `tracking_code`, `customer_id`, `sender_name`, `sender_phone`, `receiver_name`, `receiver_phone`, `item_name`, `pickup_address`, `delivery_address`, `weight_kg`, `cod_amount`, `shipping_fee`, `payment_method`, `status`, `current_location`, `created_at`, `updated_at`, `pickup_lat`, `pickup_lng`, `delivery_lat`, `delivery_lng`) VALUES
(2, 'SP1002', 5, 'Khách hàng B', '0909444444', 'Phạm Bình', '0909666666', NULL, '120 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng', '45 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng', 3.20, 90000.00, 0.00, 'COD', 'pending', 'Đà Nẵng', '2025-10-20 08:43:49', '2025-11-05 15:59:06', 16.083400, 108.247000, 16.065000, 108.187000),
(3, 'SP1003', 6, 'Lê Văn C', '0909777777', 'Ngô Bình', '0909888888', NULL, '55 Nguyễn Hữu Thọ, Cẩm Lệ, Đà Nẵng', '12 Lê Duẩn, Hải Châu, Đà Nẵng', 4.30, 150000.00, 0.00, 'COD', 'delivered', 'Đà Nẵng', '2025-10-20 13:09:32', '2025-11-05 15:59:06', 16.018000, 108.206000, 16.066800, 108.220800),
(4, 'SP1004', 5, 'Phạm Huy 2', '0909333111', 'Bùi Trang', '0909555999', NULL, '23 Lê Văn Hiến, Ngũ Hành Sơn, Đà Nẵng', '88 Tôn Đức Thắng, Liên Chiểu, Đà Nẵng', 2.20, 80000.00, 0.00, 'COD', 'delivered', 'Đà Nẵng', '2025-10-20 13:09:32', '2025-11-05 15:59:06', 16.008800, 108.263000, 16.072400, 108.160000),
(5, 'SP1005', 4, 'Nguyễn Hà', '0909333222', 'Trần Bình', '0909444111', NULL, '120 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng', '45 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng', 6.00, 170000.00, 0.00, 'COD', 'delivered', 'Đà Nẵng', '2025-10-20 13:09:32', '2025-11-05 15:59:06', 16.083400, 108.247000, 16.065000, 108.187000),
(6, 'SP1007', NULL, 'Phạm Huy 3', '0909333111', 'Diễm Trang', '0909555999', NULL, '55 Nguyễn Hữu Thọ, Cẩm Lệ, Đà Nẵng', '12 Lê Duẩn, Hải Châu, Đà Nẵng', 4.60, 90000.00, 0.00, 'COD', 'delivered', 'Đà Nẵng', '2025-10-20 13:33:25', '2025-11-05 15:59:06', 16.018000, 108.206000, 16.066800, 108.220800),
(17, 'SP2001', 4, 'Nguyễn Thị Mai', '0909123456', 'Trần Văn Cường', '0909555666', NULL, '120 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng', '45 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng', 5.20, 120000.00, 0.00, 'COD', 'delivered', 'Đà Nẵng', '2025-09-05 01:30:00', '2025-11-05 15:59:06', 16.083400, 108.247000, 16.065000, 108.187000),
(18, 'SP2002', 5, 'Lê Văn Long', '0909234567', 'Phạm Thị Hoa', '0909666777', NULL, '55 Nguyễn Hữu Thọ, Cẩm Lệ, Đà Nẵng', '12 Lê Duẩn, Hải Châu, Đà Nẵng', 2.30, 95000.00, 0.00, 'COD', 'delivered', 'Đà Nẵng', '2025-09-10 02:45:00', '2025-11-05 15:59:06', 16.018000, 108.206000, 16.066800, 108.220800),
(19, 'SP2003', 6, 'Trần Thị Ngọc', '0909345678', 'Lê Văn Thành', '0909777888', NULL, '23 Lê Văn Hiến, Ngũ Hành Sơn, Đà Nẵng', '88 Tôn Đức Thắng, Liên Chiểu, Đà Nẵng', 8.10, 175000.00, 0.00, 'COD', 'delivered', 'Đà Nẵng', '2025-10-01 03:10:00', '2025-11-05 15:59:06', 16.008800, 108.263000, 16.072400, 108.160000),
(22, 'SP1009', NULL, 'Kim Loan', '012347594', 'Ngọc Trường', '033218412', NULL, '23 Lê Văn Hiến, Ngũ Hành Sơn, Đà Nẵng', '88 Tôn Đức Thắng, Liên Chiểu, Đà Nẵng', 4.60, 200000.00, 0.00, 'COD', 'delivering', 'Đà Nẵng', '2025-10-21 14:28:49', '2025-11-05 15:59:06', 16.008800, 108.263000, 16.072400, 108.160000),
(23, 'SP1010', NULL, 'Ngọc Trường', '0321393213', 'Kim Loan', '0234566783', NULL, '120 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng', '45 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng', 5.20, 900000.00, 0.00, 'COD', 'pending', 'Đà Nẵng', '2025-10-21 14:29:46', '2025-11-05 15:59:06', 16.083400, 108.247000, 16.065000, 108.187000),
(24, 'SPA001', NULL, 'Kim Loan', '0123456779', 'Ngọc Trường', '098764221', NULL, '55 Nguyễn Hữu Thọ, Cẩm Lệ, Đà Nẵng', '12 Lê Duẩn, Hải Châu, Đà Nẵng', 5.20, 90000.00, 0.00, 'COD', 'completed', 'Đà Nẵng', '2025-10-22 05:29:37', '2025-11-05 15:59:06', 16.018000, 108.206000, 16.066800, 108.220800),
(25, 'SPA100', NULL, 'Nguyễn Thị Mai', '0909333111', 'Diễm Trang', '0909555666', NULL, '23 Lê Văn Hiến, Ngũ Hành Sơn, Đà Nẵng', '88 Tôn Đức Thắng, Liên Chiểu, Đà Nẵng', 4.60, 120000.00, 0.00, 'COD', 'delivered', 'Đà Nẵng', '2025-10-22 05:53:21', '2025-11-05 15:59:06', 16.008800, 108.263000, 16.072400, 108.160000),
(26, 'SPA200', NULL, 'Nguyễn Tấn Sang', '0132131323', 'Ngọc Trường', '0909555999', NULL, '120 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng', '45 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng', 5.20, 90000.00, 0.00, 'COD', 'delivered', 'Đà Nẵng', '2025-10-22 05:54:33', '2025-11-05 15:59:06', 16.083400, 108.247000, 16.065000, 108.187000),
(27, 'SPA101', NULL, 'Bảo Minh', '0232039992', 'Quốc Khanh', '0231131312', NULL, '55 Nguyễn Hữu Thọ, Cẩm Lệ, Đà Nẵng', '12 Lê Duẩn, Hải Châu, Đà Nẵng', 5.20, 120000.00, 0.00, 'COD', 'pending', 'Đà Nẵng', '2025-10-22 08:54:47', '2025-11-05 15:59:06', 16.018000, 108.206000, 16.066800, 108.220800),
(28, 'SP396533', NULL, 'Phạm Huy 3', '0909123456', 'Diễm Trang 22', '0909555999', NULL, '23 Lê Văn Hiến, Ngũ Hành Sơn, Đà Nẵng', '88 Tôn Đức Thắng, Liên Chiểu, Đà Nẵng', 4.60, 90000.00, 0.00, 'COD', 'completed', 'Đà Nẵng', '2025-10-25 06:06:36', '2025-11-05 15:59:06', 16.008800, 108.263000, 16.072400, 108.160000),
(29, 'TEST001', 9, 'Truong KH', '0909123456', 'Ngọc Trường', '0909988776', NULL, '120 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng', '45 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng', 3.50, 80000.00, 0.00, 'COD', 'completed', 'Đà Nẵng', '2025-10-25 06:15:57', '2025-11-05 15:59:06', 16.083400, 108.247000, 16.065000, 108.187000),
(30, 'SP114618', 9, 'Viet Ngoc', '0909234567', 'Ngọc Trường', '0905050505', NULL, '55 Nguyễn Hữu Thọ, Cẩm Lệ, Đà Nẵng', '12 Lê Duẩn, Hải Châu, Đà Nẵng', 4.60, 90000.00, 0.00, 'COD', 'delivered', 'Đà Nẵng', '2025-10-25 06:18:34', '2025-11-05 15:59:06', 16.018000, 108.206000, 16.066800, 108.220800),
(31, 'SP386563', 9, 'Hoài Bảo', '0123456998', 'Viết Ngọc', '09050600060', NULL, '23 Lê Văn Hiến, Ngũ Hành Sơn, Đà Nẵng', '88 Tôn Đức Thắng, Liên Chiểu, Đà Nẵng', 9.00, 4500000.00, 0.00, 'COD', 'delivered', 'Đà Nẵng', '2025-10-25 06:23:06', '2025-11-05 15:59:06', 16.008800, 108.263000, 16.072400, 108.160000),
(32, 'SP950332', 9, 'Phạm Huy 5', '0909123452', 'Diễm Trang', '0125544886', NULL, '120 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng', '45 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng', 4.60, 190000.00, 0.00, 'COD', 'pending', 'Đà Nẵng', '2025-10-25 10:25:50', '2025-11-05 15:59:06', 16.083400, 108.247000, 16.065000, 108.187000),
(33, 'SP766968', 9, 'Nguyễn Thị Mai 2', '012345989', 'Bảo Minh', '0363599987', NULL, '55 Nguyễn Hữu Thọ, Cẩm Lệ, Đà Nẵng', '12 Lê Duẩn, Hải Châu, Đà Nẵng', 9.50, 1500000.00, 0.00, 'COD', 'pending', 'Đà Nẵng', '2025-10-25 10:39:26', '2025-11-05 15:59:06', 16.018000, 108.206000, 16.066800, 108.220800),
(34, 'SP009005', 9, 'Lê Văn Long 22', '0909123456', 'Phạm Thị Hoa', '0905050505', NULL, '23 Lê Văn Hiến, Ngũ Hành Sơn, Đà Nẵng', '88 Tôn Đức Thắng, Liên Chiểu, Đà Nẵng', 4.60, 900000.00, 0.00, 'COD', 'delivering', 'Đà Nẵng', '2025-10-25 10:43:29', '2025-11-05 15:59:06', 16.008800, 108.263000, 16.072400, 108.160000),
(35, 'SP194149', 9, 'Phạm Huy 9', '0909234567', 'Diễm Trang 2', '0909666777', NULL, '120 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng', '45 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng', 4.60, 900000.00, 0.00, 'COD', 'delivered', 'Đà Nẵng', '2025-10-25 10:46:34', '2025-11-05 15:59:06', 16.083400, 108.247000, 16.065000, 108.187000),
(36, 'SP965709', 9, 'Phạm Huy 3', '0909234567', 'test', '0123456799', NULL, '55 Nguyễn Hữu Thọ, Cẩm Lệ, Đà Nẵng', '12 Lê Duẩn, Hải Châu, Đà Nẵng', 4.90, 90000.00, 0.00, 'COD', 'delivered', 'Đà Nẵng', '2025-10-25 10:59:25', '2025-11-05 15:59:06', 16.018000, 108.206000, 16.066800, 108.220800),
(37, 'SP119665', 9, 'Test 2', '0123456998', 'Test Cuoi', '01545454558', NULL, '23 Lê Văn Hiến, Ngũ Hành Sơn, Đà Nẵng', '88 Tôn Đức Thắng, Liên Chiểu, Đà Nẵng', 4.60, 800000.00, 0.00, 'COD', 'completed', 'Đà Nẵng', '2025-10-25 11:18:39', '2025-11-05 15:59:06', 16.008800, 108.263000, 16.072400, 108.160000),
(38, 'SP273096', 9, 'Sang Nguyễn', '0973673151', 'Ngọc Trường', '0998441166', NULL, '120 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng', '45 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng', 4.90, 440000.00, 0.00, 'COD', 'delivered', 'Đà Nẵng', '2025-10-25 11:21:13', '2025-11-05 15:59:06', 16.083400, 108.247000, 16.065000, 108.187000),
(39, 'SP328431', 9, 'Trường ', '0988141667', 'Sang', '0919118886', NULL, '55 Nguyễn Hữu Thọ, Cẩm Lệ, Đà Nẵng', '12 Lê Duẩn, Hải Châu, Đà Nẵng', 2.50, 15000.00, 0.00, 'COD', 'delivered', 'Đà Nẵng', '2025-10-25 11:22:08', '2025-11-05 15:59:06', 16.018000, 108.206000, 16.066800, 108.220800),
(40, 'SP365416', 9, 'Trường', '0905886442', 'Ngọc', '0778449663', NULL, '23 Lê Văn Hiến, Ngũ Hành Sơn, Đà Nẵng', '88 Tôn Đức Thắng, Liên Chiểu, Đà Nẵng', 4.80, 18000.00, 0.00, 'COD', 'delivered', 'Đà Nẵng', '2025-10-25 11:22:45', '2025-11-05 15:59:06', 16.008800, 108.263000, 16.072400, 108.160000),
(41, 'SP545874', 9, 'Tesst 22', '0909234567', 'Test 99', '0909555999', NULL, '120 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng', '45 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng', 4.50, 80000.00, 0.00, 'COD', 'delivered', 'Đà Nẵng', '2025-10-25 11:25:45', '2025-11-05 15:59:06', 16.083400, 108.247000, 16.065000, 108.187000),
(42, 'SP748623', 9, 'Test 33', '0909234567', 'Diễm Trang', '0909555666', NULL, '55 Nguyễn Hữu Thọ, Cẩm Lệ, Đà Nẵng', '12 Lê Duẩn, Hải Châu, Đà Nẵng', 5.20, 90000.00, 0.00, 'COD', 'delivered', 'Đà Nẵng', '2025-10-25 11:29:08', '2025-11-05 15:59:06', 16.018000, 108.206000, 16.066800, 108.220800),
(43, 'SP797768', 9, 'Sắp Push', '0123456998', 'Push Code', '0775992441', NULL, '23 Lê Văn Hiến, Ngũ Hành Sơn, Đà Nẵng', '88 Tôn Đức Thắng, Liên Chiểu, Đà Nẵng', 2.30, 80000.00, 0.00, 'COD', 'delivered', 'Đà Nẵng', '2025-10-25 13:26:37', '2025-11-05 15:59:06', 16.008800, 108.263000, 16.072400, 108.160000),
(44, 'SP958580', 9, 'Trường 123', '0909123456', 'Trường 456', '0121212121', NULL, '120 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng', '45 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng', 4.90, 120000.00, 0.00, 'COD', 'picking', 'Đà Nẵng', '2025-10-28 14:32:38', '2025-11-05 15:59:06', 16.083400, 108.247000, 16.065000, 108.187000),
(45, 'SP073308', 9, 'Phạm Huy 3', '0909234567', 'Phạm Thị Hoa', '0909555999', NULL, '55 Nguyễn Hữu Thọ, Cẩm Lệ, Đà Nẵng', '12 Lê Duẩn, Hải Châu, Đà Nẵng', 4.60, 12000.00, 0.00, 'COD', 'delivering', NULL, '2025-10-28 17:37:53', '2025-11-25 09:28:32', 16.018000, 108.206000, 16.066800, 108.220800),
(46, 'SP591838', 9, 'bảo minh', '0123456789', 'Ngọc Trường', '0987654321', NULL, '23 Lê Văn Hiến, Ngũ Hành Sơn, Đà Nẵng', '88 Tôn Đức Thắng, Liên Chiểu, Đà Nẵng', 4.00, 150000.00, 0.00, 'COD', 'completed', NULL, '2025-10-29 05:09:51', '2025-11-24 04:48:27', 16.008800, 108.263000, 16.072400, 108.160000),
(101, 'TRACK101', NULL, 'Nguyễn Văn A', NULL, 'Lê Thị B', NULL, NULL, '120 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng', '45 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng', NULL, 0.00, 0.00, 'COD', 'completed', NULL, '2025-07-12 03:00:00', '2025-11-05 15:59:06', 16.083400, 108.247000, 16.065000, 108.187000),
(102, 'TRACK102', NULL, 'Trần Văn C', NULL, 'Phạm Thị D', NULL, NULL, '55 Nguyễn Hữu Thọ, Cẩm Lệ, Đà Nẵng', '12 Lê Duẩn, Hải Châu, Đà Nẵng', NULL, 0.00, 0.00, 'COD', 'completed', NULL, '2025-07-25 07:00:00', '2025-11-05 15:59:06', 16.018000, 108.206000, 16.066800, 108.220800),
(103, 'TRACK103', NULL, 'Lê Văn E', NULL, 'Võ Thị F', NULL, NULL, '23 Lê Văn Hiến, Ngũ Hành Sơn, Đà Nẵng', '88 Tôn Đức Thắng, Liên Chiểu, Đà Nẵng', NULL, 0.00, 0.00, 'COD', 'completed', NULL, '2025-08-08 02:00:00', '2025-11-05 15:59:06', 16.008800, 108.263000, 16.072400, 108.160000),
(105, 'TRACK105', NULL, 'Phan Văn I', NULL, 'Đặng Thị K', NULL, NULL, '55 Nguyễn Hữu Thọ, Cẩm Lệ, Đà Nẵng', '12 Lê Duẩn, Hải Châu, Đà Nẵng', NULL, 0.00, 0.00, 'COD', 'completed', NULL, '2025-09-05 01:30:00', '2025-11-05 15:59:06', 16.018000, 108.206000, 16.066800, 108.220800),
(106, 'TRACK106', NULL, 'Võ Văn L', NULL, 'Trịnh Thị M', NULL, NULL, '23 Lê Văn Hiến, Ngũ Hành Sơn, Đà Nẵng', '88 Tôn Đức Thắng, Liên Chiểu, Đà Nẵng', NULL, 0.00, 0.00, 'COD', 'completed', NULL, '2025-09-22 10:00:00', '2025-11-05 15:59:06', 16.008800, 108.263000, 16.072400, 108.160000),
(107, 'TRACK107', NULL, 'Lương Văn N', NULL, 'Nguyễn Thị O', NULL, NULL, '120 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng', '45 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng', NULL, 0.00, 0.00, 'COD', 'completed', NULL, '2025-10-10 04:00:00', '2025-11-05 15:59:06', 16.083400, 108.247000, 16.065000, 108.187000),
(108, 'TRACK108', NULL, 'Đinh Văn P', NULL, 'Bùi Thị Q', NULL, NULL, '55 Nguyễn Hữu Thọ, Cẩm Lệ, Đà Nẵng', '12 Lê Duẩn, Hải Châu, Đà Nẵng', NULL, 0.00, 0.00, 'COD', 'completed', NULL, '2025-10-18 02:30:00', '2025-11-05 15:59:06', 16.018000, 108.206000, 16.066800, 108.220800),
(109, 'SP873938', 9, 'TestNoti', '0909234567', 'Test 99', '0905050505', NULL, '23 Lê Văn Hiến, Ngũ Hành Sơn, Đà Nẵng', '88 Tôn Đức Thắng, Liên Chiểu, Đà Nẵng', 4.90, 80000.00, 0.00, 'COD', 'picking', NULL, '2025-11-03 07:11:13', '2025-11-05 15:59:06', 16.008800, 108.263000, 16.072400, 108.160000),
(110, 'SP354559', 9, 'Lê Văn Long 29', '0909123456', 'TruongTestNotif', '0909555999', NULL, '120 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng', '45 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng', 2.30, 900000.00, 0.00, 'COD', 'pending', NULL, '2025-11-03 07:19:14', '2025-11-05 15:59:06', 16.083400, 108.247000, 16.065000, 108.187000),
(111, 'SP419169', 9, 'Lê Văn Long 1', '0909123456', 'Trường 456', '0909555666', NULL, '55 Nguyễn Hữu Thọ, Cẩm Lệ, Đà Nẵng', '12 Lê Duẩn, Hải Châu, Đà Nẵng', 9.00, 900000.00, 0.00, 'COD', 'pending', NULL, '2025-11-03 07:20:19', '2025-11-05 15:59:06', 16.018000, 108.206000, 16.066800, 108.220800),
(112, 'SP688400', 9, 'Test Notif 3', '0909123456', 'Phạm Thị Hoa', '0909555666', NULL, '23 Lê Văn Hiến, Ngũ Hành Sơn, Đà Nẵng', '88 Tôn Đức Thắng, Liên Chiểu, Đà Nẵng', 4.90, 90000.00, 0.00, 'COD', 'pending', NULL, '2025-11-03 07:24:48', '2025-11-05 15:59:06', 16.008800, 108.263000, 16.072400, 108.160000),
(113, 'SP907414', 16, 'TestNoti', '0909234567', 'Phạm Thị Hoa 2', '09095552', NULL, '120 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng', '45 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng', 4.90, 80000.00, 0.00, 'COD', 'assigned', NULL, '2025-11-03 08:01:47', '2025-11-05 15:59:06', 16.083400, 108.247000, 16.065000, 108.187000),
(114, 'SP037079', 16, 'Test Notif 4', '0909123456', 'test', '0909555663', NULL, '55 Nguyễn Hữu Thọ, Cẩm Lệ, Đà Nẵng', '12 Lê Duẩn, Hải Châu, Đà Nẵng', 4.90, 90000.00, 0.00, 'COD', 'assigned', NULL, '2025-11-03 08:03:57', '2025-11-05 15:59:06', 16.018000, 108.206000, 16.066800, 108.220800),
(115, 'SP353078', 16, 'Test Notif 5', '0909234567', 'Phạm Thị Hoa', '0905050505', NULL, '23 Lê Văn Hiến, Ngũ Hành Sơn, Đà Nẵng', '88 Tôn Đức Thắng, Liên Chiểu, Đà Nẵng', 4.90, 80000.00, 0.00, 'COD', 'picking', NULL, '2025-11-03 08:09:13', '2025-11-25 09:28:24', 16.008800, 108.263000, 16.072400, 108.160000),
(116, 'SP469717', 16, 'Test Notif 6', '0909234567', 'Phạm Thị Hoa', '0905050505', NULL, '120 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng', '45 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng', 4.90, 90000.00, 0.00, 'COD', 'assigned', NULL, '2025-11-03 08:11:09', '2025-11-05 15:59:06', 16.083400, 108.247000, 16.065000, 108.187000),
(117, 'SP472255', 16, 'TestNoti 22', '0909234567', 'Tri', '0909555666', NULL, '55 Nguyễn Hữu Thọ, Cẩm Lệ, Đà Nẵng', '12 Lê Duẩn, Hải Châu, Đà Nẵng', 4.90, 90000.00, 0.00, 'COD', 'pending', NULL, '2025-11-03 08:27:52', '2025-11-05 15:59:06', 16.018000, 108.206000, 16.066800, 108.220800),
(118, 'SP646950', 16, 'Test thongbao', '0909123456', 'Test 99', '0909555666', NULL, '23 Lê Văn Hiến, Ngũ Hành Sơn, Đà Nẵng', '88 Tôn Đức Thắng, Liên Chiểu, Đà Nẵng', 4.90, 80000.00, 0.00, 'COD', 'assigned', NULL, '2025-11-03 08:30:46', '2025-11-05 15:59:06', 16.008800, 108.263000, 16.072400, 108.160000),
(119, 'SP134143', 16, 'Test Notif 32', '0909123456', 'sadsa', '0905050505', NULL, '120 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng', '45 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng', 4.90, 90000.00, 0.00, 'COD', 'assigned', NULL, '2025-11-03 08:38:54', '2025-11-05 15:59:06', 16.083400, 108.247000, 16.065000, 108.187000),
(120, 'SP311572', 16, 'TestNoti', '0213201323', 'Truong', '0905050505', NULL, '55 Nguyễn Hữu Thọ, Cẩm Lệ, Đà Nẵng', '12 Lê Duẩn, Hải Châu, Đà Nẵng', 4.90, 90000.00, 0.00, 'COD', 'assigned', NULL, '2025-11-03 08:41:51', '2025-11-05 15:59:06', 16.018000, 108.206000, 16.066800, 108.220800),
(121, 'SP941752', 16, 'TT', '0909234567', 'SS', '0909555666', NULL, '23 Lê Văn Hiến, Ngũ Hành Sơn, Đà Nẵng', '88 Tôn Đức Thắng, Liên Chiểu, Đà Nẵng', 4.90, 90000.00, 0.00, 'COD', 'pending', NULL, '2025-11-03 08:52:21', '2025-11-05 15:59:06', 16.008800, 108.263000, 16.072400, 108.160000),
(122, 'SP964294', 9, 'Test Notif 35', '0909234567', 'Phạm Thị Hoa', '0905050505', NULL, '120 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng', '45 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng', 4.90, 90000.00, 0.00, 'COD', 'completed', NULL, '2025-11-03 09:26:04', '2025-11-05 15:59:06', 16.083400, 108.247000, 16.065000, 108.187000),
(123, 'SP156327', 9, 'Test Notif 35', '0909234567', 'Phạm Thị Hoa', '0909555666', NULL, '55 Nguyễn Hữu Thọ, Cẩm Lệ, Đà Nẵng', '12 Lê Duẩn, Hải Châu, Đà Nẵng', 4.90, 90000.00, 0.00, 'COD', 'delivered', NULL, '2025-11-03 09:29:16', '2025-11-05 15:59:06', 16.018000, 108.206000, 16.066800, 108.220800),
(125, 'SP556675', 5, 'Nguyễn Văn A', '0905123456', 'Trần Thị B', '0906234567', NULL, '120 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng', '45 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng', 2.50, 150000.00, 0.00, 'COD', 'delivered', NULL, '2025-11-03 09:35:56', '2025-11-05 15:59:06', 16.083400, 108.247000, 16.065000, 108.187000),
(126, 'SP619115', 9, 'TestNoti', '0909234567', 'Test 99', '0905050505', NULL, '55 Nguyễn Hữu Thọ, Cẩm Lệ, Đà Nẵng', '12 Lê Duẩn, Hải Châu, Đà Nẵng', 4.90, 80000.00, 0.00, 'COD', 'delivered', NULL, '2025-11-03 09:36:59', '2025-11-05 15:59:06', 16.018000, 108.206000, 16.066800, 108.220800),
(127, 'SP695511', 9, 'Test Notif 35', '0909234567', 'Phạm Thị Hoa', '0905050505', NULL, '23 Lê Văn Hiến, Ngũ Hành Sơn, Đà Nẵng', '88 Tôn Đức Thắng, Liên Chiểu, Đà Nẵng', 4.90, 80000.00, 0.00, 'COD', 'delivered', NULL, '2025-11-03 09:38:15', '2025-11-05 15:59:06', 16.008800, 108.263000, 16.072400, 108.160000),
(128, 'SP723715', 9, 'Trường Khách Hàng', '0909123456', 'Loan Khách Hàng', '0909555666', 'Laptop', 'Thành phố Đà Nẵng, Quận Liên Chiểu, Phường Hòa Minh', 'Tỉnh Quảng Nam, Huyện Hiệp Đức, Xã Bình Sơn', 4.90, 90000.00, 36300.00, 'COD', 'pending', NULL, '2025-11-05 16:22:03', '2025-11-05 16:22:03', NULL, NULL, NULL, NULL),
(129, 'SP874967', 9, 'Phạm Huy Q', '0909123456', 'Ngọc Trường', '0905050505', 'Laptop', 'Thành phố Đà Nẵng, Quận Sơn Trà, Phường An Hải Nam', 'Tỉnh Quảng Nam, Huyện Hiệp Đức, Xã Bình Lâm', 10.00, 80000.00, 80000.00, 'MOMO', 'pending', NULL, '2025-11-05 16:41:14', '2025-11-05 16:41:14', NULL, NULL, NULL, NULL),
(130, 'SP042028', 9, 'Nguyễn Thị Mai', '0123456998', 'Viết Ngọc', '0905050505', 'Laptop', 'Thành phố Đà Nẵng, Quận Cẩm Lệ, Phường Hòa Phát', 'Thành phố Đà Nẵng, Quận Liên Chiểu, Phường Hòa Minh', 4.90, 80000.00, 44300.00, 'MOMO', 'pending', NULL, '2025-11-05 16:44:02', '2025-11-05 16:44:02', NULL, NULL, NULL, NULL),
(131, 'SP390912', 9, 'Lê Văn Long 22', '0123456998', 'Diễm Trang 2', '09050600060', 'Giày Nữ', 'Kho trung tâm - 123 Nguyễn Văn Linh, Quận Hải Châu, Đà Nẵng', 'Thành phố Đà Nẵng, Quận Sơn Trà, Phường Phước Mỹ', 2.00, 120000.00, 24000.00, 'MOMO', 'pending', NULL, '2025-11-05 16:49:50', '2025-11-05 16:49:50', NULL, NULL, NULL, NULL),
(132, 'SP596766', 9, 'Lê Văn Long', '0909123452', 'Trần Văn Cường', '0909666777', 'Điện Thoại', 'Thành phố Hà Nội, Quận Ba Đình, Phường Vĩnh Phúc', 'Thành phố Đà Nẵng, Quận Sơn Trà, Phường Nại Hiên Đông', 4.90, 95000.00, 44300.00, 'MOMO', 'pending', NULL, '2025-11-05 16:53:16', '2025-11-05 16:53:16', NULL, NULL, NULL, NULL),
(133, 'SP806206', 9, 'Viet Ngoc', '0123456998', 'Sang Tấn', '0909555999', 'Giày Nam', 'Thành phố Đà Nẵng, Quận Sơn Trà, Phường Nại Hiên Đông', 'Thành phố Hà Nội, Quận Hoàn Kiếm, Phường Phúc Tân', 3.20, 150000.00, 32400.00, 'MOMO', 'pending', NULL, '2025-11-05 16:56:46', '2025-11-05 16:56:46', NULL, NULL, NULL, NULL),
(134, 'SP973396', 9, 'Lê Văn Long 22', '0123456998', 'Viết Ngọc', '09050600060', 'Giày Nam', 'Kho trung tâm - 123 Nguyễn Văn Linh, Quận Hải Châu, Đà Nẵng', 'Thành phố Đà Nẵng, Quận Sơn Trà, Phường Mân Thái', 5.20, 80000.00, 46400.00, 'MOMO', 'pending', NULL, '2025-11-05 16:59:33', '2025-11-05 16:59:33', NULL, NULL, NULL, NULL),
(135, 'SP055885', 9, 'Lê Văn Long 3', '0909333111', 'Viết Ngọc', '09050600060', 'Giày Nam', 'Kho trung tâm - 123 Nguyễn Văn Linh, Quận Hải Châu, Đà Nẵng', 'Tỉnh Hải Dương, Huyện Cẩm Giàng, Xã Cẩm Đoài', 5.20, 95000.00, 46400.00, 'MOMO', 'pending', NULL, '2025-11-05 17:00:55', '2025-11-05 17:00:55', NULL, NULL, NULL, NULL),
(136, 'SP324192', 9, 'Nguyễn Thị Mai 3', '0123456998', 'Viết Ngọc', '09050600060', 'Laptop', 'Tỉnh Hà Giang, Huyện Yên Minh, Xã Sủng Tráng', 'Tỉnh Phú Thọ, Huyện Thanh Thuỷ, Xã Tu Vũ', 9.00, 80000.00, 73000.00, 'MOMO', 'pending', NULL, '2025-11-05 17:05:24', '2025-11-05 17:05:24', NULL, NULL, NULL, NULL),
(137, 'SP420724', 9, 'Hoài Bảo', '0905886442', 'Trần Văn Cường', '0909555999', 'Laptop', 'Tỉnh Bắc Kạn, Huyện Ba Bể, Xã Khang Ninh', 'Tỉnh Bắc Ninh, Thành phố Bắc Ninh, Phường Hạp Lĩnh', 4.60, 95000.00, 42200.00, 'MOMO', 'pending', NULL, '2025-11-05 17:07:00', '2025-11-05 17:07:00', NULL, NULL, NULL, NULL),
(138, 'SP623212', 9, 'Viet Ngoc', '0909123452', 'Trần Văn Cường', '09050600060', 'Giày Nữ', 'Tỉnh Cao Bằng, Huyện Trùng Khánh, Xã Quang Trung', 'Tỉnh Bắc Ninh, Thị xã Quế Võ, Xã Mộ Đạo', 2.30, 95000.00, 26100.00, 'COD', 'pending', NULL, '2025-11-05 17:10:23', '2025-11-05 17:10:23', NULL, NULL, NULL, NULL),
(139, 'SP923509', 9, 'Viet Ngoc', '0909333111', 'Diễm Trang 2', '0909555666', 'Giày Nam', 'Kho trung tâm - 123 Nguyễn Văn Linh, Quận Hải Châu, Đà Nẵng', 'Thành phố Đà Nẵng, Quận Thanh Khê, Phường Xuân Hà', 5.20, 120000.00, 46400.00, 'MOMO', 'pending', NULL, '2025-11-05 17:15:23', '2025-11-05 17:15:23', NULL, NULL, NULL, NULL),
(140, 'SP304120', 9, 'Nguyễn Thị Mai', '0909333111', 'Trần Văn Cường', '0909555666', 'Giày Nữ', 'Tỉnh Hà Giang, Huyện Yên Minh, Xã Sủng Thài', 'Tỉnh Quảng Ninh, Thành phố Hạ Long, Phường Hồng Hà', 2.30, 95000.00, 26100.00, 'MOMO', 'pending', NULL, '2025-11-05 17:21:44', '2025-11-05 17:21:44', NULL, NULL, NULL, NULL),
(141, 'SP425443', 9, 'Hoài Bảo', '0909333111', 'Trần Văn Cường', '09050600060', 'Điện Thoại', 'Thành phố Đà Nẵng, Huyện Hòa Vang, Xã Hòa Phú', 'Tỉnh Hải Dương, Huyện Thanh Miện, Xã Hồng Phong', 5.20, 95000.00, 46400.00, 'MOMO', 'pending', NULL, '2025-11-05 17:23:45', '2025-11-05 17:23:45', NULL, NULL, NULL, NULL),
(142, 'SP548366', 9, 'Hoài Bảo', '0905886442', 'Viết Ngọc', '0909666777', 'Laptop', 'Tỉnh Bắc Kạn, Huyện Chợ Mới, Xã Thanh Mai', 'Tỉnh Vĩnh Phúc, Huyện Lập Thạch, Xã Sơn Đông', 4.60, 95000.00, 42200.00, 'MOMO', 'pending', NULL, '2025-11-05 17:42:28', '2025-11-05 17:42:28', NULL, NULL, NULL, NULL),
(143, 'SP315672', 9, 'Hoài Bảo', '0909333111', 'Ngọc Trường', '09050600060', 'Giày Nữ', 'Kho trung tâm - 123 Nguyễn Văn Linh, Quận Hải Châu, Đà Nẵng', 'Thành phố Đà Nẵng, Huyện Hòa Vang, Xã Hòa Khương', 5.20, 80000.00, 46400.00, 'MOMO', 'pending', NULL, '2025-11-05 17:55:15', '2025-11-05 17:55:15', NULL, NULL, NULL, NULL),
(144, 'SP541862', 9, 'Hoài Bảo', '0909123452', 'Ngọc Trường', '0909666777', 'Giày Nam', 'Kho trung tâm - 123 Nguyễn Văn Linh, Quận Hải Châu, Đà Nẵng', 'Tỉnh Cao Bằng, Huyện Hà Quảng, Xã Lương Can', 5.20, 80000.00, 46400.00, 'MOMO', 'pending', NULL, '2025-11-05 17:59:01', '2025-11-05 17:59:01', NULL, NULL, NULL, NULL),
(145, 'SP048341', 9, 'Nguyễn Thị Mai', '0123456998', 'Viết Ngọc', '0909555666', 'Điện Thoại', 'Kho trung tâm - 123 Nguyễn Văn Linh, Quận Hải Châu, Đà Nẵng', 'Thành phố Đà Nẵng, Quận Thanh Khê, Phường Xuân Hà', 2.50, 95000.00, 27500.00, 'MOMO', 'pending', NULL, '2025-11-05 18:07:28', '2025-11-05 18:07:28', NULL, NULL, NULL, NULL),
(146, 'SP659417', 9, 'Lê Văn Long 22', '0909123456', 'Diễm Trang', '0909555666', NULL, '55 Nguyễn Văn Linh, Đà Nẵng', '45 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng', 5.20, 80000.00, 0.00, 'COD', 'pending', NULL, '2025-11-05 18:17:39', '2025-11-05 18:17:39', NULL, NULL, NULL, NULL),
(147, 'SP982022', 9, 'Lê Văn Long 22', '0909123456', 'Viết Ngọc', '09050600060', NULL, '', 'Tỉnh Lạng Sơn, Huyện Văn Quan, Xã Yên Phúc', 4.90, 90000.00, 0.00, 'COD', 'delivered', NULL, '2025-11-05 18:23:02', '2025-11-05 18:24:24', NULL, NULL, NULL, NULL),
(148, 'SP248894', 9, 'Hoài Bảo', '0909333111', 'Phạm Thị Hoa', '09050600060', NULL, 'Tỉnh Bắc Kạn, Huyện Chợ Đồn, Xã Đồng Lạc', 'Tỉnh Bắc Ninh, Thành phố Bắc Ninh, Phường Nam Sơn', 2.50, 95000.00, 0.00, 'COD', 'pending', NULL, '2025-11-05 18:27:28', '2025-11-05 18:27:28', NULL, NULL, NULL, NULL),
(149, 'SP499022', 9, 'Viet Ngoc', '0909123452', 'Diễm Trang', '09050600060', NULL, 'Thành phố Đà Nẵng, Quận Thanh Khê, Phường Xuân Hà', 'Thành phố Đà Nẵng, Quận Thanh Khê, Phường Chính Gián', 2.50, 120000.00, 0.00, 'COD', 'pending', NULL, '2025-11-05 18:31:39', '2025-11-05 18:31:39', NULL, NULL, NULL, NULL),
(150, 'SP694772', 9, 'Viet Ngoc', '0909234567', 'Phạm Thị Hoa', '0909555999', NULL, 'Tỉnh Hà Giang, Thành phố Hà Giang, Phường Trần Phú', 'Tỉnh Bắc Ninh, Thành phố Bắc Ninh, Phường Nam Sơn', 5.20, 90000.00, 0.00, 'COD', 'pending', NULL, '2025-11-05 18:34:54', '2025-11-05 18:34:54', NULL, NULL, NULL, NULL),
(151, 'SP320526', 9, 'Lê Văn Long 22', '0909333111', 'Viết Ngọc', '0909666777', NULL, 'Tỉnh Cao Bằng, Huyện Bảo Lâm, Xã Nam Quang', 'Tỉnh Bắc Ninh, Thành phố Bắc Ninh, Phường Khắc Niệm', 4.90, 90000.00, 0.00, 'COD', 'pending', NULL, '2025-11-05 18:45:20', '2025-11-05 18:45:20', NULL, NULL, NULL, NULL),
(152, 'SP543517', 9, 'Truongdubaix', '0909333111', 'Trần Văn Cường', '0909555666', NULL, 'Thành phố Đà Nẵng, Quận Sơn Trà, Phường Mân Thái', 'Thành phố Đà Nẵng, Quận Hải Châu, Phường Thuận Phước', 4.90, 80000.00, 0.00, 'COD', 'pending', NULL, '2025-11-05 18:49:03', '2025-11-05 18:49:03', NULL, NULL, NULL, NULL),
(153, 'SP827551', 9, 'Viet Ngoc', '0909123452', 'Trần Văn Cường', '0905050505', NULL, 'Tỉnh Bắc Kạn, Huyện Ngân Sơn, Xã Đức Vân', 'Thành phố Đà Nẵng, Quận Liên Chiểu, Phường Hòa Hiệp Nam', 2.50, 80000.00, 0.00, 'COD', 'pending', NULL, '2025-11-05 18:53:47', '2025-11-05 18:53:47', NULL, NULL, NULL, NULL),
(154, 'SP923846', 9, 'Nguyễn Thị Mai', '0905886442', 'Trần Văn Cường', '0909666777', NULL, 'Tỉnh Tuyên Quang, Huyện Chiêm Hóa, Xã Hùng Mỹ', 'Tỉnh Bắc Ninh, Huyện Yên Phong, Xã Đông Thọ', 2.30, 95000.00, 0.00, 'COD', 'pending', NULL, '2025-11-05 18:55:23', '2025-11-05 18:55:23', NULL, NULL, NULL, NULL),
(155, 'SP074233', 9, 'Viet Ngoc', '0905886442', 'Trần Văn Cường', '0905050505', NULL, 'Tỉnh Hà Giang, Huyện Đồng Văn, Xã Lũng Táo', 'Tỉnh Vĩnh Phúc, Thành phố Phúc Yên, Phường Xuân Hoà', 5.20, 95000.00, 0.00, 'COD', 'pending', NULL, '2025-11-05 18:57:54', '2025-11-05 18:57:54', NULL, NULL, NULL, NULL),
(156, 'SP425824', 9, 'Hoài Bảo', '0909333111', 'Viết Ngọc', '0909555666', NULL, 'Thành phố Hà Nội, Quận Hoàn Kiếm, Phường Đồng Xuân', 'Tỉnh Bắc Giang, Thị xã Việt Yên, Phường Ninh Sơn', 2.30, 95000.00, 0.00, 'COD', 'pending', NULL, '2025-11-05 19:03:45', '2025-11-05 19:03:45', NULL, NULL, NULL, NULL),
(157, 'SP687510', 9, 'Nguyễn Thị Mai', '0909123452', 'Viết Ngọc', '0905050505', NULL, 'Tỉnh Bắc Kạn, Huyện Ba Bể, Xã Hà Hiệu', 'Tỉnh Bắc Giang, Thị xã Việt Yên, Phường Quang Châu', 2.50, 100000.00, 0.00, 'COD', 'pending', NULL, '2025-11-05 19:08:07', '2025-11-05 19:08:07', NULL, NULL, NULL, NULL),
(158, 'SP096179', 9, 'Nguyễn Thị Mai', '0909333111', 'Phạm Thị Hoa', '09050600060', NULL, 'Tỉnh Cao Bằng, Huyện Bảo Lạc, Xã Bảo Toàn', 'Tỉnh Bắc Ninh, Thành phố Bắc Ninh, Phường Hạp Lĩnh', 2.50, 280000.00, 0.00, 'COD', 'pending', NULL, '2025-11-05 19:14:56', '2025-11-05 19:14:56', NULL, NULL, NULL, NULL),
(159, 'SP708944', 9, 'Lê Văn Long', '0909333111', 'Trần Văn Cường', '0909555999', NULL, 'Tỉnh Cao Bằng, Huyện Bảo Lạc, Xã Thượng Hà', 'Tỉnh Vĩnh Phúc, Thành phố Vĩnh Yên, Phường Liên Bảo', 2.30, 120000.00, 0.00, 'COD', 'pending', NULL, '2025-11-05 19:25:08', '2025-11-05 19:25:08', NULL, NULL, NULL, NULL),
(160, 'SP684167', 9, 'Nguyễn Thị Mai', '0909333111', 'Viết Ngọc', '0909555666', NULL, 'Tỉnh Cao Bằng, Huyện Trùng Khánh, Xã Cao Chương', 'Tỉnh Phú Thọ, Huyện Thanh Sơn, Xã Yên Lãng', 9.00, 200000.00, 0.00, 'COD', 'pending', NULL, '2025-11-05 19:41:24', '2025-11-05 19:41:24', NULL, NULL, NULL, NULL),
(163, 'SP527216', 9, 'Nguyễn Thị Mai', '0905886442', 'Ngọc Trường', '0909555666', NULL, 'Thành phố Đà Nẵng', 'Tỉnh Vĩnh Phúc, Thành phố Phúc Yên, Phường Xuân Hoà', 2.30, 95000.00, 0.00, 'COD', 'pending', NULL, '2025-11-05 20:12:07', '2025-11-05 20:12:07', NULL, NULL, NULL, NULL),
(164, 'SP587149', 9, 'Hoài Bảo', '0905886442', 'Viết Ngọc', '0909555999', NULL, 'Thành phố Đà Nẵng, Quận Hải Châu, Phường Thạch Thang', 'Thành phố Đà Nẵng, Quận Thanh Khê, Phường Thanh Khê Đông', 4.90, 80000.00, 0.00, 'COD', 'assigned', NULL, '2025-11-05 20:13:07', '2025-11-19 12:40:19', NULL, NULL, NULL, NULL),
(165, 'SP940462', 9, 'Phạm Huy 3', '0909123452', 'Phạm Thị Hoa', '0905050505', NULL, 'Tỉnh Bắc Kạn, Huyện Ngân Sơn, Xã Cốc Đán', 'Thành phố Đà Nẵng, Quận Liên Chiểu, Phường Hòa Hiệp Nam', 2.30, 95000.00, 0.00, 'COD', 'delivering', NULL, '2025-11-05 20:19:00', '2025-11-18 08:58:05', NULL, NULL, NULL, NULL),
(169, 'SP605600', 9, 'Test Shipment', '0123456789', 'Viết Ngọc', '0987654321', NULL, 'Thành phố Đà Nẵng, Quận Sơn Trà, Phường Mân Thái', 'Thành phố Đà Nẵng, Quận Liên Chiểu, Phường Hòa Hiệp Bắc', 4.60, 90000.00, 0.00, 'COD', 'assigned', NULL, '2025-11-19 06:26:45', '2025-11-19 12:40:22', NULL, NULL, NULL, NULL),
(170, 'SP071579', 9, 'Phạm Huy 3', '0123456998', 'Sang Tấn', '0909555999', NULL, 'Thành phố Đà Nẵng, Quận Liên Chiểu, Phường Hòa Khánh Bắc', 'Tỉnh Bắc Ninh, Thành phố Bắc Ninh, Phường Hạp Lĩnh', 9.00, 120000.00, 0.00, 'COD', 'picking', NULL, '2025-11-19 08:14:31', '2025-11-19 12:38:17', NULL, NULL, NULL, NULL),
(171, 'SP902469', 9, 'Viet Ngoc', '0909333111', 'Trần Văn Cường', '0909666777', NULL, 'Tỉnh Hà Giang, Huyện Mèo Vạc, Xã Pả Vi', 'Tỉnh Vĩnh Phúc, Huyện Sông Lô, Xã Đức Bác', 4.60, 80000.00, 0.00, 'COD', 'picking', NULL, '2025-11-19 08:28:22', '2025-11-19 12:37:43', NULL, NULL, NULL, NULL),
(173, 'SP286747', NULL, 'Trường Test Đơn ', '0123456789', 'Truong Ngoc', '0987654321', NULL, 'Nguyễn Như Hạnh', 'Nguyễn Huy Tưởng', 4.60, 90000.00, 0.00, 'COD', 'delivering', NULL, '2025-11-20 02:04:46', '2025-11-20 08:58:27', NULL, NULL, NULL, NULL),
(174, 'SP308518', 9, 'NgocTruongTestCash', '0987654321', 'Bảo Minh', '0909555777', NULL, 'Thành phố Đà Nẵng, Quận Sơn Trà, Phường Thọ Quang', 'Thành phố Đà Nẵng, Quận Liên Chiểu, Phường Hòa Minh', 4.60, 1200000.00, 0.00, 'COD', 'assigned', NULL, '2025-11-20 08:45:08', '2025-11-20 08:52:16', NULL, NULL, NULL, NULL),
(175, 'SP413159', 9, 'Kiến quốc', '0123456789', 'Bảo Minh', 'adsadasdsa', NULL, 'Thành phố Đà Nẵng, Quận Liên Chiểu, Phường Hòa Minh', 'Thành phố Đà Nẵng, Quận Thanh Khê, Phường Xuân Hà', 4.90, 90000.00, 0.00, 'COD', 'pending', NULL, '2025-11-25 08:30:13', '2025-11-25 08:30:13', NULL, NULL, NULL, NULL),
(176, 'SP475219', 9, 'Nguyễn Thị Mai', '0123456998', 'Viết Ngọc', '0909555666', NULL, 'Tỉnh Hà Giang, Huyện Đồng Văn, Thị trấn Đồng Văn', 'Tỉnh Bắc Giang, Thành phố Bắc Giang, Phường Song Khê', 10.00, 90000.00, 0.00, 'COD', 'pending', NULL, '2025-11-25 08:31:15', '2025-11-25 08:31:15', NULL, NULL, NULL, NULL),
(177, 'SP559296', 9, 'Phạm Huy 3', '0123456998', 'Trần Văn Cường', '09050600060', NULL, 'Thành phố Hà Nội, Quận Tây Hồ, Phường Tứ Liên', 'Tỉnh Bắc Kạn, Huyện Pác Nặm, Xã Giáo Hiệu', 120.00, 90000.00, 0.00, 'COD', 'pending', NULL, '2025-11-25 08:32:39', '2025-11-25 08:32:39', NULL, NULL, NULL, NULL),
(178, 'SP624061', 9, 'Lê Văn Long 22', '0909123456', 'Trần Văn Cường', '09050600060', NULL, 'Tỉnh Cao Bằng, Huyện Hà Quảng, Xã Đa Thông', 'Tỉnh Thái Nguyên, Thành phố Sông Công, Phường Mỏ Chè', 9.00, 90000.00, 0.00, 'COD', 'pending', NULL, '2025-11-25 08:33:44', '2025-11-25 08:33:44', NULL, NULL, NULL, NULL),
(179, 'SP697510', 9, 'Phạm Huy 3', '0909123456', 'Trần Văn Cường', 'bjnhnhjm', NULL, 'Tỉnh Cao Bằng, Huyện Bảo Lạc, Xã Thượng Hà', 'Tỉnh Vĩnh Phúc, Thành phố Vĩnh Yên, Phường Liên Bảo', 4.60, 90000.00, 0.00, 'COD', 'pending', NULL, '2025-11-25 08:34:57', '2025-11-25 08:34:57', NULL, NULL, NULL, NULL),
(180, 'SP758298', 9, 'Nguyễn Thị Mai', '0909123456', 'Trần Văn Cường', '09050600060', NULL, 'Thành phố Hà Nội, Quận Ba Đình, Phường Cống Vị', 'Tỉnh Hải Dương, Huyện Thanh Miện, Xã Chi Lăng Nam', 4.60, 900000.00, 0.00, 'COD', 'pending', NULL, '2025-11-25 08:35:58', '2025-11-25 08:35:58', NULL, NULL, NULL, NULL),
(181, 'SP818565', 9, 'Phạm Huy 3', '0123456998', 'Trần Văn Cường', '09050600060', NULL, 'Thành phố Hà Nội, Quận Tây Hồ, Phường Tứ Liên', 'Tỉnh Vĩnh Phúc, Thành phố Vĩnh Yên, Phường Hội Hợp', 120.00, 80000.00, 0.00, 'COD', 'pending', NULL, '2025-11-25 08:36:58', '2025-11-25 08:36:58', NULL, NULL, NULL, NULL),
(182, 'SP863330', 9, 'Phạm Huy 3', '0909234567', 'Viết Ngọc', '09050600060', NULL, 'Tỉnh Hà Giang, Huyện Đồng Văn, Thị trấn Đồng Văn', 'Tỉnh Bắc Ninh, Huyện Yên Phong, Xã Đông Thọ', 10.00, 99999999.00, 0.00, 'COD', 'picking', NULL, '2025-11-25 08:37:43', '2025-11-25 08:48:51', NULL, NULL, NULL, NULL),
(183, 'SP899952', 9, 'Phạm Huy 3', '0123456998', 'Viết Ngọc', '0909555666', NULL, 'Tỉnh Hà Giang, Huyện Đồng Văn, Xã Má Lé', 'Tỉnh Bắc Giang, Huyện Yên Thế, Thị trấn Phồn Xương', 4.60, 90000.00, 0.00, 'COD', 'assigned', NULL, '2025-11-25 08:38:19', '2025-11-25 08:47:44', NULL, NULL, NULL, NULL),
(184, 'SP876715', 9, 'Minh', '0213456789', 'Phạm Thị Hoa', '0909555999', NULL, 'Tỉnh Bắc Kạn, Huyện Pác Nặm, Xã Công Bằng', 'Tỉnh Phú Thọ, Huyện Hạ Hoà, Xã Lang Sơn', 5.20, 90000.00, 0.00, 'COD', 'pending', NULL, '2025-11-25 08:54:36', '2025-11-25 08:54:36', NULL, NULL, NULL, NULL),
(185, 'SP225729', 9, 'Phạm Huy 3', '0909123456', 'Trần Văn Cường', 'adgdsuadis', NULL, 'Thành phố Hà Nội, Quận Tây Hồ, Phường Tứ Liên', 'Tỉnh Bắc Ninh, Thành phố Bắc Ninh, Phường Nam Sơn', 2.30, 90000.00, 0.00, 'COD', 'pending', NULL, '2025-11-25 09:17:05', '2025-11-25 09:17:05', NULL, NULL, NULL, NULL),
(186, 'SP288922', 9, 'Phạm Huy 3', '0909123456', 'Trần Văn Cường', '0909555999', NULL, 'Thành phố Hà Nội, Quận Hoàn Kiếm, Phường Đồng Xuân', 'Tỉnh Vĩnh Phúc, Thành phố Vĩnh Yên, Phường Tích Sơn', 50.00, 120000.00, 0.00, 'COD', 'pending', NULL, '2025-11-25 09:18:08', '2025-11-25 09:18:08', NULL, NULL, NULL, NULL),
(187, 'SP369690', 9, 'Phạm Huy 3', '0123456998', 'Trần Văn Cường', '09050600060', NULL, 'Tỉnh Cao Bằng, Huyện Bảo Lâm, Xã Lý Bôn', 'Tỉnh Phú Thọ, Huyện Lâm Thao, Xã Cao Xá', 120.00, 4500000.00, 0.00, 'COD', 'delivering', NULL, '2025-11-25 09:19:29', '2025-11-25 09:33:17', NULL, NULL, NULL, NULL),
(188, 'SP440275', 9, 'Nguyễn Thị Mai', '0909333111', 'Viết Ngọc', '0909555999', NULL, 'Tỉnh Hà Giang, Huyện Đồng Văn, Xã Lũng Cú', 'Tỉnh Vĩnh Phúc, Thành phố Phúc Yên, Phường Hai Bà Trưng', 2.50, 120000.00, 0.00, 'COD', 'picking', NULL, '2025-11-25 09:20:40', '2025-11-25 09:26:31', NULL, NULL, NULL, NULL),
(190, 'SP142536', NULL, 'Nguyễn Thị Mai', '0909234567', 'Diễm Trang', '0909555999', NULL, '321 Hai Bà Trưng, Q2', '45 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng', 5.20, 900000.00, 0.00, 'COD', 'pending', 'Hà Nội', '2025-11-25 09:32:22', '2025-11-25 09:32:48', NULL, NULL, NULL, NULL),
(191, 'SP660744', 9, 'Nguyễn Thị Mai', '0123456998', 'Trần Văn Cường', '0909555999', NULL, 'Thành phố Hà Nội, Huyện Sóc Sơn, Xã Tân Dân', 'Tỉnh Lạng Sơn, Huyện Lộc Bình, Xã Tam Gia', 5.20, 90000.00, 0.00, 'COD', 'assigned', NULL, '2025-11-25 09:41:00', '2025-11-26 04:21:51', NULL, NULL, NULL, NULL),
(192, 'SP700186', 9, 'Phạm Huy 3', '0909123456', 'Ngọc Trường', '09050600060', NULL, 'Tỉnh Lạng Sơn, Huyện Tràng Định, Xã Đào Viên', 'Tỉnh Quảng Ninh, Huyện Hải Hà, Xã Quảng Chính', 5.20, 900000.00, 0.00, 'COD', 'pending', NULL, '2025-11-25 09:41:40', '2025-11-25 09:41:40', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `system_configs`
--

CREATE TABLE `system_configs` (
  `id` int NOT NULL,
  `k` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `v` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `system_configs`
--

INSERT INTO `system_configs` (`id`, `k`, `v`, `updated_at`) VALUES
(1, 'site_name', 'SpeedyShip Logistics', '2025-10-20 08:43:49'),
(2, 'support_email', 'support@speedyship.vn', '2025-10-20 08:43:49'),
(3, 'payment_gateway', 'VNPAY', '2025-10-20 08:43:49'),
(4, 'api_key', 'sk_test_abc123xyz', '2025-10-20 08:43:49');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('admin','dispatcher','driver','customer') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'customer',
  `status` enum('active','inactive') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `role_id` int DEFAULT '4'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `role`, `status`, `created_at`, `role_id`) VALUES
(4, 'Khách hàng A', 'customer1@speedyship.vn', '$2a$10$8C7Vi.f8b6zO/xwT0y8TpeLDx4IQmfxmE1fpcpXcwzEw4NqYEqO9W', '0909333333', 'customer', 'inactive', '2025-10-20 08:43:49', 4),
(5, 'Khách hàng B', 'customer2@speedyship.vn', '$2a$10$8C7Vi.f8b6zO/xwT0y8TpeLDx4IQmfxmE1fpcpXcwzEw4NqYEqO9W', '0909444444', 'customer', 'active', '2025-10-20 08:43:49', 4),
(6, 'Nguyễn Văn Test', 'test@speedyship.vn', '$2a$10$noFvOlG15xGqKXLMD2gewuvK.daNz97JmvafC0Baag7tQoYDC8h3y', '0909888777', 'dispatcher', 'active', '2025-10-20 09:07:16', 4),
(7, 'Admin', 'admin2@speedyship.vn', '$2a$10$JrzpIDRcrjB2XrQYMvBUsejZH0PSvVIb.XG2SAmUVrT4d7PEgWj32', '232312321', 'admin', 'active', '2025-10-20 09:09:39', 1),
(8, 'truong ne', 'driver@speedyship.vn', '$2a$10$QnZNG0DoiejyhP.MNSwksutooWaeMtvjO5cR18Ro97rKHW25MNwUW', '932193219', 'driver', 'active', '2025-10-20 09:25:58', 4),
(9, 'truong dep trai', 'truongkh@speedyship.vn', '$2a$10$lb3jbM4T9MRwsLeStfFj.OCt7CY0.8oGAFS3okwacT77wHu.jOxLW', '0363337081', 'customer', 'active', '2025-10-20 12:58:19', 4),
(10, 'truong dieu phoi', 'dieuphoi@speedyship.vn', '$2a$10$4itCINWHQ1M1Uu6a1gOTDOjz6a9X2L0kpfzkr8TZOrAxs0eHHjEYC', '0363337081', 'dispatcher', 'active', '2025-10-20 13:25:40', 4),
(11, 'Nguyễn Văn A', 'driver1@gmail.com', '123456', '0909123456', 'driver', 'active', '2025-10-20 13:49:37', 4),
(12, 'Trần Văn B', 'driver2@gmail.com', '123456', '0909988776', 'driver', 'active', '2025-10-20 13:49:37', 4),
(13, 'truong khach hang 2', 'kh2@speedyship.vn', '$2a$10$IqNKaY2seeSoKVJhIQSCMODnGNMRSEAZJ7EDoMYrSq5p3kU8UJMwa', '0363337081', 'customer', 'active', '2025-10-21 06:53:25', 4),
(14, 'baominh', 'baominh@speedyship.vn', '$2a$10$254H.EsGI7./ZvXznWagbeI8D9AktW4doQDw3ycArQGloRZFFwq16', '0987123456', 'driver', 'active', '2025-10-23 04:45:30', 3),
(15, 'Nguyen Van A', 'a@example.com', '$2a$10$SSv0RwBdV.WPrCN2E27slejtxmyytOgdL732sFmjXej.WL9uM6CNS', '0363337081', 'customer', 'active', '2025-10-23 15:02:12', 4),
(16, 'Ngoc Truong', 'truongdubaix107@gmail.com', '$2a$10$rg3ewnkUdBAqSkjnAfZtx.TMNEIf.sI42yEjutmnGrhWy.YrzWYF.', '0909999999', 'customer', 'active', '2025-10-29 06:42:20', 4),
(18, 'Driver 1', 'driver1@test.com', '$2a$10$IxWbKu1S6fGQF2jTdBoN2u38OhtfM9YsFmSi/bcmWHOav6yeM6DDu', '0901000001', 'customer', 'active', '2025-11-06 08:54:41', 4),
(19, 'Driver 2', 'driver2@test.com', '$2a$10$kTt.GLqWH7SG4kzzTMlPROu..cLYg77V8eDeXxg/R86pmsPNFaAQW', '0901000002', 'customer', 'active', '2025-11-06 08:54:49', 4),
(20, 'Driver 4', 'driver4@test.com', '$2a$10$j57dVcenFv95HnqUlYZhV./8LYlraEGaM9Mce5iuOJfToR0yNCMS6', '0901000004', 'customer', 'active', '2025-11-06 08:54:54', 4),
(21, 'Driver 5', 'driver5@test.com', '$2a$10$l.uKzhRTXepbrmd.hAxQ6ewY75w2AwXSvJBIwlXfNe1PBSRjlnWwS', '0901000005', 'customer', 'active', '2025-11-06 08:55:04', 4),
(22, 'Driver 6', 'driver6@test.com', '$2a$10$7sJSnggs6hjwbrC0WaWSYefSVUfrqPZwefmUghr0xfjbYx5V3iwi6', '0901000006', 'customer', 'active', '2025-11-06 08:55:09', 4),
(23, 'Driver 7', 'driver7@test.com', '$2a$10$2M6xs1e9lz7/HqBndbzkYObd6nfHUXWFwP6qfRI3VVx2JM3BcrupW', '0901000007', 'customer', 'active', '2025-11-06 08:55:16', 4),
(24, 'Driver 8', 'driver8@test.com', '$2a$10$gPlICALZINJTvw7IpN0tZezEPiG/3QXEWUQtIH827jOHvhp46P6Ei', '0901000008', 'customer', 'active', '2025-11-06 08:55:22', 4),
(25, 'Driver 9', 'driver9@test.com', '$2a$10$2DCbAju.PQe/WkUClK9xeu6/hKS0PoY6lTRKEjRzYxqLGovwX1GHW', '0901000009', 'customer', 'active', '2025-11-06 08:55:26', 4),
(26, 'Driver 10', 'driver10@test.com', '$2a$10$6BOzQB.ABthScSqKgIH5F.dazOI5KKXCmiuQ5y35Je4fEvrCUbU4O', '0901000010', 'customer', 'active', '2025-11-06 08:55:34', 4),
(27, 'TruongQTV', 'adminQTV@speedyship.vn', '$2a$10$9GzGXtfudDJFKwecwgFjxuKzlxslHSwZ9D8wFqK3fkqrzOQkmKpDG', '0901000099', 'customer', 'active', '2025-11-06 08:59:38', 4),
(34, 'Bảo Minh ', 'truongdubaix@gmail.com', '$2b$10$dHjViYBteM3z2MGChEWS7O1UvTSh.m7K0.c4iqQXGpHa4AD6kjAaO', NULL, 'driver', 'active', '2025-11-06 09:43:19', 4),
(35, 'Ngoc Truong', 'truongdubai107@gmail.com', '$2b$10$SE4ivpMs2VOsdZ3D3QgyVuQQtAoNxMFOiABMmjGeKGLHlCcTyI35y', NULL, 'driver', 'inactive', '2025-11-07 07:31:46', 4),
(42, 'Hồ Quốc Khanh', 'khanh12b3cv@gmail.com', '$2a$10$2WcfQ7nuKC7nnCuadClPN.UT.Nxd/bTRMTtssoiLkepfA0mW0nk2W', '0123456787', 'customer', 'inactive', '2025-11-26 04:48:12', 4);

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `user_id` int NOT NULL,
  `role_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES
(7, 1),
(27, 1),
(10, 2),
(8, 3),
(11, 3),
(12, 3),
(14, 3),
(15, 3),
(18, 3),
(19, 3),
(20, 3),
(21, 3),
(22, 3),
(23, 3),
(24, 3),
(25, 3),
(26, 3),
(34, 3),
(35, 3),
(4, 4),
(5, 4),
(6, 4),
(9, 4),
(13, 4),
(16, 4),
(42, 4);

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int NOT NULL,
  `plate_no` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `capacity_kg` int DEFAULT NULL,
  `driver_id` int DEFAULT NULL,
  `status` enum('available','maintenance','busy') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'available'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `plate_no`, `type`, `capacity_kg`, `driver_id`, `status`) VALUES
(1, '79A-123.45', 'truck', 1500, NULL, 'available'),
(2, '51B-999.99', 'truck', 2000, NULL, 'maintenance'),
(3, '92K1 - 44444', 'SH', 150, 32, 'available'),
(4, '43G1  - 88888', 'AB', 150, 33, 'available'),
(5, '92K1 - 01430', 'Bike', 150, 37, 'available');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assignments`
--
ALTER TABLE `assignments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shipment_id` (`shipment_id`),
  ADD KEY `driver_id` (`driver_id`);

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assigned_to` (`assigned_to`);

--
-- Indexes for table `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `fk_driver_vehicle` (`vehicle_id`);

--
-- Indexes for table `driver_applications`
--
ALTER TABLE `driver_applications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `shipment_id` (`shipment_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chat_id` (`chat_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_notif_driver` (`receiver_id`),
  ADD KEY `fk_notif_shipment` (`shipment_id`);

--
-- Indexes for table `otp_codes`
--
ALTER TABLE `otp_codes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_payment_shipment` (`shipment_id`),
  ADD KEY `fk_payment_customer` (`customer_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `shipments`
--
ALTER TABLE `shipments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tracking_code` (`tracking_code`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `system_configs`
--
ALTER TABLE `system_configs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `k` (`k`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_role` (`role_id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `plate_no` (`plate_no`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assignments`
--
ALTER TABLE `assignments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `drivers`
--
ALTER TABLE `drivers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `driver_applications`
--
ALTER TABLE `driver_applications`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `feedbacks`
--
ALTER TABLE `feedbacks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=213;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `otp_codes`
--
ALTER TABLE `otp_codes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `shipments`
--
ALTER TABLE `shipments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=193;

--
-- AUTO_INCREMENT for table `system_configs`
--
ALTER TABLE `system_configs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assignments`
--
ALTER TABLE `assignments`
  ADD CONSTRAINT `assignments_ibfk_1` FOREIGN KEY (`shipment_id`) REFERENCES `shipments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `assignments_ibfk_2` FOREIGN KEY (`driver_id`) REFERENCES `drivers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `chats`
--
ALTER TABLE `chats`
  ADD CONSTRAINT `chats_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `contacts`
--
ALTER TABLE `contacts`
  ADD CONSTRAINT `contacts_ibfk_1` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `drivers`
--
ALTER TABLE `drivers`
  ADD CONSTRAINT `drivers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_driver_vehicle` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD CONSTRAINT `feedbacks_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `feedbacks_ibfk_2` FOREIGN KEY (`shipment_id`) REFERENCES `shipments` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`chat_id`) REFERENCES `chats` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `fk_notif_shipment` FOREIGN KEY (`shipment_id`) REFERENCES `shipments` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `fk_payment_customer` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_payment_shipment` FOREIGN KEY (`shipment_id`) REFERENCES `shipments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `shipments`
--
ALTER TABLE `shipments`
  ADD CONSTRAINT `shipments_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
