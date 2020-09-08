
database="ppe_inventory"


psql -c "CREATE DATABASE $database;"

psql -d $database -c "CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";"

psql -d $database -c "CREATE TABLE target_config(target_id SERIAL PRIMARY KEY,description VARCHAR(50) NOT NULL);"
psql -d $database -c "CREATE TABLE users(user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),name VARCHAR(100) NOT NULL,subdomain VARCHAR(255) NOT NULL,target_config_id INT REFERENCES target_config(target_id),admin_email VARCHAR(255) NOT NULL,admin_password VARCHAR(255) NOT NULL,admin_firstname VARCHAR(50) NOT NULL,admin_lastname VARCHAR(50) NOT NULL,active BOOLEAN NOT NULL);"
psql -d $database -c "CREATE TABLE admin(admin_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),admin_email VARCHAR(255) NOT NULL,admin_password VARCHAR(255) NOT NULL,role VARCHAR(255));"

psql -d $database -c "INSERT INTO target_config (target_id, description) VALUES (1,'test');"
psql -d $database -c "INSERT INTO target_config (target_id, description) VALUES (2,'test2');"






