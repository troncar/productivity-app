import React, {useState} from 'react';
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
    const [tasks,setTasks] = useState(initialStateStaks);
    const [formVisible, setFormVisible] = useState(false);
    const [graphVisble, setGraphVisible] = useState(false);

    const showForm = () => {
        setFormVisible(!formVisible);
    }

    const showGraph = () => {
        setFormVisible(!graphVisble);
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
                        <Timer/>
                        <TasksList tasks={tasks} setTasks={setTasks}></TasksList>
                    </div>
                )}
            </div>
        </div>
    
    )

}

export default Dashboard;
