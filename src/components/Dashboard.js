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
    const [tasksComplete, setTasksComplete] = useState(JSON.parse(localStorage.getItem('tasksComplete')) || initialStateStaks);
    const [formVisible, setFormVisible] = useState(false);
    const [graphVisble, setGraphVisible] = useState(false);
    const [dashVisible, setDashVisible] = useState(true);
    const [start, setStart] = useState(false);
    const [timeCounter, setTimeCounter] = useState({});
    const [currentTask, setCurrentTask] = useState('');
    const [counter, setCounter] = useState({seconds: 0, minutes:0, hours: 0})

    useEffect(() => {
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }, [tasks]);


    useEffect(() => {
        localStorage.setItem('tasksComplete',JSON.stringify(tasksComplete));
        console.log(tasksComplete);
    }, [tasksComplete]);

    useEffect(() => { 
        setCounter(counter);
        setTimeCounter(counter);
        if(!!currentTask && !!timeCounter){
            const taskUpdate = tasks.filter( task => task._id === currentTask);
            taskUpdate[0].time = timeCounter;
            updateTasks(currentTask, tasks, taskUpdate)   
        }
    },[counter]);

    const showForm = () => {
        setFormVisible(true);
        setDashVisible(false);
    }

    const showGraph = () => {
        setFormVisible(!graphVisble);
    }

    const showDashboard = () => {
        setFormVisible(false);
        setDashVisible(true);
    }

    const removeTasks =  (id, tasks) => {
        const tasksValid =  tasks.filter( task => task._id !== id);
        setTasks(tasksValid);
    }

    const completeTasks = (id, tasks) => {
        const taskToComplete = tasks.filter( task => task._id === id);
        if(taskToComplete){
            const taskCompleted = taskToComplete[0];
            setTasksComplete((prev) => (
                    [...prev, {...taskCompleted}]
                )
            );
            removeTasks(id, tasks);
        }  
    }

    const updateTasks = (id, tasks, updateTask) => {
        if(tasks && id){
            const task = tasks.filter((task) => {
                if(task._id === id) {
                    task.name =  updateTask[0].name;
                    task.time = updateTask[0].time;
                }
            });
            setTasks( prevState => ([...prevState]));
        }
    }

    const isEmpty = (obj) => {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    const initTimer = (time, id ) => {
        let {seconds,minutes,hours} = {...time};
        setCurrentTask(id);
        if(!isEmpty(timeCounter)) {
            setTimeCounter(timeCounter);
        }
        else {
            setTimeCounter(time);
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
                        <Nav.Link  onClick={showDashboard}>Go to the list</Nav.Link>
                        <Nav.Link  onClick={showDashboard}>Completed Tasks</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="container">
                {formVisible && !dashVisible ? (
                   <AddTask tasks={tasks} setTasks={setTasks}/>
                ):(
                    <div className="dashboard">
                        <Timer counter={counter} setCounter={setCounter} start={start}/>
                        <TasksList tasks={tasks} 
                            setTasks={setTasks} 
                            initTimer={initTimer} 
                            updateTasks={updateTasks} 
                            removeTasks={removeTasks}
                            completeTasks={completeTasks}
                            ></TasksList>
                    </div>
                )}
            </div>
        </div>
    
    )

}

export default Dashboard;
