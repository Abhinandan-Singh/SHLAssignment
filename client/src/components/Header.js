import React, { useState } from 'react'
import Axios from 'axios';

const Header = ({updateProjects}) => {

    const [prompt, setPrompt] = useState('');
    //const [response, setResponse] = useState('');

    const handleKeyDown = (e) => {
        if(e.key === "Enter"){
            const inputTag = document.getElementsByTagName("input").item(0);
            if(inputTag.value !== ''){
                setPrompt(inputTag.value.trim());
                handleSubmit();
            }
            inputTag.value = '';
        }
    }

    const handleSubmit = async() => {
        try{
            const res = await Axios.post("http://localhost:3001/smartSearch", {text:prompt});
            if(res.status === 200){
                const resJson = res.data;
                console.log(resJson);
                updateProjects(resJson);
            }else{
                console.error('Error: ', res.statusText);
            }
        }catch(err){
            console.error(err);
        }
    }
  return (
    <header className='header'>
        <h1>Project Details Dashboard</h1>
        <div className="search-box">
            <button className="btn-search"><i className="fas fa-search"></i></button>
            <input type="text" className="input-search" placeholder="Type to Search..." onKeyDown={handleKeyDown}/>
        </div>
    </header>
  )
}

export default Header