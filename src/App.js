import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";



function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [techs, setTechs] = useState('');

  async function loadData(){
    const response = await api.get('repositories');
    setRepositories(response.data);
  }

  useEffect(()=>{
    loadData();
  },[]);
  async function handleAddRepository() {
    const techsArray = techs.split(';');

    const response = await api.post('repositories',{
      title,
      url,
      techs: techsArray.map(tech => tech.trim())
    });

    setRepositories([...repositories, response.data]);



  }

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>)
        })}
      </ul>

      <form>
        <label>
          Nome do repositório:
          <input 
          placeholder="Example"
          value={title} 
          onChange={(event)=>{setTitle(event.target.value)}}
          />
        </label>
        <label>
          Url do repositório:
          <input 
          placeholder="www.github.com/example/example"
          value={url} 
          onChange={(event)=>{setUrl(event.target.value)}}
          />
        </label>
        <label>
          Nome do repositório:
          <input 
          placeholder="NodeJs; ReactJS; React Native"
          value={techs} 
          onChange={(event)=>{setTechs(event.target.value)}}
          />
        </label>
      </form>
      <button onClick={handleAddRepository}>Adicionar</button>

     
    </div>
  );
}

export default App;
