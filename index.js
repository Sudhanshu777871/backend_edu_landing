const express = require('express')
const app = express();
const cors = require('cors');
require('dotenv').config();
const mysql = require('mysql2');
const connection = mysql.createConnection(process.env.DATABASE_URL);


// applying the middleware
app.use(express.json())
app.use(cors());
// code for mkaing the api
app.post('/contact', (req, res) => {
    const { schoolName, personName, personPhone } = req.body;
  
    if (schoolName && personName && personPhone) {
      // Running the query with proper parameterized values
      connection.query("INSERT INTO edusmartly_landing (SchoolName, PersonName, PhoneNumber) VALUES (?, ?, ?)", [schoolName, personName, personPhone], (err, result) => {
        if (err) {
          res.status(500).send('Internal Server Error');
        } else {

          res.json({ message: true });
        }
      });
    } else {
      res.status(400).send("Invalid Activity");
    }
  });
  


// listing app
app.listen(process.env.PORT)


