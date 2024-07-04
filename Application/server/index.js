const express = require("express");
const mongoose = require("mongoose");
const authRoute = require('./routes/auth');
const ticketRoute = require('./routes/ticket');
const cors = require("cors");
require('dotenv').config();
const app = express();
// this will let know that you should expect some objects
app.use(express.json());

app.use(cors(
  {
    origin: ["https://vivekumar192-gmail-com-cuvette-final-evaluation-nov-rkyfyi3x7.vercel.app"],
    methods:["POST","PUT","PATCH","DELETE","GET"],
    credentials:true
  }
));

app.get("/",(req,res) => {
  res.send("Hello and Welcome!");})


app.get("/health", (req, res) => {
  res.send("Hello World");
});

app.use('/api/v1/auth',authRoute);
app.use('/api/v1/ticket',ticketRoute);

app.use((error, req, res, next) => {
  console.log(error)
  res.status(error.status || 500).json({
    errorMessage: error.message,
    // change errorMessage to something went wrong
    // when development is complete
  });
});

mongoose.connect(process.env.MONGODB_URI).then(()=>{
  console.log("DB connected!")
})
.catch((error)=>{
  console.log("DB failed to connect",error)
})
const PORT = 3001;

app.listen(PORT, ()=>{
  console.log(` Backend server running at port : ${PORT}`);
});

