/*Alvee Jalal
11/19/2023
IT 302001
Unit 11 Assignment 
ahj24@njit.edu*/

import charactersDAO from '../dao/charactersDAO.js'

export default class charactersController{
    static async apiGetCharacters(req,res,next) {
        const itemsPerPage = req.query.itemsPerPage ? parseInt(req.query.itemsPerPage): 20;
        const pageNumber = req.query.pageNumber ? parseInt(req.query.pageNumber) : 0;
        let filters = {};
        if(req.query.title)
        {
            filters.title = req.query.title;
        }
        else if(req.query.family)
        {   
            filters.family = req.query.family;
        }
        else if(req.query.fullName)
        {   
            filters.fullName = req.query.fullName;
        }
        else if(req.query.firstName)
        {   
            filters.firstName = req.query.firstName;
        }
        else if(req.query.lastName)
        {   
            filters.lastName = req.query.lastName;
        }
        const { charactersList, totalNumCharacters } = await charactersDAO.getCharacters({filters,pageNumber,itemsPerPage});

        let response = {
            characters:charactersList,
            pageNumber:pageNumber,
            filters: filters,
            entries_per_page: itemsPerPage,
            total_results: totalNumCharacters

        }
        res.json(response);
    }

    static async apiGetFamilies(req,res,next){
        try{
            let familyResponse = await charactersDAO.getFamilies()
            res.json(familyResponse)
        }
        catch(e){
            console.log(`api, ${e}`)
            res.status(500).json({error: e})
        }
    }
    

    static async apiGetCharacterById(req,res,next) {
        try{
            let id = req.params.id || {}
            let character = await charactersDAO.getCharacterById(id)
            if(!character){
                res.status(404).json({error: "not found!"})
                return
            }
            res.json(character)
        }
        catch(e)
        {
            console.log(`api, ${e}`)
            res.status(500).json({error: e})
        }
    }
}
