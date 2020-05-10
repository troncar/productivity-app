import React, {useState, useEffect} from 'react';
// import components
import TasksList from './TasksList';
import Timer from './Timer';
import AddTask from './AddTask';
// import componencts Boostrap
import { Navbar, Nav } from 'react-bootstrap';
// import styles
import '../styles/Dashboard.scss';

const Dashboard = () => {
    const initialStateStaks = [];
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || initialStateStaks);
    const [formVisible, setFormVisible] = useState(false);
    const [graphVisble, setGraphVisible] = useState(false);
    const [start, setStart] = useState(false);
    const [timeCounter, setTimeCounter] = useState(0);
    const [currentTask, setCurrentTask] = useState('');
    const [counter, setCounter] = useState({seconds: 0, minutes:0, hours: 0})

    useEffect(() => {
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => { 
        setCounter(counter);
        setTimeCounter(counter.minutes);
        if(!!currentTask){
            const taskUpdate = tasks.filter( task => task._id === currentTask);
            taskUpdate[0].time = timeCounter;
            updateTasks(currentTask, tasks, taskUpdate)   
        }
    },[counter]);

    const showForm = () => {
        setFormVisible(!formVisible);
    }

    const showGraph = () => {
        setFormVisible(!graphVisble);
    }

    const updateTasks = (id, tasks, updateTask) => {
        if(tasks && id){
            const task = tasks.filter((task) => {
                if(task._id === id) {
                    console.log(task)
                    task.name =  updateTask[0].name;
                    task.time = updateTask[0].time;
                }
            });
            setTasks( prevState => ([...prevState]));
        }
    }

    const initTimer = (time, id ) => {
        let {seconds,minutes,hours} = {...time};
        setCurrentTask(id);
        if(timeCounter !== 0) {
            setTimeCounter(timeCounter);
        }
        else {
            setTimeCounter(minutes);
        }
        setCounter({seconds: seconds, minutes:minutes, hours: hours})
        setStart(!start);
    }



    return (
        <div>
            <Navbar expand="lg">
                <Navbar.Brand href="#home">Track Your Time</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link  onClick={showForm}>Add new tasks</Nav.Link>
                        <Nav.Link  onClick={showGraph}>Go to the list</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="container">
                {formVisible ? (
                   <AddTask tasks={tasks} setTasks={setTasks}/>
                ):(
                    <div className="dashboard">
                        <Timer counter={counter} setCounter={setCounter} start={start}/>
                        <TasksList tasks={tasks} setTasks={setTasks} initTimer={initTimer}></TasksList>
                    </div>
                )}
            </div>
        </div>
    
    )

}

export default Dashboard;
