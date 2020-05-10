import React from 'react'
import {Accordion,Card, Button} from 'react-bootstrap';
import UpdateTask from './AddTask';
import '../styles/Task.scss';


const Task =  (props) => {
    return (
        <Card className="task">
            <Card.Header>
                <p className="task__name">
                    <label>Name:</label>
                    {props.nameTask}
                </p>
                <p className="task_time">
                    <label>Time:</label>
                    {`${props.timeTask.hours}:${props.timeTask.minutes}:${props.timeTask.seconds}`}
                </p>
                <Button variant="success" onClick={() => {props.initTimer(props.timeTask , props.id )}}>Run!</Button>{' '}
                <Accordion.Toggle as={Button} variant="link" eventKey={`${props.eventKey}`}>
                    Edit
                </Accordion.Toggle>
                <Button variant="danger" onClick={() => {props.removeTasks(props.id , props.tasks)}}>Delete</Button>{' '}
            </Card.Header>
            <Accordion.Collapse eventKey={`${props.eventKey}`}>
                <Card.Body>
                    <UpdateTask tasks={props.tasks} updateTasks={props.updateTasks} setTasks={props.setTasks} nameTask={props.nameTask} timeTask={props.timeTask} id={props.id}/>
                </Card.Body>
            </Accordion.Collapse>
        </Card>

    )
}

export default Task