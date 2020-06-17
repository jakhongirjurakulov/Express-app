const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes/api/members');
const logger = require('./express-demo/logger');
const exphbs = require('express-handlebars');
const members = require('./express-demo/Members');

//Init middleware
//app.use(logger);

//HAndlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

//Homepage Route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App', 
    members
}));

//Set static folder
app.use(express.static(path.join(__dirname, 'express-demo', 'public')));

//Members API routes 
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}...`));