import dotenv from "dotenv"
dotenv.config() 
 
const {USER,PASSWORD,SERVER,DATABASE} = process.env
assert(PORT, 'PORT is required');

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