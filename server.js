const express = require ('express');
const path = require('path');
const apiRouter = require('./routes/index.js');

const app = express ();
const PORT = process.env.PORT || 3001;

//Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRouter);

app.use(express.static('public'));

//HTML ROUTES
app.get('/', (req,res) => 
res.sendFile(path.join(__dirname, 'public/index.html'))
)
app.get('/notes', (req,res) => 
res.sendFile(path.join(__dirname, 'public/notes.html'))
)

app.get('*', (req,res) => 
res.sendFile(path.join(__dirname, 'public', 'index.html'))
)


app.listen(PORT, () =>{
    console.log(`example app listening at http://localhost:${PORT}`)
})


