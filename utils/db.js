const sqlite3 = require('sqlite3').verbose();

// Load the points database
const pointsDB = './points.db';

// Create a new database object
const db = new sqlite3.Database(pointsDB);

function checkUserIDExists(userID) {
    return new Promise((resolve, reject) => {
        // Get all user IDs from the database
        db.all('SELECT userID FROM points', (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const userIDs = rows.map(row => row.userID);
            // Check if the user ID exists in the database
            const userIDExists = userIDs.includes(userID);
            resolve(userIDExists);
        });
    });
}

// Add user to the database
function addUser(username, userID, points) {
    return new Promise((resolve, reject) => {
        // Check if the user already exists
        checkUserIDExists(userID)
            .then(userExists => {
                // If the user already exists, return
                if (userExists) {
                    resolve("User already exists!");
                    return;
                }
                // If the user doesn't exist, add them to the database
                db.run('INSERT INTO points (username, userID, points, incomeTimestamp) VALUES (?, ?, ?, ?)', [username, userID, points, 0], (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve("User added to database!");
                });
            })
            .catch(err => {
                // Handle any errors that occurred during the operation
                reject(err);
            });
    });
}``

// Get the points of a user
function getPoints(userID) {
    // Check if the user exists
    const userExists = checkUserIDExists(userID);
    // If the user doesn't exist, return
    if (!userExists) {
        return null;
    }
    // If the user exists, get their points
    const points = db.get('SELECT points FROM points WHERE userID = ?', [userID], (err, row) => {
        if (err) {
            throw err;
        }
        return row.points;
    });
    return points;
}

// Add points to a user
function addPoints(userID, pointsToAdd) {
    return new Promise((resolve, reject) => {
        // Check if the user exists
        const userExists = checkUserIDExists(userID);
        // If the user doesn't exist, return
        if (!userExists) {
            return;
        }
        // If the user exists, add points to their account
        db.run('UPDATE points SET points = points + ? WHERE userID = ?', [pointsToAdd, userID], (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve("Points added!");
        });
    });
}

// Get the income timestamp of a user
async function getIncomeTimestamp(userID) {
    return new Promise((resolve, reject) => {
      // Check if the user exists
      const userExists = checkUserIDExists(userID);
      // If the user doesn't exist, resolve with null
      if (!userExists) {
        resolve(null);
        return;
      }
      // If the user exists, get their income timestamp
      db.get('SELECT incomeTimestamp FROM points WHERE userID = ?', [userID], (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(row ? row.incomeTimestamp : null);
      });
    });
  }

// Update the income timestamp of a user
function updateIncomeTimestamp(userID, incomeTimestamp) {
    return new Promise((resolve, reject) => {
        // Check if the user exists
        const userExists = checkUserIDExists(userID);
        // If the user doesn't exist, return
        if (!userExists) {
            return;
        }
        // If the user exists, update their income timestamp
        db.run('UPDATE points SET incomeTimestamp = ? WHERE userID = ?', [incomeTimestamp, userID], (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve("Income timestamp updated!");
        });
    });
}

// Leaderboard
async function getLeaderboard(numberOfUsers) {
    return new Promise((resolve, reject) => {
        db.all('SELECT username, points FROM points ORDER BY points DESC LIMIT ?', [numberOfUsers], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }

            let leaderboard = '';
            for (let i = 0; i < rows.length; i++) {
                const user = rows[i];
                const username = user.username;
                const points = user.points;
                leaderboard += `${i + 1}. ${username}: ${points} points\n`;
            }

            resolve(leaderboard);
        });
    });
}

module.exports = {
    checkUserIDExists,
    addUser,
    getPoints,
    addPoints,
    getIncomeTimestamp,
    getLeaderboard,
    updateIncomeTimestamp
};