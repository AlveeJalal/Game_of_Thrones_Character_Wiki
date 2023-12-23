/*Alvee Jalal
11/19/2023
IT 302001
Unit 11 Assignment 
ahj24@njit.edu*/
import express from 'express';
import cors from 'cors';
import characters from './api/characters.route.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/ahj24/characters", characters);
app.use('*',(req,res)=>{
    res.status(404).json({error:"not found"});
});

export default app;