-- phpMyAdmin SQL Dump
-- version 6.0.0-dev+20251017.e515ecd108
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 20, 2025 at 02:11 PM
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
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `drivers`
--

INSERT INTO `drivers` (`id`, `name`, `email`, `phone`, `license_no`, `vehicle_type`, `status`, `user_id`, `created_at`) VALUES
(1, 'Tài xế A', 'driver1@speedyship.vn', '0909222222', '79A-123.45', 'Xe tải 1.5T', 'available', 3, '2025-10-20 14:02:02'),
(2, 'Admin', 'admin@speedyship.vn', '0909000000', '79A-12345', 'Xe máy', 'delivering', 1, '2025-10-20 14:02:02'),
(3, 'Điều phối viên', 'dispatcher@speedyship.vn', '0909111111', '51B-67890', 'Xe tải lớn', 'inactive', 2, '2025-10-20 14:02:02'),
(4, 'Truong tai xe', 'truongtaixe@speedyship.vn', '0123456789', '92B-67891', 'Xe SH', 'available', NULL, '2025-10-20 14:08:19');

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
  `method` enum('vnpay','momo','cod') COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  `currency` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT 'VND',
  `status` enum('pending','paid','failed','refunded') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `txn_ref` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paid_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `shipment_id`, `method`, `amount`, `currency`, `status`, `txn_ref`, `paid_at`) VALUES
(2, 2, 'cod', 90000.00, 'VND', 'paid', 'COD456', '2025-10-18 09:00:00');

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
  `status` enum('pending','assigned','picking','delivering','delivered','failed','canceled') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `current_location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `shipments`
--

INSERT INTO `shipments` (`id`, `tracking_code`, `customer_id`, `sender_name`, `sender_phone`, `receiver_name`, `receiver_phone`, `pickup_address`, `delivery_address`, `weight_kg`, `cod_amount`, `status`, `current_location`, `created_at`, `updated_at`) VALUES
(2, 'SP1002', 5, 'Khách hàng B', '0909444444', 'Phạm Bình', '0909666666', '789 Điện Biên Phủ, Q3', '23 Nguyễn Trãi, Q5', 3.20, 90000.00, 'delivering', 'Q5 - HCM', '2025-10-20 08:43:49', '2025-10-20 13:37:55'),
(3, 'SP1003', 6, 'Lê Văn C', '0909777777', 'Ngô Bình', '0909888888', '15 Nguyễn Huệ, Q1, HCM', '89 Trần Hưng Đạo, Q5, HCM', 4.30, 150000.00, 'failed', 'Kho Q1', '2025-10-20 13:09:32', '2025-10-20 13:29:30'),
(4, 'SP1004', 5, 'Phạm Huy 2', '0909333111', 'Bùi Trang', '0909555999', '321 Hai Bà Trưng, Q3', '789 Lê Văn Sỹ, Q10', 2.20, 80000.00, 'delivering', 'Q3 - HCM', '2025-10-20 13:09:32', '2025-10-20 13:24:00'),
(5, 'SP1005', 4, 'Nguyễn Hà', '0909333222', 'Trần Bình', '0909444111', '14 Võ Văn Kiệt, Q1', '99 Nguyễn Thị Minh Khai, Q3', 6.00, 170000.00, 'delivered', 'Q3 - HCM', '2025-10-20 13:09:32', '2025-10-20 13:09:32'),
(6, 'SP1007', NULL, 'Phạm Huy 3', '0909333111', 'Diễm Trang', '0909555999', '321 Hai Bà Trưng, Q2', '789 Lê Văn Sỹ, Q11', 4.60, 90000.00, 'delivering', 'Q3 - HCM', '2025-10-20 13:33:25', '2025-10-20 13:38:01');

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
  `status` tinyint DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `status`, `created_at`) VALUES
(1, 'Admin', 'admin@speedyship.vn', '$2a$10$8C7Vi.f8b6zO/xwT0y8TpeLDx4IQmfxmE1fpcpXcwzEw4NqYEqO9W', '0909000000', 1, '2025-10-20 08:43:49'),
(2, 'Điều phối viên', 'dispatcher@speedyship.vn', '$2a$10$8C7Vi.f8b6zO/xwT0y8TpeLDx4IQmfxmE1fpcpXcwzEw4NqYEqO9W', '0909111111', 1, '2025-10-20 08:43:49'),
(3, 'Tài xế A', 'driver1@speedyship.vn', '$2a$10$8C7Vi.f8b6zO/xwT0y8TpeLDx4IQmfxmE1fpcpXcwzEw4NqYEqO9W', '0909222222', 1, '2025-10-20 08:43:49'),
(4, 'Khách hàng A', 'customer1@speedyship.vn', '$2a$10$8C7Vi.f8b6zO/xwT0y8TpeLDx4IQmfxmE1fpcpXcwzEw4NqYEqO9W', '0909333333', 1, '2025-10-20 08:43:49'),
(5, 'Khách hàng B', 'customer2@speedyship.vn', '$2a$10$8C7Vi.f8b6zO/xwT0y8TpeLDx4IQmfxmE1fpcpXcwzEw4NqYEqO9W', '0909444444', 1, '2025-10-20 08:43:49'),
(6, 'Nguyễn Văn Test', 'test@speedyship.vn', '$2a$10$noFvOlG15xGqKXLMD2gewuvK.daNz97JmvafC0Baag7tQoYDC8h3y', '0909888777', 1, '2025-10-20 09:07:16'),
(7, 'Admin', 'admin2@speedyship.vn', '$2a$10$JrzpIDRcrjB2XrQYMvBUsejZH0PSvVIb.XG2SAmUVrT4d7PEgWj32', '232312321', 1, '2025-10-20 09:09:39'),
(8, 'truong ne', 'driver@speedyship.vn', '$2a$10$QnZNG0DoiejyhP.MNSwksutooWaeMtvjO5cR18Ro97rKHW25MNwUW', '932193219', 1, '2025-10-20 09:25:58'),
(9, 'truong khach hang', 'truongkh@speedyship.vn', '$2a$10$lb3jbM4T9MRwsLeStfFj.OCt7CY0.8oGAFS3okwacT77wHu.jOxLW', '0363337081', 1, '2025-10-20 12:58:19'),
(10, 'truong dieu phoi', 'dieuphoi@speedyship.vn', '$2a$10$4itCINWHQ1M1Uu6a1gOTDOjz6a9X2L0kpfzkr8TZOrAxs0eHHjEYC', '0363337081', 1, '2025-10-20 13:25:40'),
(11, 'Nguyễn Văn A', 'driver1@gmail.com', '123456', '0909123456', 1, '2025-10-20 13:49:37'),
(12, 'Trần Văn B', 'driver2@gmail.com', '123456', '0909988776', 1, '2025-10-20 13:49:37');

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
(1, 1),
(7, 1),
(2, 2),
(10, 2),
(3, 3),
(8, 3),
(4, 4),
(5, 4),
(6, 4),
(9, 4);

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
  ADD KEY `shipment_id` (`shipment_id`);

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
  ADD UNIQUE KEY `email` (`email`);

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
-- AUTO_INCREMENT for table `drivers`
--
ALTER TABLE `drivers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `feedbacks`
--
ALTER TABLE `feedbacks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `shipments`
--
ALTER TABLE `shipments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

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
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`shipment_id`) REFERENCES `shipments` (`id`) ON DELETE CASCADE;

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
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
