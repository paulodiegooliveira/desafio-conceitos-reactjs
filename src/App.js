import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: "Repository list from Githubbriel",
      url: "https://github.com/paulodiegooliveira/react-github-repo-list",
      techs: ["ReactJS", "Node.js"],
    });
    const project = response.data;
    setProjects([...projects, project]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`);

    const returnRepo = projects.filter((item) => item.id !== id);

    setProjects(returnRepo);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
