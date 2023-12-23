/*Alvee Jalal
11/19/2023
IT 302001
Unit 11 Assignment 
ahj24@njit.edu*/
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let impressions;
export default class impressionsDAO{
    static async injectDB(conn)
    {
        if(impressions)
        {
            return
        }
        try{
            impressions = await conn.db(process.env.CHARACTERS_NS).collection('impressions');
        }
        catch(e){
            console.error(`unable to establish connection handle in impressionsDAO: ${e}`);
        }
    }

    static async addImpression(characterId, user, impression, lastModified)
    {
        try{
            const impressionsDoc = {
                user_name: user.username,
                user_id: user.userId,
                lastModified: lastModified,
                impression: impression,
                character_id: new ObjectId(characterId)
            };
            return await impressions.insertOne(impressionsDoc);
        }
        catch(e)
        {
            console.error(`Unable to post impression: ${e}`)
            console.error(e)
            return { error: e};
        }

    }

    static async updateImpression(impressionId, userId, impression, lastModified)
    {
        try {
            const updateResponse = await impressions.updateOne(
                {user_id: userId, _id: new ObjectId(impressionId)},
                {$set: {impression: impression, lastModified:lastModified }}
            )
            return updateResponse
        }

        catch(e)
        {
            console.error(`Unable to update impression: ${e}`)
            console.error(e)
            return {error: e}
        }
    }

    static async deleteImpression(impressionId, userId)
    {
        try{
            const deleteResponse = await impressions.deleteOne({
                _id: new ObjectId(impressionId),
                user_id: userId,
            })
            return deleteResponse;
        }
        catch(e)
        {
            console.error(`unable to delete impression: ${e}`)
            console.error(e)
            return {error: e.message}
        }
    }
}