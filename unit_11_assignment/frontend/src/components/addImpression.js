/*Alvee Jalal
11/19/2023
IT 302001
Unit 11 Assignment 
ahj24@njit.edu*/
import React, { useState } from 'react';
import CharacterDataService from '../service/charactersDataService';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'

const AddImpression = props => {
    let editing = false;
    let initialImpressionState = "";

    if(props.location.state && props.location.state.currentImpression)
    {
        editing = true;
        initialImpressionState = props.location.state.currentImpression.impression;
    }

    const [impression, setImpression] = useState(initialImpressionState);
    const [submitted, setSubmitted] = useState(false);

    const onChangeImpression = e => {
        const impression = e.target.value;
        setImpression(impression);
    }

    const saveImpression = () => {
        var data = {
            impression: impression,
            user_name: props.user.user_name,
            user_id: props.user.id,
            character_id: props.match.params.id
        };
        if(editing)
        {
            data.impression_id = props.location.state.currentImpression._id
            CharacterDataService.updateImpression(data)
            .then(response => {
                setSubmitted(true);
                console.log(response.data)
            })
            .catch(e=> {
                console.log(e);
            })
            
        }
        else
        {
            CharacterDataService.createImpression(data)
            .then(response => {
                setSubmitted(true)
            }).catch(e=> { })
        }
    } 

    return (
        <div>
                                <br></br>
            {submitted ? (
                <div>
                                    <Card>
                    <h4>Impression submitted successfully</h4>
                    <Link to={"/ahj24_characters/"+ props.match.params.id}>
                        Back to character
                    </Link>
                    </Card>
                </div>
        
            ) : (
                <Card>
                <Form>
                    <Form.Group>
                        <Form.Label>{editing ? "Edit" : "Create"} Impression </Form.Label>
                        <Form.Control type="text" 
                        required 
                        value={impression} placeholder= "Type impression here" onChange={onChangeImpression}/>
                    </Form.Group>
                    <Button variant="primary" onClick={saveImpression}>Submit</Button>
                </Form>
                </Card>

            )}
            </div>
    )

}

export default AddImpression;