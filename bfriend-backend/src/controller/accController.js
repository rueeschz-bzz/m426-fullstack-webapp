const express = require("express");
const router = express.Router();
const {Client} = require('pg');
const admin_password = "1234";

const dbConfig = {
    user: 'postgres.vpphyjfdeemfzziyoqoh',
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    database: 'postgres',
    password: '*mx5i-psSERVnZ)',
    port: 5432,
};


const withDbClient = async (req, res, next) => {
    const client = new Client(dbConfig);
    try {
        await client.connect();
        req.dbClient = client;
        next();
    } catch (err) {
        res.status(500).send("Database connection error");
    }
};

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


router.get("/api/users", [withDbClient, isAuthenticated], async (req, res) => {
    const client = req.dbClient;
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
    } finally {
        client.end();
    }
});


router.get("/api/users/:id", [withDbClient, isAuthenticated], async (req, res) => {
    const client = req.dbClient;
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
    } finally {
        client.end();
    }
});


router.get("/api/my-data", [withDbClient, isAuthenticated], async (req, res) => {
    const client = req.dbClient;
    try {
        const query = 'SELECT * FROM user_data WHERE username = $1';
        const values = [req.session.user];
        const result = await client.query(query, values);
        return res.json(result.rows);
    } catch (err) {
        res.status(500).send("Database query error");
    } finally {
        client.end();
    }
});


router.put("/api/deactivate", [withDbClient, isAuthenticated], async (req, res) => {
    const client = req.dbClient;
    try {
        const query = 'UPDATE user_data SET active_profile = $1 WHERE username = $2';
        const values = [false, req.session.user];
        await client.query(query, values);
        res.send();
    } catch (err) {
        res.status(500).send("Database query error");
    } finally {
        client.end();
    }
});


router.put("/api/activate", [withDbClient, isAuthenticated], async (req, res) => {
    const client = req.dbClient;
    try {
        const query = 'UPDATE user_data SET active_profile = $1 WHERE username = $2';
        const values = [true, req.session.user];
        await client.query(query, values);
        res.send();
    } catch (err) {
        res.status(500).send("Database query error");
    } finally {
        client.end();
    }
});


router.delete("/api/delete", withDbClient, async (req, res) => {
    const client = req.dbClient;
    try {
        const query = 'DELETE FROM user_data WHERE username = $1';
        const values = [req.session.user];
        await client.query(query, values);
        res.send();
    } catch (err) {
        res.status(500).send("Database query error");
    } finally {
        client.end();
    }
});


router.put("/api/get-admin", withDbClient, async (req, res) => {
    const client = req.dbClient;
    try {
        if (req.body.apw === admin_password) {
            const query = 'UPDATE user_data SET is_admin = $1 WHERE username = $2';
            const values = [true, req.session.user];
            await client.query(query, values);
            res.send();
        } else {
            res.send("Das Passwort ist falsch!");
        }
    } catch (err) {
        res.status(500).send("Database query error");
    } finally {
        client.end();
    }
});

module.exports = router;
