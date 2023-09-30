import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import Card from './components/Card';
import Details from './components/Details';
import Header from './components/Header';

const API_BASE = "http://localhost:3001"
const App = () => {
  const [projects, setProjects] = useState([]);
  const [sidepanelVisible, setSidepanelVisible] = useState(false);
  const [currentId, setCurrentId] = useState('');

  const handleToggle = (id) => {
    setSidepanelVisible(!sidepanelVisible);
    setCurrentId(id);
  }

  const closePanel = () => {
    setSidepanelVisible(false);
  }
  
  const GetProjects = async () => {
    const res = await Axios.get(API_BASE + "/projects");
    const resJson = res.data;
    setProjects(resJson);
  }
  
  useEffect(()=>{
    GetProjects();
  }, []);

  return (
    <div className="App">
      <Header/>
      <div className="container">
        {
          projects.map((project) => {
            return <Card project={project} key={project._id} handleToggle={handleToggle}/>
          })
        }
      </div>
      {
        sidepanelVisible && 
        <div className='overlay'>
          <Details data={projects.find(obj => obj._id === currentId)} closePanel={closePanel}/>
        </div>
      }
    </div>
  )
}

export default App