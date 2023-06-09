import path from "path"
import express, { Express , Response, Request} from "express"
import cors from 'cors'
import * as dotenv from 'dotenv'
import morgan from 'morgan'
import { graphqlHTTP } from 'express-graphql'


// db connection
import { connectToDb } from "./utils/database"


// schema
import schema from './schema'


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

// setup graqphql
app.use(
    '/q',
    graphqlHTTP({ schema, graphiql: true })
)


const PORT = process.env.PORT || 8080

// start server
app.listen(PORT, ()=> {
    console.log(`server listening on port ${PORT}`)
})