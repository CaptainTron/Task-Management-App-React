import { Link } from 'react-router-dom';
import './App.css';
import TaskList from './Components/TaskList';
import "./Components/UpdateTask/UpdateTask.css"

function App() {


  return (
    <div className='Task'>
      <div className='createtaskcontainer'>
        <p className='Headings'>My Task Manager</p>
        <Link to="/createtask"><div className='CreateTaskbtn'><p className='CreateTasktxt'>+ Create New Task</p></div></Link>
      </div>

      <p className='Mytaskstxt'>My Tasks <span className='sidetextmytasts'>(Click on Task to edit)</span></p>
      <div className='TaskContainer'>
        <TaskList />
      </div>
      <p className='NoteHere'><Link to="/note"> Note</Link></p>
    </div>
  );
}

export default App;
