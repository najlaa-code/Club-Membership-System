const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const PORT = 5000;
app.use(express.json());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'), (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(500).send('Error loading file');
        }
    });
});
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'ass_3',
    database: 'testdb'
};
const db = mysql.createConnection(dbConfig);
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Successfully connected to database');
});
//  Insert User Information
app.post('/addUser', (req, res) => {
    try {
        const {
            userID,
            firstName,
            lastName,
            email,
            dateOfBirth,
            gender,
            membershipType,
            preferences,
            country
        } = req.body;
        const prefString = preferences.join(',');
        // Sql for inserting the user
        const sql = `
            INSERT INTO users (
                UserID, FirstName, LastName, Email, 
                DateOfBirth, Gender, MembershipType, 
                Preferences, Country
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        db.query(sql, [userID, firstName, lastName, email, dateOfBirth, gender, membershipType, prefString, country], 
            (err, result) => {
                if (err) {
                    console.error('Failed to add user:', err);
                    return res.status(500).json({
                        success: false,
                        message: 'Failed to add user',
                        error: err.message
                    });
                }
                res.json({
                    success: true,
                    message: 'User added successfully',
                    userID: userID
                });
            });
    } catch (error) {
        console.error('Error processing user data:', error);
        res.status(400).json({
            success: false,
            message: 'Invalid request data',
            error: error.message
        });
    }
});
// DDelete User Information by User ID
app.delete('/deleteUser', (req, res) => {
    try {
        const { userID } = req.body;
        if (!userID) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        }
        const sql = 'DELETE FROM users WHERE UserID = ?';
        db.query(sql, [userID], (err, result) => {
            if (err) {
                console.error('Delete operation failed:', err);
                return res.status(500).json({
                    success: false,
                    message: 'Failed to delete user',
                    error: err.message
                });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }
            res.json({
                success: true,
                message: 'User deleted successfully'
            });
        });
    } catch (error) {
        console.error('Error processing delete request:', error);
        res.status(400).json({
            success: false,
            message: 'Invalid request',
            error: error.message
        });
    }});
// Update User Information by User ID
app.put('/updateUser', (req, res) => {
    try {
        const {
            userID,
            firstName,
            lastName,
            email,
            dateOfBirth,
            gender,
            membershipType,
            preferences,
            country
        } = req.body;
        if (!userID) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        }
        const prefString = preferences.join(',');
        const sql = `
            UPDATE users 
            SET FirstName = ?, LastName = ?, Email = ?, 
                DateOfBirth = ?, Gender = ?, MembershipType = ?, 
                Preferences = ?, Country = ?
            WHERE UserID = ?`;
        db.query(sql, [firstName, lastName, email, dateOfBirth, gender, membershipType, prefString, country, userID], 
            (err, result) => {
                if (err) {
                    console.error('Update operation failed:', err);
                    return res.status(500).json({
                        success: false,
                        message: 'Failed to update user',
                        error: err.message
                    });
                }
                if (result.affectedRows === 0) {
                    return res.status(404).json({
                        success: false,
                        message: 'User not found'
                    });
                }
                res.json({
                    success: true,
                    message: 'User updated successfully'
                });
            });
    } catch (error) {
        console.error('Error processing update request:', error);
        res.status(400).json({
            success: false,
            message: 'Invalid request data',
            error: error.message
        });
    }});
// Display User Information by User ID
app.get('/viewUser', (req, res) => {
    try {
        const userID = req.query.userID;
        if (!userID) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        }
        const sql = 'SELECT * FROM users WHERE UserID = ?';
        db.query(sql, [userID], (err, results) => {
            if (err) {
                console.error('Database query failed:', err);
                return res.status(500).json({
                    success: false,
                    message: 'Database error',
                    error: err.message
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }
            res.json({
                success: true,
                data: results[0]
            });
        });
    } catch (error) {
        console.error('Error processing view request:', error);
        res.status(400).json({
            success: false,
            message: 'Invalid request',
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
