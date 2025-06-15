import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {
  const [tab,setTab]=useState(1);
  const [task,setTask]=useState('')
  const [todos,setTodos]=useState(null)
  const [isEdit,setIsEdit]=useState(false)
  const [updateId,setUpdatedId]=useState(null)
  const [updatedTask,setUpdatedTask]=useState('')

  const handleTabs=(tab)=>{
    setTab(tab);
  }
  const handleAddTask=(e)=>{
    e.preventDefault();
    axios.post('http://localhost:5000/new-task',{task})
    .then(res=>{
      setTask('')
      setTodos(res.data)
    })
  }
  useEffect(()=>{
    axios.get('http://localhost:5000/read-tasks')
    .then(res=>{
       setTodos(res.data)
    })
  },[])
const handleEdit = (id) => {
    setIsEdit(true);
    setUpdatedId(id);
    const todoToUpdate = todos.find(todo => todo.id === id);
    if (todoToUpdate) {
      setUpdatedTask(todoToUpdate.task);
    }
  };

  const updateTask = () => {
    axios.put(`http://localhost:5000/update-task/${updateId}`, { task: updatedTask })
      .then(res => {
        setTodos(res.data);
        setIsEdit(false);
        setUpdatedTask('');
        setTask('');
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/delete-task/${id}`)
      .then(res => {
        setTodos(res.data);
      })
      .catch(err => console.log(err));
  };

  const handleComplete = (id) => {
    axios.put(`http://localhost:5000/complete-task/${id}`)
      .then(res => {
        setTodos(res.data);
        setTab(3);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (isEdit) {
      const todoToUpdate = todos.find(todo => todo.id === updateId);
      if (todoToUpdate) {
        setUpdatedTask(todoToUpdate.task);
      }
    }
  }, [isEdit, updateId, todos]);
 
  return (
    <div className='bg-gray-100 w-screen h-screen'>
      <div className='flex flex-col w-screen h-screen justify-center items-center'>
          <div>
            <h2 className='font-bold text-2xl mb-4'>Todo list</h2>
          </div>
          <div className='flex gap-3'>
            <input value={isEdit ? updatedTask : task} onChange={e => isEdit ? setUpdatedTask(e.target.value) : setTask(e.target.value)} type='text' placeholder="Enter todo" className='w-64 p-2 outline-none border border-blue-300 rounded-md'/>
            <button className='bg-blue-600 text-white px-4 rounded-md cursor-pointer' onClick={isEdit ? updateTask : handleAddTask}>{isEdit ? 'Update' : 'Add'}</button>
          </div>
          <div className='flex text-sm w-80 justify-evenly mt-4'>
            <p onClick={()=> handleTabs(1)} className={`${tab===1 ? 'text-blue-700' : 'text-black'} cursor-pointer`}>All</p>
            <p onClick={()=> handleTabs(2)} className={`${tab===2 ? 'text-blue-700' : 'text-black'} cursor-pointer`}>active</p>
            <p onClick={()=> handleTabs(3)} className={`${tab===3 ? 'text-blue-700' : 'text-black'} cursor-pointer`}>Completed</p>
          </div>
        {
          todos?.filter(todo => {
            if (tab === 2) {
              return todo.status === 'active';
            } else if (tab === 3) {
              return todo.status === 'completed';
            }
            return true;
          }).map(todo=>(
                <div className='flex justify-between bg-white p-3 w-80 mt-3'>
                  <div>
                      <p className='text-lg font-semibold'>{todo.task}</p>
                      <p className='text-xs text-gray-600'>{new Date(todo.createAt).toLocaleDateString()}</p>
                      <p className='text-sm text-gray-700'>Status: {todo.status}</p>
                    </div>
                    <div className='flex flex-col text-sm justify-start items-start'>
                      <button className='text-blue-600 cursor-pointer' onClick={()=>handleEdit(todo.id)}>Edit</button>
                      <button className='text-red-500 cursor-pointer' onClick={() => handleDelete(todo.id)}>Delete</button>
                      {todo.status !== 'completed' && <button className='text-green-600 cursor-pointer' onClick={() => handleComplete(todo.id)}>Completed</button>}
                    </div>
            </div>
          ))
        }
    </div>
    </div>
  )
}

export default Home