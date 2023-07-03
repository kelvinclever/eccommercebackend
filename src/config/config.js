import dotenv from "dotenv"
dotenv.config() 
 
const {USER,PORT,PASSWORD,SERVER,DATABASE} = process.env


export const dbConfig = {
    port:PORT,
    user: USER,
    password:PASSWORD,
    server:SERVER,
    database:DATABASE,
    options:{
        encrypt:true,
        trustServerCertificate:false
    }

}