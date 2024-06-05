const express = require("express");
const router = express.Router();
const { Client } = require('pg');
const admin_password = "1234"

router.get("/api/users", async (req, res) => {
  const client = new Client({
    user: 'postgres.vpphyjfdeemfzziyoqoh',
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    database: 'postgres',
    password: '*mx5i-psSERVnZ)',
    port: 5432,
  });

  client.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  client.query('SELECT * FROM user_data;', (error, response) => {
    console.log(error, response)
    client.end()
    res.json(response.rows).send()
  })
});


router.get("/api/users/:id", async (req, res) => {
  const client = new Client({
    user: 'postgres.vpphyjfdeemfzziyoqoh',
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    database: 'postgres',
    password: '*mx5i-psSERVnZ)',
    port: 5432,
  });

  client.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  client.query(`SELECT * FROM user_data WHERE id = ${req.params.id};`, (error, response) => {
    console.log(error, response)
    client.end()
    res.json(response.rows).send()
  })
});

router.put("/api/deactivate", async (req, res) => {
  const client = new Client({
    user: 'postgres.vpphyjfdeemfzziyoqoh',
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    database: 'postgres',
    password: '*mx5i-psSERVnZ)',
    port: 5432,
  });

  client.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  client.query(`UPDATE user_data SET active_profile = $1 WHERE username = $2;`, [false, String(req.session.user)], (error, response) => {
    console.log(error, response)
    client.end()
    res.send()
  })
});

router.put("/api/activate", async (req, res) => {
  const client = new Client({
    user: 'postgres.vpphyjfdeemfzziyoqoh',
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    database: 'postgres',
    password: '*mx5i-psSERVnZ)',
    port: 5432,
  });

  client.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  client.query(`UPDATE user_data SET active_profile = $1 WHERE username = $2;`, [true, String(req.session.user)], (error, response) => {
    console.log(error, response)
    client.end()
    res.send()
  })
});

router.delete("/api/delete", async (req, res) => {
  const client = new Client({
    user: 'postgres.vpphyjfdeemfzziyoqoh',
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    database: 'postgres',
    password: '*mx5i-psSERVnZ)',
    port: 5432,
  });

  client.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  client.query(`DELETE FROM user_data WHERE username = $1;`, [String(req.session.user)], (error, response) => {
    console.log(error, response)
    client.end()
    res.send()
  })
});

router.put("/api/get-admin", async (req, res) => {
  const client = new Client({
    user: 'postgres.vpphyjfdeemfzziyoqoh',
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    database: 'postgres',
    password: '*mx5i-psSERVnZ)',
    port: 5432,
  });

  client.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  console.log(req.body)
  if (req.body.apw === admin_password) {
    client.query(`UPDATE user_data SET is_admin = $1 WHERE username = $2;`, [true, String(req.session.user)], (error, response) => {
      console.log(error, response)
      client.end()
      res.send()
    })
  } else {
    client.end()
    res.send("nah bro")
  }

});

module.exports = router;