import "./App.css";
import ToDo from "./ToDo";
import DiariesList from "./DiariesList";
import React, { useState } from "react";

function App() {
    const [todos, setTodos] = useState([
        { id: 1, task: "Iemācīties React", completed: false },
        { id: 2, task: "Iemācīties Laravel", completed: true },
        { id: 3, task: "Nopirkt pienu", completed: false },
    ]);

    const [newTask, setNewTask] = useState("");

    function handleAdd(event) {
        event.preventDefault();

        const newTodo = {
            id: crypto.randomUUID(),
            task: newTask,
            completed: false,
        };

        setTodos([...todos, newTodo]);
        setNewTask(""); // notīra ievades lauku
        console.log("Added");
    }
    function handleDelete(id) {
        setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
    };

    return (
        <>
            <h1>Veicamie uzdevumi</h1>
            {todos.map((todo) => (
                <ToDo key={todo.id} {...todo} onDelete={handleDelete}/>
            ))}

            <form onSubmit={handleAdd}>
                <label>
                    <input
                        value={newTask}
                        onChange={(event) => setNewTask(event.target.value)}
                    />
                </label>
                <button type="submit">Saglabāt</button>
            </form>

            <h1>Diensagrāmatas ieraksti</h1>
            <DiariesList />
        </>
    );
}

export default App;
