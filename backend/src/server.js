const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');

const app = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@omni-qocdl.mongodb.net/omni?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,   
})

//req.query = acessar query params (para filtros)
//req.params = acessar route params (para edição, delete)
//req.body = acessar corpo da requisição (para criação , edição)


// app.use(cors({origin: 'http://localhost:3000'}));
app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.listen(3333);
