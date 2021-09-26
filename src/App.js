import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import './App.css'
let fetchData = () => {
  let task_list = localStorage.getItem('task_list')
  if (task_list) {
    return JSON.parse(task_list)
  } else {
    return []
  }
}



function App() {
  const [task, setTask] = useState(fetchData);
  const [input, setInput] = useState("");
  const [isEdit, setisEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleKey = (e) => {
    if (e.key === "Enter") {
      submitTask();
    }
  };

  const submitTask = () => {
    if (input === "") {
      alert("enter data");
    } else if (input && isEdit) {
      setTask(
        task.map((item) => {
          if (item.id === editId) {
            return { ...item, name: input };
          }
          return item;
        })
      );
      setInput("");
      setisEdit(false);
      setEditId(null);
    } else {
      let id = new Date().getTime().toString();
      let actualTask = { id: id, name: input };
      setTask([...task, actualTask]);
    }
    setInput("");
    console.log(task);
    localStorage.setItem('data', JSON.stringify(task))
  };

  const deleteTask = (id) => {
    setTask(
      task.filter((data) => {
        return data.id !== id;
      })
    );
  };

  const editTask = (id) => {
    let editable = task.find((item) => {
      return item.id === id;
    });
    // console.log(editable);
    setInput(editable.name);
    setisEdit(true);
    setEditId(id);
  };

  React.useEffect(() => {
    localStorage.setItem('task_list', JSON.stringify(task))
  }, [task])

  return (
    <div className='main_app'>
      <h2 className="text-center mb-4 text-decoration-underline">TO DO APP</h2>
      {/* {console.log(task)} */}
      <div className="form-inline ">
        <input className="form-control mr-4 "
          autoFocus

          placeholder="Enter Task"
          type="text"
          onKeyPress={handleKey}
          value={input}
          onChange={handleChange}
        />
        <Button onClick={submitTask}>Add to List</Button>
      </div>
      <br />
      {/* <ul className='list'> */}
      {task.map((data) => {
        return (

          <Row className="mt-2 ">
            <Col className='bg-light align-self-center' sm={4}>
              <h6 id={`li${data.id}`} key={data.id}>
                {data.name}
              </h6>
            </Col>
            <Col sm={1}> <Button onClick={() => editTask(data.id)}>Edit</Button></Col>
            <Col sm={1}> <Button variant='danger' onClick={() => deleteTask(data.id)}>Delete</Button></Col>
          </Row>




        );
      })}
      {/* </ul> */}
    </div>
  );
}

export default App;
