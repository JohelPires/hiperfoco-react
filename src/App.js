import { useState, useEffect } from 'react';
import './App.scss';
import Footer from './Footer';
import NavBar from './NavBar';
import Pomodoro from './Pomodoro';
import TaskPlanner from './TaskPlanner';

// TO-DO: 
// MAKE IT RESPONSIVE
// MAY-BE ADD SOME SVG BACKGROUND TO EACH MODULE, LIKE A CLOCK IN POMODORO, ETC



function App() {

  const tarefasDoDia = JSON.parse(localStorage.getItem("tarefasDoDia")) || [];
  const sprints = JSON.parse(localStorage.getItem("sprints")) || [];

  const [dbDia, setDbDia] = useState(tarefasDoDia)
  const [dbSprints, setDbSprints] = useState(sprints)



  // const [dbDia, setDbDia] = useState(
  //   [{ 
  //     id: 1,
  //     task: 'Add localstorage functionality',
  //     completed: false,
  //     star: false
  //   },
  //   { 
  //     id: 2,
  //     task: 'arrumar cozinha/sala',
  //     completed: false,
  //     star: false
  //   },
  //   { 
  //     id: 3,
  //     task: 'finish the git/github tutorial',
  //     completed: false,
  //     star: false
  //   },
  //   { 
  //     id: 4,
  //     task: 'Learn React Router',
  //     completed: false,
  //     star: false
  //   }
  // ])

  // const dbSprints = ['do this', 'do that', 'do that other thing']


  // useEffect(() => {
  //   const tarefasDoDia = JSON.parse(localStorage.getItem('tarefasDoDia'))
  //   if (tarefasDoDia) {
  //     setDbDia(tarefasDoDia)
  //   }
  // },[])


  useEffect(() => {
    localStorage.setItem('tarefasDoDia', JSON.stringify(dbDia))
  }, [dbDia])

  useEffect(() => {
    localStorage.setItem('sprints', JSON.stringify(dbSprints))
  }, [dbSprints])


  return (
    <div className="App">
      <NavBar />
      <main className='conteudo'>
        <Pomodoro />
        <TaskPlanner
          title='Tarefas do dia'
          db={dbDia}
          setDb={setDbDia}
        />
        <TaskPlanner
          title='Tarefas do Sprint'
          db={dbSprints}
          setDb={setDbSprints}
        />
        
        
      </main>
      <Footer />
    </div>
  );
}

export default App;
