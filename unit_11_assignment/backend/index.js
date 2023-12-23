/*Alvee Jalal
11/19/2023
IT 302001
Unit 11 Assignment 
ahj24@njit.edu*/
import app from './server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import charactersDAO from './dao/charactersDAO.js';
import impressionsDAO from './dao/impressionsDAO.js';

async function main () {
    dotenv.config();
    
    const client = new mongodb.MongoClient(process.env.CHARACTERS_DB_URI);

    const port = process.env.PORT || 8000;

    try {
    await client.connect();
    await charactersDAO.injectDB(client);
    await impressionsDAO.injectDB(client);
    app.listen(port, ()=> {
        console.log('server is running on port:'+ port);
    });
    
}
catch(e)
{
    console.error(e);
    process.exit(1);
}
}
main().catch(console.error);
