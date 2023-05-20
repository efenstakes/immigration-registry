import path from "path"
import express, { Express , Response, Request} from "express"
import cors from 'cors'
import * as dotenv from 'dotenv'
import morgan from 'morgan'


// db connection
import { connectToDb } from "./utils/database"


// create express server
const app: Express = express()


// get environment variables
dotenv.config({ path: path.join(__dirname, '.env')})


// connect to db
connectToDb()


// allow cross origin requests
app.use(cors())


// show dev logs
app.use(morgan('dev'))


app.get("/", (req: Request, res: Response)=> {
    res.json({ page: 'index', status: 'running' })
})



const PORT = process.env.PORT || 8080

// start server
app.listen(PORT, ()=> {
    console.log(`server listening on port ${PORT}`)
})