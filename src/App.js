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

  const [dbDia, setDbDia] = useState(tarefasDoDia)



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
  
  const dbSprints = ['do this', 'do that', 'do that other thing']


  // useEffect(() => {
  //   const tarefasDoDia = JSON.parse(localStorage.getItem('tarefasDoDia'))
  //   if (tarefasDoDia) {
  //     setDbDia(tarefasDoDia)
  //   }
  // },[])


  useEffect(() => {
    localStorage.setItem('tarefasDoDia', JSON.stringify(dbDia))
  }, [dbDia])
  
  
  return (
    <div className="App">
      <NavBar />
      <Pomodoro />
      <TaskPlanner
        title='Tarefas do dia'
        db={dbDia}
        setDbDia={setDbDia}
      />
      <TaskPlanner 
        title='Sprints'
        db={dbSprints}
      />
      <div className='tasks'>Tarefas do dia</div>
      <div>Sprint</div>
      <Footer />
    </div>
  );
}

export default App;
