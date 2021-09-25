import React, { useState } from "react";

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
    <div>
      {/* {console.log(task)} */}
      <input
        autoFocus
        placeholder="Enter Task"
        type="text"
        onKeyPress={handleKey}
        value={input}
        onChange={handleChange}
      />
      <button onClick={submitTask}>Add to List</button>
      <br />
      <ul>
        {task.map((data) => {
          return (
            <li id={`li${data.id}`} key={data.id}>
              {data.name}{" "}
              <span>
                <button onClick={() => editTask(data.id)}>Edit</button>
              </span>{" "}
              <span>
                <button onClick={() => deleteTask(data.id)}>Delete</button>
              </span>{" "}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
