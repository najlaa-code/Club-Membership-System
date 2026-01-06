Club Membership Registration System
A full-stack web application for managing club memberships with CRUD operations, built with Node.js, Express, MySQL, and vanilla JavaScript.
Features

Create - Add new members with detailed information
Read - View member details by User ID
Update - Modify existing member information
Delete - Remove members from the database

Technologies Used

Backend: Node.js, Express.js
Database: MySQL
Frontend: HTML5, Vanilla JavaScript
API: RESTful endpoints

Database Schema
The application uses a MySQL database named testdb with a users table:
ColumnTypeConstraintsUserIDINTPRIMARY KEYfirstNameVARCHAR(50)NOT NULLlastNameVARCHAR(50)NOT NULLemailVARCHAR(100)NOT NULL, UNIQUEdateOfBirthDATENOT NULLgenderVARCHAR(10)-membershipTypeVARCHAR(20)-preferencesVARCHAR(255)-countryVARCHAR(50)-
Installation

Clone the repository

bash   git clone <your-repo-url>
   cd <project-folder>

Install dependencies

bash   npm install

Set up MySQL database
Run the following SQL commands to create the database and table:

sql   DROP DATABASE IF EXISTS testdb;
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

Configure database connection
Update the database credentials in app.js:

javascript   const dbConfig = {
       host: 'localhost',
       user: 'root',
       password: 'your_password',  // Change this
       database: 'testdb'
   };

Start the server

bash   node app.js
```

6. **Access the application**
   
   Open your browser and navigate to:
```
   http://localhost:5000
```

## API Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/` | Serve the HTML form | - |
| POST | `/addUser` | Add a new user | User object (JSON) |
| GET | `/viewUser?userID=<id>` | Get user by ID | - |
| PUT | `/updateUser` | Update user information | User object with UserID (JSON) |
| DELETE | `/deleteUser` | Delete user by ID | `{ userID: <id> }` (JSON) |

## Usage

### Adding a User
1. Fill in all required fields in the form
2. Select gender and membership type
3. Choose preferences (Events, Volunteering, Workshops)
4. Select a country from the dropdown
5. Click the **Insert** button

### Viewing a User
1. Enter the User ID in the User ID field
2. Click the **View** button
3. User details will appear in an alert

### Updating a User
1. Enter the User ID of the user you want to update
2. Modify the fields you want to change
3. Click the **Update** button

### Deleting a User
1. Enter the User ID in the User ID field
2. Click the **Delete** button
3. Confirm the deletion

## Project Structure
```
project-folder/
│
├── app.js              # Express server and API routes
├── public/
│   └── index.html      # Frontend HTML form
├── package.json        # Project dependencies
└── README.md
Dependencies

express - Web framework for Node.js
mysql2 - MySQL client for Node.js

Testing
A test user is included in the SQL setup:

UserID: 1
Name: John Doe
Email: john.doe@example.com
DOB: 1990-01-01
Gender: Male
Membership: Premium
Preferences: Events, Workshops
Country: USA

Error Handling
The application includes comprehensive error handling for:
- Database connection failures
- Invalid user input
- Missing required fields
- User not found scenarios
- Duplicate email addresses
