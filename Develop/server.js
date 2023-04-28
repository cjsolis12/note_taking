const express = require ('express');
const path = require('path');
const apiRouter = require('./routes/index');
const fs= require('fs');


const app = express ();
const PORT = process.env.port || 3001;

//Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRouter);

app.use(express.static('public'));

//HTML ROUTES
router.get('/notes', (req, res)=> {
    //Returns the notes.html file
    res.sendFile('notes.html', {root: __dirname + '/../public'})
})
app.get('/notes', (req,res) => 
res.sendFile(path.join(__dirname, 'public/notes.html'))
)

app.get('*', (req,res) => 
res.sendFile(path.join(__dirname, 'public', 'index.html'))
)

//API Routes
app.get('/api/notes', (req,res)=>{
    fs.readFile('db/db.json', 'utf8', (err,data)=>{
        if(err){
            console.log(err);
            res.status(500).end();
        } else{
            const notes = JSON.parse(data);
            res.json(notes);
        }
    });
});

app.post('/api/notes', (req,res)=>{
const newNote = req.body;
fs.readFile('db.json','utf8', (err,data)=>{
    if(err){
        console.log(err);
        res.status(500).end();
    } else{
        const notes = JSON.parse(data);
        const id = notes.length + 1;
        newNote.id =id;
        notes.push(newNote)
        fs.writeFile('db.json', JSON.stringify(notes), (err)=>{
            if(err){
                console.log(err);
                res.status(500).end();
            } else {
                res.json(newNote);
            }
        })
    }
})
})


app.listen(PORT, () =>{
    console.log(`example app listening at http://localhost:${PORT}`)
})


