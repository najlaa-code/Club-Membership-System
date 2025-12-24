DROP DATABASE IF EXISTS testdb;
CREATE DATABASE IF NOT EXISTS testdb;
USE testdb;

CREATE TABLE IF NOT EXISTS users (
  UserID INT PRIMARY KEY,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  dateOfBirth DATE NOT NULL,
  gender VARCHAR(10),
  membershipType VARCHAR(20),
  preferences VARCHAR(255), 
  country VARCHAR(50)
);
CREATE DATABASE IF NOT EXISTS testdb;
USE testdb;

DESCRIBE users;

INSERT INTO users (UserID, firstName, lastName, email, dateOfBirth, gender, membershipType, preferences, country)
VALUES (1, 'John', 'Doe', 'john.doe@example.com', '1990-01-01', 'Male', 'Premium', 'Events,Workshops', 'USA'); /*Testing by inserting a test user.*/
