/*Alvee Jalal
11/19/2023
IT 302001
Unit 11 Assignment 
ahj24@njit.edu*/
import React, { useState, useEffect } from 'react';
import CharacterDataService from "../service/charactersDataService";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

const CharactersList = props => {
    const [characters, setCharacters] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchfirstName, setSearchfirstName] = useState("");
    const [searchlastName, setSearchlastName] = useState("");
    const [searchfullName, setSearchfullName] = useState("");
    const [searchFamilies, setSearchFamilies] = useState("");
    const [families, setFamilies] = useState(["All Families"]);

    useEffect(()=> {
        retrieveCharacters();
        retrieveFamilies();
    }, [])

    const retrieveCharacters = () => {
        CharacterDataService.getAll()
        .then(response => {
            console.log(response.data);
            setCharacters(response.data.characters);
        })
        .catch(e=> {
            console.log(e);
        })
    }
    const retrieveFamilies = () => {
        CharacterDataService.getFamilies()
        .then(response => {
            console.log(response.data)
        //start with 'All Families' if user doesn't specify any families
            setFamilies(["All Families"].concat(response.data));
        })
        .catch(e => {
            console.log(e);
        })
    }

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value
        setSearchTitle(searchTitle);
    }
    const onChangeSearchfirstName = e => {
        const searchfirstName = e.target.value
        setSearchfirstName(searchfirstName);
    }
    const onChangeSearchlastName = e => {
        const searchlastName = e.target.value
        setSearchlastName(searchlastName);
    }
    const onChangeSearchfullName = e => {
        const searchfullName = e.target.value
        setSearchfullName(searchfullName);
    }
    const onChangeSearchFamilies = e => {
        const searchFamilies = e.target.value
        setSearchFamilies(searchFamilies);
    }
    
const find = (query, by) => {
    CharacterDataService.find(query, by)
    .then(response=>{
        console.log(response.data)
        setCharacters(response.data.characters)
    })
    .catch(e=> {
        console.log(e);
    })
}    

const findByTitle = () => {
    find(searchTitle, "title");
}

const findByfirstName = () =>{
    find(searchfirstName, "firstName");
}
const findBylastName = () =>{
    find(searchlastName, "lastName");
}
const findByfullName = () =>{
    find(searchfullName, "fullName");
}

const findByFamilies = () =>{
    if(searchFamilies==="All Families")
    {
        retrieveCharacters();
    }
    else
    {
        find(searchFamilies,"family");
    }
}

return (
    <div className="App">
    <Container>
        <Form>
            <Row>
                <Col>
                <Form.Group>
                    <Form.Control
                     type="text"
                     placeholder="Search by First Name"
                     value={searchfirstName}
                     onChange={onChangeSearchfirstName}
                        />
                </Form.Group>
                <Button
                variant="primary"
                type="button"
                onClick={findByfirstName}
                >
                    Search
                </Button>
                </Col>
            <Col>
                <Form.Group>
                    <Form.Control
                     type="text"
                     placeholder="Search by title"
                     value={searchTitle}
                     onChange={onChangeSearchTitle}
                        />
                </Form.Group>
                <Button
                variant="primary"
                type="button"
                onClick={findByTitle}
                >
                    Search
                </Button>
                </Col>
                </Row>
            <Row>
                <Col>
                <Form.Group>
                    <Form.Control
                     type="text"
                     placeholder="Search by Last Name"
                     value={searchlastName}
                     onChange={onChangeSearchlastName}
                        />
                </Form.Group>
                <Button
                variant="primary"
                type="button"
                onClick={findBylastName}
                >
                    Search
                </Button>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Control
                            as="select" onChange={onChangeSearchFamilies} >
                                {families.map(family=>{
                                    return(
                                        <option value={family}>{family}</option>
                                    )
                                })}
                        </Form.Control>
                    </Form.Group>
                    <Button 
                        variant="primary"
                        type="button"
                        onClick={findByFamilies}
                        >
                            Search
                        </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                <Form.Group>
                    <Form.Control
                     type="text"
                     placeholder="Search by Full Name"
                     value={searchfullName}
                     onChange={onChangeSearchfullName}
                        />
                </Form.Group>
                <Button
                variant="primary"
                type="button"
                onClick={findByfullName}
                >
                    Search
                </Button>
                </Col>
            </Row>
        </Form>
        <Row>
            {characters.map((character)=>{
            return(
                <Col>
                    <Card style={{width: '18rem'}}>
                        <Card.Img src={character.imageUrl}/>
                        <Card.Body>
                            <Card.Title>{character.fullName}</Card.Title>
                            <Card.Text>
                                Family: {character.family}
                            </Card.Text>
                            <Card.Text>Title: {character.title}</Card.Text>
                            <Link to={"/ahj24_characters/" + character._id } > View Impressions </Link>
                        </Card.Body>
                    </Card>
                </Col>
            )
            })}
        </Row>
    </Container>

    </div>
)


}

export default CharactersList;