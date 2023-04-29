const express = require('express');
//Import modular routers for /notes
const notesRouter = require('./notes')

const app = express();
//Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.use('/notes', notesRouter)


module.exports = app;