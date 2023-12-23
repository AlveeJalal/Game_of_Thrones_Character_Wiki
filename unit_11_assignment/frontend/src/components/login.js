/*Alvee Jalal
11/19/2023
IT 302001
Unit 11 Assignment 
ahj24@njit.edu*/
import React, {useState} from 'react'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Login = props => {
    const [user_name, setUser_Name] = useState("");
    const [id, setId] = useState("");

    const onChangeName = e =>{
        const user_name = e.target.value;
        setUser_Name(user_name);
    }

    const onChangeId = e => {
        const id = e.target.value;
        setId(id);
    }

    const login = () => {
        props.login({user_name: user_name, id: id});
        props.history.push('/');
    }

    return(
        <div>
            <br></br>
            <Card>
            <Form>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" 
                    value={user_name} onChange={onChangeName}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>ID</Form.Label>
                    <Form.Control type="text" placeholder="Enter ID" 
                    value={id} onChange={onChangeId}/>
                </Form.Group>
                <Button variant="primary" onClick={login}>Submit</Button>
            </Form>
            </Card>
        </div>
    )
}

export default Login;