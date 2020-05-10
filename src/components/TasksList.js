import React from 'react';
import Task from './Task';
import {Accordion} from 'react-bootstrap';
import AddTask from './AddTask';

import '../styles/TasksList.scss';

const TasksList = (props) => {

    const convertTime = (time) => {
        if( time === 0 || time < 60) {
            return {seconds: 0, minutes:time, hours: 0};
        }
        else {
            const minutes =  time - 60 ;
            if (minutes === 60) {
                return {seconds: 0, minutes:0, hours: 2};
            }
            return {seconds: 0, minutes: minutes, hours: 1};
        }
    }

    const buildTasksList =  (tasks) => {

        if (!!tasks.length) {

            return (

            <div className="tasks-list__block">
                <Accordion className="tasks-list__block">
                {tasks.map((task, index) => (
                    <Task
                     key={`${task.time}-${index}`}
                     id={task._id}
                     tasks={props.tasks}
                     setTasks={props.setTasks}
                     nameTask={task.name} 
                     timeTask={task.time}
                     eventKey={index}
                     initTimer={props.initTimer}
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
                <AddTask tasks={props.tasks} setTasks={props.setTasks}></AddTask>
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