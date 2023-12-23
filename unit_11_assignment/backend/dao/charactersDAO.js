/*Alvee Jalal
11/19/2023
IT 302001
Unit 11 Assignment 
ahj24@njit.edu*/
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId;
let characters

export default class charactersDao
{
    static async injectDB(conn)
    {
        if(characters)
        {
            return
        }
    
    try 
    {
        characters = await conn.db(process.env.CHARACTERS_NS).collection('gameOfThronesCharacters_ahj24');
    }
    catch(e)
    {
        console.error(`unable to connect in CharactersDAO ${e}`);
    }
}

    static async getCharacters({
        filters = null,
        pageNumber = 0,
        itemsPerPage = 20,}={}) 
    {
        let query;
        if(filters)
        {
            if("title" in filters)
            {
                query = { "title": { $eq: filters['title']}};

            }
            else if("family" in filters)
            {
                query = { "family": {$eq: filters['family']}};
            }
            else if("fullName" in filters)
            {
                query = { "fullName": {$eq: filters['fullName']}};
            }
            else if("firstName" in filters)
            {
                query = { "firstName": {$eq: filters['firstName']}};
            }
            else if("lastName" in filters)
            {
                query = { "lastName": {$eq: filters['lastName']}};
            }
        }
        let cursor 
        try {
            cursor = await characters
            .find(query)
            .limit(itemsPerPage)
            .skip(itemsPerPage * pageNumber);

        const charactersList = await cursor.toArray();
        const totalNumCharacters = await characters.countDocuments(query);
        return {charactersList,totalNumCharacters};
        }
        catch(e)
        {
            console.error(`Unable to issue find command, ${e}`)
            console.error(e)
            return {charactersList:[], totalNumCharacters:0}
        }
    }

    static async getCharacterById(id)
    {
        try {
            return await characters.aggregate([
                {
                    $match: {
                        _id: new ObjectId(id),
                    }
                },
                { $lookup: 
                 {
                    from: 'impressions',
                    localField: '_id',
                    foreignField: 'character_id',
                    as: 'impressions'
                 }
               }
            ]).next()
        }
        catch(e)
        {
            console.error(`something went wrong in getCharacterById: ${e}`)
            throw e;
        }
    }

    static async getFamilies()
    {
        let families = [];
        try
        {
            families = await characters.distinct("family");
            return families;
        }
        catch(e)
        {
            console.error(`unable to get families, ${e}`);
            return families;
        }
    }
}