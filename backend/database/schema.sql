-- Smart Warehouse Layout & Order Picking Optimization System Schema

CREATE DATABASE IF NOT EXISTS smart_warehouse_db;
USE smart_warehouse_db;

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    weight_kg DECIMAL(8, 2) DEFAULT 0.00,
    demand_frequency INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Warehouse Shelves Table
CREATE TABLE IF NOT EXISTS shelves (
    id INT AUTO_INCREMENT PRIMARY KEY,
    shelf_code VARCHAR(50) NOT NULL UNIQUE,
    zone VARCHAR(50),
    x_coord INT NOT NULL,
    y_coord INT NOT NULL,
    capacity INT DEFAULT 100,
    current_load INT DEFAULT 0
);

-- Shelf Product Mapping Table
CREATE TABLE IF NOT EXISTS shelf_inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    shelf_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 0,
    FOREIGN KEY (shelf_id) REFERENCES shelves(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_code VARCHAR(50) NOT NULL UNIQUE,
    status ENUM('pending', 'picking', 'completed', 'cancelled') DEFAULT 'pending',
    priority INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
