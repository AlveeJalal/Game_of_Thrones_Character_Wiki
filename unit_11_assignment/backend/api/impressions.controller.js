/*Alvee Jalal
11/19/2023
IT 302001
Unit 11 Assignment 
ahj24@njit.edu*/

import impressionsDAO from '../dao/impressionsDAO.js';

export default class impressionsController{
static async apiPostImpression(req,res,next) {
    try{
        const characterId = req.body.character_id;
        const impression = req.body.impression;
        const userInfo ={ 
            username: req.body.user_name,
            userId: req.body.user_id
    }

        const lastModified = new Date();
        const impressionResponse = await impressionsDAO.addImpression(
            characterId,
            userInfo, 
            impression,
            lastModified
        )
        res.json(impressionResponse)
    }
    catch(e)
    {
        res.status(500).json({error: e.message})
    } 

}

static async apiUpdateImpression(req,res,next)
{
    try{
        const impressionId = req.body.impression_id;
        const impression = req.body.impression;
        const userId = req.body.user_id;
        const lastModified = new Date();

        const impressionResponse = await impressionsDAO.updateImpression(
            impressionId,
            userId,
            impression,
            lastModified
            )

            var { error } = impressionResponse;
            if(error)
            {
                res.status.json({error})
            }
            if(impressionResponse.modifiedCount===0)
            {
                throw new Error("Unable to update impression. User may not be original poster");
            }
            res.json(impressionResponse)
        }
        catch(e)
        {
            res.status(500).json({error: e.message});
        }
    }

    static async apiDeleteImpression(req,res,next)
    {
        try{
            const impressionId = req.body.impression_id;
            const userId = req.body.user_id;
            const impressionResponse = await impressionsDAO.deleteImpression(
                impressionId, 
                userId,
            )
            res.json(impressionResponse);
        }
        catch(e)
        {
            res.status(500).json({error: e.message});
        }
    }


}


