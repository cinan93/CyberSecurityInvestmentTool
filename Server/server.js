const express = require('express'); 
const cors = require('cors'); 
const mongoose = require('mongoose'); 
const data = require('./Database/InsertedData/useCaseRansomwareHealthcare'); 

require('dotenv').config(); 

const app = express(); 
const port = process.env.PORT || 5000; 

app.use(cors()); 
app.use(express.json()); 

const uri = process.env.ATLAS_URI; 
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false}); 

const connection = mongoose.connection;
 
connection.once('open', ()=> {
    console.log("MongoDB database connection established successfully");
    
 /* data.ransomware.save(); 
data.company1.save();   
 */
        })

//import of Router 
const companyRouter = require('./routes/company');
app.use('/company', companyRouter);

app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`); 
})
