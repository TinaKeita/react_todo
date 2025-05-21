import "./App.css";
import ToDo from "./ToDo";
import DiariesList from "./DiariesList";
import { useEffect, useState } from "react";

function getLocalTodos() {
  const stored = localStorage.getItem("todos");
  return stored ? JSON.parse(stored) : [];
}

function App() {
    const [todos, setTodos] = useState(getLocalTodos);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

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
