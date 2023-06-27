


-- Create Products table
CREATE TABLE Products (
    product_id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(500),
    price DECIMAL(10,2),
    quantity_available INT,
    category_name VARCHAR(100),
    brand VARCHAR(100),
    image_path VARCHAR(255)
);

-- Create Orders table
CREATE TABLE Orders (
    order_id INT IDENTITY(1,1) PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    total_amount DECIMAL(10,2),
    payment_id INT,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    FOREIGN KEY (payment_id) REFERENCES Payments(payment_id)
);

-- Create Customers table
CREATE TABLE Customers (
    customer_id INT IDENTITY(1,1) PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone_number VARCHAR(100),
    email VARCHAR(255),
);

-- Create Payments table
CREATE TABLE Payments (
    payment_id INT IDENTITY(1,1) PRIMARY KEY,
    customer_id INT,
    payment_date DATE,
    payment_method VARCHAR(100),
    amount_paid DECIMAL(10,2),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

-- Create Order Items table
CREATE TABLE OrderItems (
    order_item_id INT IDENTITY(1,1) PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    price DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

--insert 
-- Insert data into Products table
INSERT INTO Products (name, description, price, quantity_available, category_name, brand, image_path)
VALUES ('Product 1', 'Description of Product 1', 10.99, 100, 'Category A', 'Brand X', 'path/to/image1.jpg');

INSERT INTO Products (name, description, price, quantity_available, category_name, brand, image_path)
VALUES ('Product 2', 'Description of Product 2', 19.99, 50, 'Category B', 'Brand Y', 'path/to/image2.jpg');

-- Insert data into Customers table
INSERT INTO Customers (first_name, last_name, phone_number, email, address, town, state, county, postal_code)
VALUES ('John', 'Doe', '123456789', 'john@example.com', '123 Main St', 'Cityville', 'State A', 'County X', '12345');

INSERT INTO Customers (first_name, last_name, phone_number, email, address, town, state, county, postal_code)
VALUES ('Jane', 'Smith', '987654321', 'jane@example.com', '456 Elm St', 'Townville', 'State B', 'County Y', '56789');

-- Insert data into Payments table
INSERT INTO Payments (customer_id, payment_date, payment_method, amount_paid)
VALUES (1, '2023-06-20', 'Credit Card', 50.00);

INSERT INTO Payments (customer_id, payment_date, payment_method, amount_paid)
VALUES (2, '2023-06-21', 'PayPal', 75.50);

-- Insert data into Orders table
INSERT INTO Orders (customer_id, order_date, total_amount, payment_id)
VALUES (1, '2023-06-20', 50.00, 1);

INSERT INTO Orders (customer_id, order_date, total_amount, payment_id)
VALUES ( '2023-06-21', 75.50, 2);

-- Insert data into OrderItems table
INSERT INTO OrderItems (order_id, product_id, quantity, price)
VALUES (1, 1, 2, 20.00);

INSERT INTO OrderItems (order_id, product_id, quantity, price)
VALUES (1, 2, 1, 19.99);

INSERT INTO OrderItems (order_id, product_id, quantity, price)
VALUES (2, 2, 3, 19.99);

select * from Customers