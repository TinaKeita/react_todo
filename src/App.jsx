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

    function handleAdd(event) {//apstrādā formu, kad pievieno jaunu uzdevumu
        event.preventDefault(); //neļauj lapai pašai pārlādēties

        const newTodo = {
            id: crypto.randomUUID(), //izveido jaunu objektu ar random unikālu id
            task: newTask,
            completed: false,
        };

        setTodos([...todos, newTodo]);
        setNewTask(""); // notirits ievades laiks
        console.log("Added");
    }
    function handleDelete(id) {//handelo dzēšanu
        setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
    };

    function handleToggle(id) { //handelo uzdevuma izveidi
        setTodos((prevTodos) =>
        prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    );
    }
    function handleEdit(id, newTask) { //handelo todo rediģēšanu
    setTodos((prevTodos) =>
        prevTodos.map((todo) =>
            todo.id === id ? { ...todo, task: newTask } : todo
        )
    );
}

    //atgrieztās vērtības
    return (
        <>
            <h1>Veicamie uzdevumi</h1>
            {todos.map((todo) => (
                <ToDo key={todo.id} {...todo} onDelete={handleDelete} onToggle={handleToggle} onEdit={handleEdit}/>
            ))}
            <br />
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
