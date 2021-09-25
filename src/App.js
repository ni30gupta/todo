import React, { useState } from 'react'
// import useState from 'react'



function App() {
  const [task, setTask] = useState([])
  const [input, setInput] = useState("")



  const handleChange = (e) => {
    setInput(e.target.value)

  }
  const handleKey = (e) => {
    if (e.key === 'Enter') {
      submitTask()
    }
  }

  const submitTask = () => {
    if (input != "") {
      setTask([...task, input])
    }

    setInput("")
  }

  return (
    <div>
      <input placeholder="Enter Task" type="text" onKeyPress={handleKey} value={input} onChange={handleChange} />
      <button onClick={submitTask} >Add to List</button>
      <br />
      {
        task.map(data => {
          return (<h4>{data} <span><button>Edit</button></span> <span><button>Delete</button></span>  </h4>)
        })
      }
    </div>
  )
}

export default App

