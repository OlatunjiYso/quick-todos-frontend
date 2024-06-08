import React, { useState } from "react";

const TodoItem = ({ todo, updateTodo, deleteTodo }) => {
  const [mode, setMode] = useState("view");
  const [title, setTitle] = useState((todo || {}).title);
  const [busy, setBusy] = useState(false);

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
     try {
    setBusy(true);
    await updateTodo(todo.id, updated);
    setMode("view");
    setBusy(false)
     }
      catch(err){
        setBusy(false)
     }
    
  };
  const handleDelete = async (e) => {
    try{
        setBusy(true);
        e.preventDefault();
        await deleteTodo(todo.id);
        setBusy(false);
    }
    catch(err) {
        setBusy(false);
    }
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
            width: "70%",
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
                  cursor:'pointer'
                }}
                disabled={busy}
              >
               { busy? 'Marking...' : 'Mark as Done'}
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
                cursor:'pointer'
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
                cursor:'pointer'
              }}
              disabled={busy}
            >
             { busy? 'Deleting' : 'Delete'}
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
            width: "70%",
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
          <button onClick={(e) => handleUpdate(e, 'title')} style={{ margin: "0 5px" }} disabled={busy}>
            {busy ? 'Saving': 'Save'}
          </button>
          <button onClick={() => setMode("view")}> Cancel </button>
        </div>
      )}
    </>
  );
};

export default TodoItem;
