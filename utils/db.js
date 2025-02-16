const sqlite3 = require("sqlite3").verbose();

// Load the points database
const pointsDB = "./points.db";

// Create a new database object
const db = new sqlite3.Database(pointsDB);

function checkUserIDExists(userID) {
  return new Promise((resolve, reject) => {
    // Get user directly instead of fetching all users
    db.get(
      "SELECT userID FROM points WHERE userID = ?",
      [userID],
      (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(!!row); // Convert to boolean
      }
    );
  });
}

// Add user to the database
function addUser(username, userID, points) {
  return new Promise((resolve, reject) => {
    // Check if the user already exists
    checkUserIDExists(userID)
      .then((userExists) => {
        // If the user already exists, return
        if (userExists) {
          resolve("User already exists!");
          return;
        }
        // If the user doesn't exist, add them to the database
        db.run(
          "INSERT INTO points (username, userID, points, incomeTimestamp) VALUES (?, ?, ?, ?)",
          [username, userID, points, 0],
          (err) => {
            if (err) {
              reject(err);
              return;
            }
            resolve("User added to database!");
          }
        );
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// Get the points of a user
async function getPoints(userID) {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT points FROM points WHERE userID = ?",
      [userID],
      (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(row ? row.points : null);
      }
    );
  });
}

// Add points to a user
async function addPoints(userID, pointsToAdd) {
  const userExists = await checkUserIDExists(userID);
  if (!userExists) {
    return Promise.reject("User does not exist");
  }

  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE points SET points = points + ? WHERE userID = ?",
      [pointsToAdd, userID],
      (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve("Points added!");
      }
    );
  });
}

// Get the income timestamp of a user
async function getIncomeTimestamp(userID) {
  const userExists = await checkUserIDExists(userID);
  if (!userExists) {
    return null;
  }

  return new Promise((resolve, reject) => {
    db.get(
      "SELECT incomeTimestamp FROM points WHERE userID = ?",
      [userID],
      (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(row ? row.incomeTimestamp : null);
      }
    );
  });
}

// Update the income timestamp of a user
async function updateIncomeTimestamp(userID, incomeTimestamp) {
  const userExists = await checkUserIDExists(userID);
  if (!userExists) {
    return Promise.reject("User does not exist");
  }

  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE points SET incomeTimestamp = ? WHERE userID = ?",
      [incomeTimestamp, userID],
      (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve("Income timestamp updated!");
      }
    );
  });
}

// Leaderboard
async function getLeaderboard(numberOfUsers) {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT username, points FROM points ORDER BY points DESC LIMIT ?",
      [numberOfUsers],
      (err, rows) => {
        if (err) {
          reject(err);
          return;
        }

        let leaderboard = "";
        for (let i = 0; i < rows.length; i++) {
          const user = rows[i];
          const username = user.username;
          const points = user.points;
          leaderboard += `${i + 1}. ${username}: ${points} points\n`;
        }

        resolve(leaderboard);
      }
    );
  });
}

module.exports = {
  checkUserIDExists,
  addUser,
  getPoints,
  addPoints,
  getIncomeTimestamp,
  getLeaderboard,
  updateIncomeTimestamp,
};
