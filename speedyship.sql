-- phpMyAdmin SQL Dump
-- version 6.0.0-dev+20251017.e515ecd108
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 23, 2025 at 06:04 AM
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
  `status` enum('assigned','picking','delivering','completed','failed') COLLATE utf8mb4_unicode_ci DEFAULT 'assigned'
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
(16, 26, 1, '2025-10-22 12:55:07', 'delivering'),
(17, 25, 5, '2025-10-22 12:55:21', 'completed'),
(18, 24, 1, '2025-10-22 16:23:45', 'completed'),
(19, 27, 1, '2025-10-22 16:31:35', 'completed');

-- --------------------------------------------------------

--
-- Table structure for table `drivers`
--

CREATE TABLE `drivers` (
  `id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `license_no` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vehicle_type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('available','delivering','inactive') COLLATE utf8mb4_unicode_ci DEFAULT 'available',
  `user_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `latitude` decimal(10,6) DEFAULT '10.762622',
  `longitude` decimal(10,6) DEFAULT '106.660172'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `drivers`
--

INSERT INTO `drivers` (`id`, `name`, `email`, `phone`, `license_no`, `vehicle_type`, `status`, `user_id`, `created_at`, `latitude`, `longitude`) VALUES
(1, 'Tài xế A', 'driver1@speedyship.vn', '0909222222', '79A-123.45', 'Xe tải 1.5T', 'delivering', NULL, '2025-10-20 14:02:02', 10.762622, 106.660172),
(3, 'Điều phối viên', 'dispatcher@speedyship.vn', '0909111111', '51B-67890', 'Xe tải lớn', 'available', NULL, '2025-10-20 14:02:02', 21.028511, 105.804817),
(4, 'Truong tai xe', 'truongtaixe@speedyship.vn', '0123456789', '92B-67891', 'Xe SH', 'available', NULL, '2025-10-20 14:08:19', NULL, NULL),
(5, 'Nguyễn Văn A', 'driverA@speedyship.vn', '0909123456', '79A-12345', 'Xe tải nhỏ', 'available', 4, '2025-10-21 04:39:26', NULL, NULL),
(6, 'Trần Văn B', 'driverB@speedyship.vn', '0909234567', '51B-56789', 'Xe máy', 'available', 5, '2025-10-21 04:39:26', NULL, NULL),
(7, 'Lê Văn C', 'driverC@speedyship.vn', '0909345678', '30B-34567', 'Xe tải lớn', 'available', 6, '2025-10-21 04:39:26', NULL, NULL),
(8, 'Phạm Văn D', 'driverD@speedyship.vn', '0909456789', '60B-98765', 'Xe bán tải', 'available', 7, '2025-10-21 04:39:26', NULL, NULL),
(9, 'Hoàng Văn E', 'driverE@speedyship.vn', '0909567890', '43C-11111', 'Xe tải 1.5T', 'available', 8, '2025-10-21 04:39:26', NULL, NULL),
(10, 'Ngô Văn F', 'driverF@speedyship.vn', '0909678901', '81D-55555', 'Xe máy', 'available', 9, '2025-10-21 04:39:26', NULL, NULL),
(11, 'Đỗ Văn G', 'driverG@speedyship.vn', '0909789012', '77B-77777', 'Xe tải 2T', 'available', 10, '2025-10-21 04:39:26', NULL, NULL),
(12, 'Bùi Văn H', 'driverH@speedyship.vn', '0909890123', '88C-88888', 'Xe container', 'available', 11, '2025-10-21 04:39:26', NULL, NULL),
(13, 'Phan Văn I', 'driverI@speedyship.vn', '0909901234', '92A-99999', 'Xe máy', 'available', 12, '2025-10-21 04:39:26', NULL, NULL),
(14, 'truong ne', 'driver@speedyship.vn', '0363337081', NULL, 'SH', 'available', NULL, '2025-10-22 09:32:06', 10.762622, 106.660172);

-- --------------------------------------------------------

--
-- Table structure for table `feedbacks`
--

CREATE TABLE `feedbacks` (
  `id` int NOT NULL,
  `shipment_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `rating` tinyint DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ;

--
-- Dumping data for table `feedbacks`
--

INSERT INTO `feedbacks` (`id`, `shipment_id`, `user_id`, `rating`, `comment`, `created_at`) VALUES
(1, NULL, 4, 5, 'Dịch vụ tốt, tài xế thân thiện!', '2025-10-20 08:43:49'),
(2, 2, 5, 4, 'Hàng giao đúng giờ, đóng gói cẩn thận.', '2025-10-20 08:43:49');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int NOT NULL,
  `shipment_id` int NOT NULL,
  `customer_id` int NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  `method` enum('COD','BankTransfer','Momo') COLLATE utf8mb4_unicode_ci DEFAULT 'COD',
  `status` enum('pending','completed','failed') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `shipment_id`, `customer_id`, `amount`, `method`, `status`, `created_at`, `updated_at`) VALUES
(9, 2, 4, 120000.00, 'COD', 'completed', '2025-10-20 17:23:09', '2025-10-20 17:23:09'),
(10, 3, 5, 90000.00, 'BankTransfer', 'pending', '2025-10-20 17:23:09', '2025-10-20 17:23:34'),
(11, 4, 6, 150000.00, 'Momo', 'completed', '2025-10-20 17:23:09', '2025-10-21 04:39:01'),
(12, 5, 11, 65000.00, 'COD', 'pending', '2025-10-20 17:23:09', '2025-10-22 06:51:44'),
(13, 6, 12, 210000.00, 'BankTransfer', 'completed', '2025-10-20 17:23:09', '2025-10-20 17:23:09');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int NOT NULL,
  `code` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
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
  `tracking_code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_id` int DEFAULT NULL,
  `sender_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sender_phone` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `receiver_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `receiver_phone` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pickup_address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `delivery_address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `weight_kg` decimal(8,2) DEFAULT NULL,
  `cod_amount` decimal(12,2) DEFAULT '0.00',
  `status` enum('pending','assigned','picking','delivering','delivered','failed','completed','canceled') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `current_location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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

INSERT INTO `shipments` (`id`, `tracking_code`, `customer_id`, `sender_name`, `sender_phone`, `receiver_name`, `receiver_phone`, `pickup_address`, `delivery_address`, `weight_kg`, `cod_amount`, `status`, `current_location`, `created_at`, `updated_at`, `pickup_lat`, `pickup_lng`, `delivery_lat`, `delivery_lng`) VALUES
(2, 'SP1002', 5, 'Khách hàng B', '0909444444', 'Phạm Bình', '0909666666', '789 Điện Biên Phủ, Q3', '23 Nguyễn Trãi, Q5', 3.20, 90000.00, 'pending', 'Q5 TPHCM', '2025-10-20 08:43:49', '2025-10-22 05:28:18', 16.054400, 108.202200, 16.463700, 107.590900),
(3, 'SP1003', 6, 'Lê Văn C', '0909777777', 'Ngô Bình', '0909888888', '15 Nguyễn Huệ, Q1, HCM', '89 Trần Hưng Đạo, Q5, HCM', 4.30, 150000.00, 'delivered', 'Kho Q1', '2025-10-20 13:09:32', '2025-10-22 06:52:45', 10.045200, 105.746900, 10.980400, 106.651900),
(4, 'SP1004', 5, 'Phạm Huy 2', '0909333111', 'Bùi Trang', '0909555999', '321 Hai Bà Trưng, Q3', '789 Lê Văn Sỹ, Q10', 2.20, 80000.00, 'delivered', 'Q3 - HCM', '2025-10-20 13:09:32', '2025-10-22 05:32:07', 21.027800, 105.834200, 20.844900, 106.688100),
(5, 'SP1005', 4, 'Nguyễn Hà', '0909333222', 'Trần Bình', '0909444111', '14 Võ Văn Kiệt, Q1', '99 Nguyễn Thị Minh Khai, Q3', 6.00, 170000.00, 'delivered', 'Q3 - HCM', '2025-10-20 13:09:32', '2025-10-21 16:26:34', 10.776900, 106.700900, 16.047100, 108.206800),
(6, 'SP1007', NULL, 'Phạm Huy 3', '0909333111', 'Diễm Trang', '0909555999', '321 Hai Bà Trưng, Q2', '789 Lê Văn Sỹ, Q11', 4.60, 90000.00, 'delivered', 'Q3 - HCM', '2025-10-20 13:33:25', '2025-10-22 05:32:10', NULL, NULL, NULL, NULL),
(17, 'SP2001', 4, 'Nguyễn Thị Mai', '0909123456', 'Trần Văn Cường', '0909555666', '123 Lê Lợi, TP.HCM', '25 Trần Hưng Đạo, Hà Nội', 5.20, 120000.00, 'delivered', 'Hà Nội', '2025-09-05 01:30:00', '2025-10-21 05:10:06', NULL, NULL, NULL, NULL),
(18, 'SP2002', 5, 'Lê Văn Long', '0909234567', 'Phạm Thị Hoa', '0909666777', '55 Nguyễn Văn Linh, Đà Nẵng', '12 Lý Thường Kiệt, Huế', 2.30, 95000.00, 'delivered', '54 Nguyễn Văn Linh', '2025-09-10 02:45:00', '2025-10-22 05:32:11', NULL, NULL, NULL, NULL),
(19, 'SP2003', 6, 'Trần Thị Ngọc', '0909345678', 'Lê Văn Thành', '0909777888', '89 Trần Quang Diệu, Cần Thơ', '88 Đại lộ Bình Dương', 8.10, 175000.00, 'delivered', 'Bình Dương', '2025-10-01 03:10:00', '2025-10-22 05:32:14', NULL, NULL, NULL, NULL),
(22, 'SP1009', NULL, 'Kim Loan', '012347594', 'Ngọc Trường', '033218412', 'Đà Nẵng', 'Quảng Nam', 4.60, 200000.00, 'pending', 'Đà Nẵng', '2025-10-21 14:28:49', '2025-10-22 05:32:48', NULL, NULL, NULL, NULL),
(23, 'SP1010', NULL, 'Ngọc Trường', '0321393213', 'Kim Loan', '0234566783', 'Quảng Nam', 'Đà Nẵng', 5.20, 900000.00, 'pending', 'Hà Nội', '2025-10-21 14:29:46', '2025-10-22 05:32:45', NULL, NULL, NULL, NULL),
(24, 'SPA001', NULL, 'Kim Loan', '0123456779', 'Ngọc Trường', '098764221', 'Đà Nẵng', 'Bình Sơn', 5.20, 90000.00, 'completed', 'Đà Nẵng', '2025-10-22 05:29:37', '2025-10-22 09:42:35', NULL, NULL, NULL, NULL),
(25, 'SPA100', NULL, 'Nguyễn Thị Mai', '0909333111', 'Diễm Trang', '0909555666', '321 Hai Bà Trưng, Q2', '25 Trần Hưng Đạo, Hà Nội', 4.60, 120000.00, 'delivered', 'Hà Nội', '2025-10-22 05:53:21', '2025-10-22 06:52:40', NULL, NULL, NULL, NULL),
(26, 'SPA200', NULL, 'Nguyễn Tấn Sang', '0132131323', 'Ngọc Trường', '0909555999', '166 Nguyễn Xí', 'K62/23 Nguyễn Huy Tưởng', 5.20, 90000.00, 'delivering', 'Kho Đà Nẵng', '2025-10-22 05:54:33', '2025-10-23 05:40:37', NULL, NULL, NULL, NULL),
(27, 'SPA101', NULL, 'Bảo Minh', '0232039992', 'Quốc Khanh', '0231131312', 'Đà Nẵng ', 'Quảng Trị', 5.20, 120000.00, 'completed', 'Đà Nẵng', '2025-10-22 08:54:47', '2025-10-22 09:51:26', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `shipment_status_logs`
--

CREATE TABLE `shipment_status_logs` (
  `id` int NOT NULL,
  `shipment_id` int NOT NULL,
  `status` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `note` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `shipment_status_logs`
--

INSERT INTO `shipment_status_logs` (`id`, `shipment_id`, `status`, `location`, `note`, `created_at`) VALUES
(3, 2, 'delivered', 'Q7', 'Đã giao thành công', '2025-10-20 08:43:49');

-- --------------------------------------------------------

--
-- Table structure for table `system_configs`
--

CREATE TABLE `system_configs` (
  `id` int NOT NULL,
  `k` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `v` text COLLATE utf8mb4_unicode_ci,
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
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('admin','dispatcher','driver','customer') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'customer',
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci DEFAULT 'active',
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
(9, 'truong khach hang', 'truongkh@speedyship.vn', '$2a$10$lb3jbM4T9MRwsLeStfFj.OCt7CY0.8oGAFS3okwacT77wHu.jOxLW', '0363337081', 'customer', 'active', '2025-10-20 12:58:19', 4),
(10, 'truong dieu phoi', 'dieuphoi@speedyship.vn', '$2a$10$4itCINWHQ1M1Uu6a1gOTDOjz6a9X2L0kpfzkr8TZOrAxs0eHHjEYC', '0363337081', 'dispatcher', 'active', '2025-10-20 13:25:40', 4),
(11, 'Nguyễn Văn A', 'driver1@gmail.com', '123456', '0909123456', 'driver', 'active', '2025-10-20 13:49:37', 4),
(12, 'Trần Văn B', 'driver2@gmail.com', '123456', '0909988776', 'driver', 'active', '2025-10-20 13:49:37', 4),
(13, 'truong khach hang 2', 'kh2@speedyship.vn', '$2a$10$IqNKaY2seeSoKVJhIQSCMODnGNMRSEAZJ7EDoMYrSq5p3kU8UJMwa', '0363337081', 'customer', 'active', '2025-10-21 06:53:25', 4),
(14, 'baominh', 'baominh@speedyship.vn', '$2a$10$254H.EsGI7./ZvXznWagbeI8D9AktW4doQDw3ycArQGloRZFFwq16', '0987123456', 'driver', 'inactive', '2025-10-23 04:45:30', 3);

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
(10, 2),
(8, 3),
(11, 3),
(12, 3),
(14, 3),
(4, 4),
(5, 4),
(6, 4),
(9, 4),
(13, 4);

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int NOT NULL,
  `plate_no` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `capacity_kg` int DEFAULT NULL,
  `status` enum('available','maintenance','busy') COLLATE utf8mb4_unicode_ci DEFAULT 'available'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `plate_no`, `type`, `capacity_kg`, `status`) VALUES
(1, '79A-123.45', 'truck', 1500, 'available'),
(2, '51B-999.99', 'truck', 2000, 'maintenance');

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
-- Indexes for table `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shipment_id` (`shipment_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shipment_id` (`shipment_id`),
  ADD KEY `customer_id` (`customer_id`);

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
-- Indexes for table `shipment_status_logs`
--
ALTER TABLE `shipment_status_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shipment_id` (`shipment_id`);

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `drivers`
--
ALTER TABLE `drivers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `feedbacks`
--
ALTER TABLE `feedbacks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `shipments`
--
ALTER TABLE `shipments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `shipment_status_logs`
--
ALTER TABLE `shipment_status_logs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `system_configs`
--
ALTER TABLE `system_configs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
-- Constraints for table `drivers`
--
ALTER TABLE `drivers`
  ADD CONSTRAINT `drivers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD CONSTRAINT `feedbacks_ibfk_1` FOREIGN KEY (`shipment_id`) REFERENCES `shipments` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `feedbacks_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`shipment_id`) REFERENCES `shipments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `shipments`
--
ALTER TABLE `shipments`
  ADD CONSTRAINT `shipments_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `shipment_status_logs`
--
ALTER TABLE `shipment_status_logs`
  ADD CONSTRAINT `shipment_status_logs_ibfk_1` FOREIGN KEY (`shipment_id`) REFERENCES `shipments` (`id`) ON DELETE CASCADE;

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
