const express = require("express");
const router = express.Router();
const { Client } = require('pg');
<<<<<<< HEAD
=======
const {response} = require("express");
>>>>>>> 95146fd8fb7a9b6d0fd4554cf47130427a5cc5e6

router.get("/api/users", async (req, res) => {
  const client = new Client({
    user: 'postgres.vpphyjfdeemfzziyoqoh',
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    database: 'postgres',
    password: '*mx5i-psSERVnZ)',
    port: 5432,
  });

<<<<<<< HEAD
  try {
    await client.connect((err, res) => {
      if (err) {
        console.log("Connection problem ayy");
      } else {
        console.log("Connected!");
        client.query('SELECT * FROM user_data;', (err, res) => {
          if (err) {
            console.log("Connection problem");
          } else {
            console.log(res);
            res.send(res.rows);
          }
          client.end()
        })
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving user data');

  } finally {
    await client.end();
  }
});

module.exports = router;
=======
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


module.exports = router;
>>>>>>> 95146fd8fb7a9b6d0fd4554cf47130427a5cc5e6
