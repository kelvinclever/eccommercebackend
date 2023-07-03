import dotenv from "dotenv"
dotenv.config() 
 
HEAD
const {PORT,USER,PASSWORD,SERVER,DATABASE} = process.env


export const dbConfig = {

    user: USER,
    password:PASSWORD,
    server:SERVER,
    database:DATABASE,
}