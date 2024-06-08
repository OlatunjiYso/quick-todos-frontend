import React, { useEffect, useState } from 'react';
import TodoItem from './todoItem';

const TodoList = ()=> {

    const ROOT_URL = 'https://quicktodos.azurewebsites.net/api/TodoItems'
    const [ todos, setTodos ] = useState([]);
    const [ title, setTitle ] = useState('');



    const fetchTodos = async()=> {
        try {
            const response = await fetch(ROOT_URL);
            let allTodos = await response.json();
            allTodos = allTodos.sort((td1,td2)=> td2.id - td1.id)
            setTodos(allTodos);
        }
        catch(err){
            alert('an error happend!')
        }
    };
    const addTodo = async(e)=> {
        e.preventDefault();
        if(!title || !title.trim()) return;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title })
        };
        try{
            const response = await fetch(ROOT_URL, requestOptions);
           const newTodo = await response.json();
           setTodos([ newTodo, ...todos ]);
           setTitle('')
        } catch(err) {

        }
        
    }
    const updateTodo = async(id, todo)=>{
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todo)
        };
        try {
            await fetch(`${ROOT_URL}/${id}`, requestOptions);
            const newTodos = todos.map((td)=>{
                if(td.id === todo.id) {
                    td.title = todo.title;
                    td.completed = todo.completed
                }
                return td;
            });
            setTodos(newTodos);
        } 
        catch(err) {

        }
    }
    const deleteTodo = async(id)=> {
        try {
            await fetch(`${ROOT_URL}/${id}`, { method: 'DELETE' });
            const updated = todos.filter((td)=> td.id !== id);
            setTodos(updated);
        }
        catch(err) {

        }
    }

    useEffect(()=>{
        fetchTodos();
    },[])

  return (
    <div style={{width:'50%', margin: '20px auto'}}>
    <h3> Quick Todos</h3>
    <div style={{margin: '10px auto 50px auto'}}>
        <input type='text' value={title} onChange={(e)=>setTitle(e.target.value)}/>
        <button style={{margin: '0 8px'}} onClick={(e)=>addTodo(e)}> Add  </button>
    </div>
    { 
        todos.map((todo)=> <TodoItem key={todo.id} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo}/>)
    }

    </div>
  )
}

export default TodoList;