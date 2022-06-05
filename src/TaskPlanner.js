import React from 'react'
import { BsFillCheckSquareFill, BsFillPlusSquareFill, BsFillSquareFill, BsFillTrashFill} from 'react-icons/bs'

//FUTURE FUNCIONALITY:
// - Mark STAR: only one task is marked as star, so it is the most important task to complete.


function TaskPlanner(props) {

    const [addTask, setAddTask] = React.useState('')

    function toggleCompleted(e) {
        e.completed = !e.completed
        const update = [...props.db].map(item => {
            return item.id === e.id ? e : item
        })
        props.setDb(update)
    }

    const items = props.db.map(e => (
        <div key={e.id} className='task-item'>
            <div className='task' onClick={() => toggleCompleted(e)}>
                {e.completed ? <BsFillCheckSquareFill /> : <BsFillSquareFill />}
                {e.completed ? <h3 className='completed'>{e.task}</h3> : <h3>{e.task}</h3>}
            </div>
            <div className='delete-btn' onClick={() => del(e)}><BsFillTrashFill /></div>
        </div>
    ))

    function handleChange(e){
        setAddTask(e.target.value)
    }
    function add(e){
        e.preventDefault()
        
        if (addTask) {
            let newId
            if (props.db.length > 0){
                newId = props.db[props.db.length-1].id + 1
            } else {
                newId = 1
            }
            const newTask = { 
                id: newId,
                task: addTask,
                completed: false,
                star: false
              }
    
            const updateDbDia = [...props.db]
            updateDbDia.push(newTask)
            props.setDb(updateDbDia)
    
            setAddTask('')
        }

        
    }

    function del(e) {
        
        const updateDbDia = []
        props.db.map((task) => {
            if (e.id !== task.id){
                updateDbDia.push(task)
            }
            return
        })
        props.setDb(updateDbDia)
    
    }

  return (
    <div className='tasks-container'>
        <h2>{props.title}</h2>
        <div className="task-list">
            {items}
            <form className='addtask-form' onSubmit={add}>
                <button className='addtask-btn'><BsFillPlusSquareFill /> </button>
                <input 
                    className='addtask-input' 
                    type="text"
                    name='taskToAdd'
                    value={addTask}
                    onChange={handleChange}
                    placeholder='adicionar tarefa...' 
                />
            </form>
             
        </div>
    </div>
  )
}

export default TaskPlanner