export default function completed(){
    let renderList:any = <h2>No Task Completed</h2>;
    return <>
    
    <h1 className='bg-green-600 text-white p-5 text-5xl font-bold text-center'>Completed Task</h1>
    <hr></hr>
      <div className='mt-4 p-8 bg-slate-200'>
        <ul>
          {renderList}
        </ul>
      </div>
    </>

}