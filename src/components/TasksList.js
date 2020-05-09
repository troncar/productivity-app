import React from 'react';
import Task from './Task';
import {Accordion} from 'react-bootstrap';
import AddTask from './AddTask';

import '../styles/TasksList.scss';

const TasksList = (props) => {

    const buildTasksList =  (tasks) => {
        if (!!tasks.length) {
            return (

            <div className="tasks-list__block">
                <Accordion className="tasks-list__block">
                {tasks.map((task, index) => (
                    <Task
                     key={`${task.time}-${index}`}
                     nameTask={task.name} 
                     timeTask={task.time}
                     eventKey={index}
                    />
                ))}
                </Accordion>
            </div>
            )
        } 
        else {
            return (
            <div> 
                <h4>You dont have any tasks. Add one in the form below </h4>
                <AddTask setTasks={props.setTasks}></AddTask>
            </div>)
        }
    }

    return(
        <div className="tasks-list">
            <h2>Tasks List!</h2>
            {buildTasksList(props.tasks)}
        </div>
    )
}

export default TasksList;