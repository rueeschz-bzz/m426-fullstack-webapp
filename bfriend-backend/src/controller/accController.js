const express = require("express");
const {Client} = require('pg');
require("dotenv").config();
const admin_password = process.env.ADMIN_PW;


const router = express.Router();

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false,
    }
});

client.connect(err => {
    if (err) {
        console.error('Connection error', err.stack);
    } else {
        console.log('Connected to the database (acc)');
    }
});


const isAuthenticated = (req, res, next) => {
    if (!req.session || req.session.auth !== 'auth') {
        return res.status(401).send('Not Logged in');
    }
    next();
};

const isAdmin = async (client, username) => {
    const query = "SELECT is_admin FROM user_data WHERE username = $1";
    const values = [username];
    const result = await client.query(query, values);
    const userData = result.rows[0];
    if (!userData) {
        throw new Error('User not found');
    }
    return userData.is_admin;
};


router.get("/api/users", isAuthenticated, async (req, res) => {
    try {
        const username = req.session.user;
        const userIsAdmin = await isAdmin(client, username);

        if (userIsAdmin) {
            const allUsers = await client.query('SELECT * FROM user_data;');
            return res.json(allUsers.rows);
        } else {
            return res.status(403).send('Access denied. Admins only.');
        }
    } catch (err) {
        if (err.message === "User not found") {
            return res.status(404).send("User not found.");
        }
        res.status(500).send("Database query error");
    }
});


router.get("/api/users/:id", isAuthenticated, async (req, res) => {
    try {
        const username = req.session.user;
        const userIsAdmin = await isAdmin(client, username);

        if (userIsAdmin) {
            const query = 'SELECT * FROM user_data WHERE id = $1';
            const values = [req.params.id];
            const result = await client.query(query, values);
            return res.json(result.rows);
        } else {
            return res.status(403).send('Access denied. Admins only.');
        }
    } catch (err) {
        res.status(500).send("Database query error");
    }
});


router.get("/api/my-data", isAuthenticated, async (req, res) => {
    try {
        const query = 'SELECT * FROM user_data WHERE username = $1';
        const values = [req.session.user];
        const result = await client.query(query, values);
        return res.json(result.rows);
    } catch (err) {
        res.status(500).send("Database query error");
    }
});


router.put("/api/deactivate", isAuthenticated, async (req, res) => {
    try {
        const query = 'UPDATE user_data SET active_profile = $1 WHERE username = $2';
        const values = [false, req.session.user];
        await client.query(query, values);
        res.send();
    } catch (err) {
        res.status(500).send("Database query error");
    }
});


router.put("/api/activate", isAuthenticated, async (req, res) => {
    try {
        const query = 'UPDATE user_data SET active_profile = $1 WHERE username = $2';
        const values = [true, req.session.user];
        await client.query(query, values);
        res.send();
    } catch (err) {
        res.status(500).send("Database query error");
    }
});


router.delete("/api/delete", async (req, res) => {
    try {
        const query = 'DELETE FROM user_data WHERE username = $1';
        const values = [req.session.user];
        await client.query(query, values);
        res.send();
    } catch (err) {
        res.status(500).send("Database query error");
    }
});


router.put("/api/get-admin", isAuthenticated, async (req, res) => {
    try {
        const username = req.session.user;
        const userIsAdmin = await isAdmin(client, username);
        if (userIsAdmin) {
            res.send('Du bist schon ein Administrator');
        }
        else if (req.body.apw === admin_password) {
            const query = 'UPDATE user_data SET is_admin = $1 WHERE username = $2';
            const values = [true, req.session.user];
            await client.query(query, values);
            res.send('Du Bist jetzt ein Administrator');
        } else {
            res.send("Das Passwort ist falsch!");
        }
    } catch (err) {
        res.status(500).send("Database query error");
    }
});

module.exports = router;