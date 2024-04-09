import express from 'express';
import cors from 'cors';
import pg from 'pg';

const app = express();
app.use(express.json());
app.use(cors());

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "notes",
  password: "Lunar2605",
  port: 5432,
});

db.connect();

var userName = '';
// Update your GET /api/notes endpoint to accept a 'name' parameter
app.get('/api/notes', (req, res) => {
    const { name } = req.query;
    const query = `SELECT * FROM notes WHERE name=$1 ORDER BY id ASC`;
    db.query(query, [name], (err, notes) => {
        if (err) {
            res.status(500).send("An error occurred");
        } else {
            res.send(notes.rows);
        }
    });
});


app.post('/api/notes', (req, res) => {
    const { title, content } = req.body;
    const query = `INSERT INTO notes (name, title, content) VALUES ($1,$2,$3)`
    db.query(query, [userName, title, content], (err, notes) => {
        if (err) {
            console.log(err);
        } else {
            res.send(notes.rows);
        }
    });
    
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if  (!email || !password) return res.status(400).send('Missing fields')
    // Query the DB to check if the provided credentials match an existing account
    const query = `SELECT * FROM users WHERE email=$1`;
    db.query(query, [email], (err, results) => {
        if (err) return res.status(500).send("Oops! An error occured")
        else if (results.rows.length === 0) res.send("No user found")
        else {
            if (results.rows[0].password === password) {
                res.send("Success")
                userName = results.rows[0].name;
            } else {
                res.send("Invalid Password");
            }
        }
    });
})

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  console.log(name + ", " + email + ", " + password);

  db.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [name, email, password])
    .then(() => {
      res.status(200).send("User registered successfully");
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Error registering user");
    });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
