import React, { useState } from "react";

const TodoItem = ({ todo, updateTodo, deleteTodo }) => {
  const [mode, setMode] = useState("view");
  const [title, setTitle] = useState((todo || {}).title);
  const [completed, setCompleted] = useState((todo || {}).completed);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleUpdate = async (e, type) => {
    e.preventDefault();
    let updated = todo;
    if(type === 'title') {
    updated = { ...todo, title };
    }
    if(type === 'status') {
        updated = { ...todo, completed: !todo.completed};
     }
    await updateTodo(todo.id, updated);
    setMode("view");
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteTodo(todo.id);
  };

  return (
    <>
      {mode === "view" && (
        <div
          style={{
            borderRadius: "5px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            width: "60%",
            border: "1px solid grey",
            margin: "5px auto",
            height: "20px",
          }}
        >
          <h6>{todo.title} {todo.completed? '✅':''}</h6>
          <div>
            { !todo.completed &&
                <button
                onClick={(e) => handleUpdate(e, 'status')}
                style={{
                  borderRadius: "3px",
                  height: "18px",
                  fontSize: "12px",
                  backgroundColor: "#f5e3b0",
                  border: "none",
                }}
              >
                Done
              </button>
            }
            
            <button
              onClick={() => setMode("edit")}
              style={{
                borderRadius: "3px",
                height: "18px",
                fontSize: "12px",
                backgroundColor: "#437042",
                margin: "0 4px",
                color: "white",
                border: "none",
              }}
            >
              Edit
            </button>
            <button
              onClick={(e) => handleDelete(e)}
              style={{
                borderRadius: "3px",
                height: "18px",
                fontSize: "12px",
                backgroundColor: "#e693a5",
                border: "none",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
      {mode === "edit" && (
        <div
          style={{
            borderRadius: "5px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            width: "60%",
            border: "1px solid grey",
            margin: "5px auto",
            height: "20px",
          }}
        >
          <input
            type="text"
            value={title}c
            onChange={(e) => handleChange(e)}
          ></input>
          <button onClick={(e) => handleUpdate(e, 'title')} style={{ margin: "0 5px" }}>
            {" "}
            Save{" "}
          </button>
          <button onClick={() => setMode("view")}> Cancel </button>
        </div>
      )}
    </>
  );
};

export default TodoItem;
