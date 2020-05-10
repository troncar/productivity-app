import React , {useRef, useState} from 'react';
import Task from './Task';
import {Accordion, Form} from 'react-bootstrap';
import AddTask from './AddTask';

import '../styles/TasksList.scss';


const TasksList = (props) => {
    const checkShort = useRef(null);
    const checkMedium = useRef(null);
    const checkLong = useRef(null);
    const checkAll = useRef(null);
    const [tasksFiltered, setTasksFiltered] = useState(props.tasks);

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

    const handleFilter =  (ref) => {
        const tasksList = [...props.tasks];
        let  tasksFilter = [];
        if(ref.current.checked){
            const maxTime = ref.current.getAttribute('data-time')
            if(maxTime > 60){
                tasksFilter = tasksList.filter(task => task.time.hours !== 0);
            }
            else if(maxTime > 30){
                tasksFilter = tasksList.filter(task => task.time.minutes > 30);
            }
            else if(maxTime <= 30 && maxTime > 0) {
                tasksFilter = tasksList.filter(task => task.time.minutes < 30);
            }
            else {
                tasksFilter = props.tasks;
            }
        }
        else {
            tasksFilter =  props.tasks;
        }
        setTasksFiltered(tasksFilter);
    }

    const buildTasksList =  (tasks) => {

        if (!!tasks.length) {

            return (

            <div className="tasks-list__block">
                <div className="tasks-list__filter">
                    {/* <Form> */}
                        <Form.Check  onClick={() => {handleFilter(checkAll)}}  ref={checkAll} inline data-time={0} label="All Tasks"  type={'radio'} name='time' />
                        <Form.Check onClick={() => {handleFilter(checkShort)}} ref={checkShort} inline data-time={30} label="Short Tasks"  type={'radio'} name='time' />
                        <Form.Check onClick={() => {handleFilter(checkMedium)}}  ref={checkMedium} inline data-time={60} label="Medium Tasks" type={'radio'} name='time' />
                        <Form.Check  onClick={() => {handleFilter(checkLong)}}  ref={checkLong} inline data-time={61} label="Long Tasks"  type={'radio'} name='time' />
                    {/* </Form> */}
                </div>
                <Accordion className="tasks-list__block">
                {tasks.map((task, index) => (
                    <Task
                     key={`${task.time}-${index}`}
                     id={task._id}
                     tasks={props.tasks}
                     setTasks={props.setTasks}
                     updateTasks={props.updateTasks}
                     removeTasks={props.removeTasks}
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
            {buildTasksList(tasksFiltered)}
        </div>
    )
}

export default TasksList;