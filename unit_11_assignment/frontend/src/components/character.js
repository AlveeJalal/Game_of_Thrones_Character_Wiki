/*Alvee Jalal
11/19/2023
IT 302001
Unit 11 Assignment 
ahj24@njit.edu*/
import React, {useState, useEffect} from 'react';
import CharacterDataService from '../service/charactersDataService';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Media from 'react-bootstrap/Media';


const Character = props =>{
    const [character, setCharacter] = useState({
        id: null,
        firstName:"",
        lastName:"",
        fullName:"",
        title: "",
        family: "",
        Bio:"",
        impressions:[]

    });

    const getCharacter = id =>{
        CharacterDataService.get(id)
        .then(response => {
            setCharacter(response.data)
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        })
    }

    useEffect( ()=> {
        getCharacter(props.match.params.id)
    }, [props.match.params.id])


    const deleteImpression = (impressionId, index) => {
        CharacterDataService.deleteImpression(impressionId, props.user.id)
        .then(response => {
            console.log(response)
            setCharacter((prevState) => {
                prevState.impressions.splice(index,1);
                return({...prevState });
            })
        })
        .catch(e => {
            console.log(e);
        })
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                    <Card style={{width: '18rem'}}>
                        <Image src={character.imageUrl} fluid/>
                        </Card>
                    </Col>
                    <Col>
                    <Card>
                        <Card.Header as="h5">{character.fullName}</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                Family: {character.family}
                            </Card.Text>
                            <Card.Text>
                                Title: {character.title}
                            </Card.Text>
                            <Card.Text>
                                 {character.Bio}
                            </Card.Text>
                            {props.user && 
                            <Link to={"/ahj24_characters/" + props.match.params.id + "/impression"}>
                            Add Impression
                            </Link>} 
                                  
                        </Card.Body>
                        </Card>
                        </Col>
                </Row>
                <br></br>
                <br></br>

                    <Card>
                    <Card.Body>
                    <br></br>
                    <h2>User impressions on {character.firstName}:   </h2>
                    <br></br>
                    {character.impressions.map((impression,index)=>{
                    return(
                        <Media key={index}>
                            <Media.Body>
                                {console.log(impression.user_name)}
                                <h5>{impression.user_name + " reviewed on " + new Date(Date.parse(impression.lastModified)).toDateString()}:</h5>
                                <p>"{impression.impression}"</p>
                                {props.user && props.user.id === impression.user_id &&
                                <Row>
                                    <Col>
                                    <Link to={{
                                        pathname:"/ahj24_characters/"+props.match.params.id+"/impression",
                                        state: {currentImpression: impression}
                                    }}>Edit Impression</Link>
                                    </Col>
                                    <Col><Button variant="link" onClick={ ()=> deleteImpression(impression._id, index)}> Delete Impression </Button></Col>
                                </Row>
                                }
                            </Media.Body>
                        </Media>

                    )
                    })}
                </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default Character;