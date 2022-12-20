require("dotenv").config();
const express = require("express")
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(cors({
  origin: '*',
  credentials: true
}));
app.use("/uploads",express.static('uploads'));



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('./routes'));

app.get("",(req,res)=>{
  res.send("Hello world");
})

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
  console.log(`System is running on http://localhost:${PORT}`);
})