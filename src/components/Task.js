import React from 'react'
import {Accordion,Card, Button} from 'react-bootstrap';
import '../styles/Task.scss';

const Task =  (props) => {
    console.log(props.eventKey);
    return (
        <Card className="task">
            <Card.Header>
                <p className="task__name">
                    <label>Name:</label>
                    {props.nameTask}
                </p>
                <p className="task_time">
                    <label>Time:</label>
                    {props.timeTask}
                </p>
                <Button variant="success">Run!</Button>{' '}
                <Accordion.Toggle as={Button} variant="link" eventKey={`${props.eventKey}`}>
                    Edit
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={`${props.eventKey}`}>
                <Card.Body>Hello! I'm the body</Card.Body>
            </Accordion.Collapse>
        </Card>

    )
}

export default Task