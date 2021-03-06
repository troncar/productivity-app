import React, {useState, useRef} from 'react';
import {Form, Button } from 'react-bootstrap';

import '../styles/AddTask.scss';

const AddTask = (props) => {
    const inputName = useRef(null);
    const inputTime = useRef(null);
    const [validated, setValidated] = useState(false);

    const handleSubmit = (evt) => {
        const form = evt.currentTarget;
        if (form.checkValidity() === false) {
            evt.preventDefault();
            evt.stopPropagation();
        } 
        props.setTasks( prevState => (
            [...prevState,{ name:inputName.current.value, time:inputTime.current.value }])
            );
        setValidated(true);
        evt.preventDefault();
    }

    return(
        <Form className="add-task" noValidate validated={validated} onSubmit={handleSubmit}> 
            <Form.Group controlId="formAddName">
                <Form.Label>Name Task</Form.Label>
                <Form.Control ref={inputName} required type="text" placeholder="Enter name tasks"/>
                <Form.Control.Feedback type="invalid">
                    This field is required
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formAddTime">
                <Form.Label>Time</Form.Label>
                <Form.Control ref={inputTime} required min="1" max="120" type="number" placeholder="20" />
                <Form.Text className="text-muted">
                    The max time are 120 minutes that equal to 2 hours.
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                    The max time is 120 minutes.
                </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    )
}

export default AddTask;