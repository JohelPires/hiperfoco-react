import React from 'react'
import { BsFillCheckSquareFill, BsFillSquareFill, BsFillTrashFill} from 'react-icons/bs'

//FUTURE FUNCIONALITY:
// - Mark STAR: only one task is marked as star, so it is the most important task to complete.


function TaskPlanner(props) {

    function toggleCompleted() {
        
        //THIS FUNCTION CHANGES THE STATE OF db.completed

        
    }

    const items = props.db.map(e => (
        <div className='task-item'>
            <div className='task' onClick={toggleCompleted}>
                {e.completed ? <BsFillCheckSquareFill /> : <BsFillSquareFill />}
                {e.completed ? <h3 className='completed'>{e.task}</h3> : <h3>{e.task}</h3>}
            </div>
            <BsFillTrashFill />
        </div>
    ))

  return (
    <div className='tasks-container'>
        <h2>{props.title}</h2>
        <div className="task-list">
            {items}
             <h3>adicionar tarefa...</h3> {/*THIS SHOULD BE AN INPUT FIELD */}
        </div>
    </div>
  )
}

export default TaskPlanner