const express = require('express')
const dotenv = require('dotenv')
const { scrape } = require('./scraper')
const cors = require("cors");



const app = express()
dotenv.config()
const corsVAriables = process.env.CORS



app.use(cors({
    origin:corsVAriables
}));
app.use(express.json())


const port = process.env.PORT_NUMBER || 8000

app.post('/api/summary', scrape)



app.listen(port,console.log(`server started at ${port}`))