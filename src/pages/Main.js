import { useState, useEffect } from 'react'
import React from 'react'
import Pomodoro from '../Pomodoro'
import TaskPlanner from '../TaskPlanner'
import 'animate.css'

function Main() {
  const tarefasDoDia = JSON.parse(localStorage.getItem('tarefasDoDia')) || []
  const sprints = JSON.parse(localStorage.getItem('sprints')) || []

  console.log(tarefasDoDia)

  const [dbDia, setDbDia] = useState(tarefasDoDia)
  const [dbSprints, setDbSprints] = useState(sprints)

  useEffect(() => {
    localStorage.setItem('tarefasDoDia', JSON.stringify(dbDia))
  }, [dbDia])

  useEffect(() => {
    localStorage.setItem('sprints', JSON.stringify(dbSprints))
  }, [dbSprints])
  return (
    <main className='conteudo'>
      <Pomodoro />
      <TaskPlanner title='Tarefas do dia' db={dbDia} setDb={setDbDia} />
      <TaskPlanner
        title='Tarefas do Sprint'
        db={dbSprints}
        setDb={setDbSprints}
      />
    </main>
  )
}

export default Main
