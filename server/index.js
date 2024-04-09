import express from 'express';
import cors from 'cors';
import pg from 'pg';
import 'dotenv/config'
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(express.json());
app.use(cors());
const prisma = new PrismaClient();

app.get('/api/notes', async (req, res) => {

    const notes = await prisma.note.findMany();

    res.json(notes);
});


app.post('/api/notes', async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).send('Missing fields');
    }

    try {
        const createdNote = await prisma.note.create({
            data: { title, content }
        });

        res.json(createdNote);
    } catch (err) {
        return res.status(500).send('Error creating the note');
    }

    
})

app.delete('/api/notes/:id', async (req, res) =>{
    const id = parseInt(req.params.id);

    if(!id || isNaN(id)){
        return  res.status(400).send("Invalid ID");
    }

    try{
        await prisma.note.delete({
            where: { id }
        });
        res.status(204).send();
    } catch (err) {
        return res.status(500).send('Error deleting the note');
    }
})

// app.post('/login', (req, res) => {
//     const { email, password } = req.body;
//     if  (!email || !password) return res.status(400).send('Missing fields')
//     const query = `SELECT * FROM users WHERE email=$1`;
//     db.query(query, [email], (err, results) => {
//         if (err) return res.status(500).send("Oops! An error occured")
//         else if (results.rows.length === 0) res.send("No user found")
//         else {
//             if (results.rows[0].password === password) {
//                 res.send("Success")
//                 userName = results.rows[0].name;
//             } else {
//                 res.send("Invalid Password");
//             }
//         }
//     });
// })

// app.post('/register', (req, res) => {
//   const { name, email, password } = req.body;
//   console.log(name + ", " + email + ", " + password);

//   db.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [name, email, password])
//     .then(() => {
//       res.status(200).send("User registered successfully");
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).send("Error registering user");
//     });
// });

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
