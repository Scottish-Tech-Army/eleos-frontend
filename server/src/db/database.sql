CREATE DATABASE ppe_inventory;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE target_config
(
  target_id SERIAL PRIMARY KEY,
  description VARCHAR(50) NOT NULL
);


CREATE TABLE users
(
  user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  subdomain VARCHAR(255) NOT NULL,
  target_config_id INT REFERENCES target_config(target_id),
  admin_email VARCHAR(255) NOT NULL,
  admin_password VARCHAR(255) NOT NULL,
  admin_firstname VARCHAR(50) NOT NULL,
  admin_lastname VARCHAR(50) NOT NULL,
  active BOOLEAN NOT NULL
);

CREATE TABLE admin
(
  admin_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_email VARCHAR(255) NOT NULL,
  admin_password VARCHAR(255) NOT NULL,
  role VARCHAR(255)
);


