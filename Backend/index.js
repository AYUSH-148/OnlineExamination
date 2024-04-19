const connectToMongo = require('./db');
const dotenv = require('dotenv');
var cors = require('cors');
dotenv.config({path:'config.env'});
const PORT = process.env.PORT||8080;

const express = require('express')
const app = express();

app.use(cors({origin:'*'}))

connectToMongo();

app.use(express.json()); 

app.use('/api/admin',require('./routes/admin'));
app.use('/api/subjects',require('./routes/subjects'));
app.use('/api/students',require('./routes/students'));
app.use('/api/questions',require('./routes/questions'));
app.use('/api/isAttempted',require('./routes/isAttempted'));
app.use('/api/marks',require('./routes/marks'));
app.use('/api/marksPerQn',require('./routes/marksPerQn'));

app.listen(PORT, () => {
    console.log(`Example app listening at https://onlineexamination.onrender.com`)
})