const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors")
const path = require("path")
// create express app
const app = express();
app.use(cors())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'pages')))
// Configuring the database
const dbConfig = require('./config/database-config');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4100
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => res.render('pages/index'))

// Require Notes routes
require('./app/routes/note.routes.js')(app)
require('./app/routes/user.routes.js')(app)
require('./app/routes/booking.routes.js')(app)
// listen for requests

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
