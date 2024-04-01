"use client"

import router, { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const page = () => {

  const [task, settask] = useState("");
  const [taskList, settaskList] = useState([]);


  const submitHandler = (e:any) => {
    e.preventDefault();
    if ('' === task || undefined === task) {
    
      alert('Fields can not be blank');
    return;
  }
    settaskList([...taskList,{task}]);
    settask("");
  }

  const deleteHandler =(i) => {
    let temp = [...taskList];
    temp.splice(i,1);
    settaskList(temp);
  }
  
  let renderTask:any = <h2>No Task Available</h2>;




  if(taskList.length>0){
    
  renderTask = taskList.map((t,i) => {
    return <>
    <li key={i} className='flex items-center justify-between'>
    <div className='flex items-center  justify-between mb-5'>
      <h5 className='text-xl font-semibold'>{t.task}</h5>
    </div>
    <div className="flex items-center mb-4">
    <input id="default-checkbox" type="checkbox" value="" key={i} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
    <label htmlFor="default-checkbox" className="ms-2 text-xl font-semibold text-gray-900 dark:text-black-300">Completed</label>
</div>
    <button onClick={()=>{deleteHandler(i)}}  className='bg-red-400 text-white px-4 py-2 rounded font-bold'>Delete</button>
    </li>
    </>
  })
}
const router = useRouter();
  return (
    <>
    
    <h1 className='bg-black text-white p-5 text-5xl font-bold text-center'>Todo List</h1>
    <button className='bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 text-white px-4 py-3 text-2xl font-bold rounded m-5' onClick={() => router.push('/completed')}>Completed</button>
    
    
    <form onSubmit={submitHandler}>
      <input placeholder="Enter task Here..." type='text' className='text-2xl border-zinc-800 border-4 m-8 px-4 py-2'
      value={task} onChange={(e) =>{
        settask(e.target.value)
      }}></input>
      <button className='bg-black text-white px-4 py-3 text-2xl font-bold rounded m-5'>Add Task</button>
    </form>
    <hr></hr>
      <div className='p-8 bg-slate-200'>
        <ul>
          {renderTask}
        </ul>
      </div>
    </>
  )
}

export default page