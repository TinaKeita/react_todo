import "./App.css";
import ToDo from "./ToDo" 


function App() {
  const todos = [
    { task: "Iemācīties React", completed: false },
    { task: "Iemācīties Laravel", completed: true },
    { task: "Nopirkt pienu", completed: false },
  ];
  return (
    <>
      <h1>ToDo</h1>
      <ToDo
        task="Iemācīties React"
        completed={false}
      />
      <br />
      <ToDo
        task="Iemācīties Laravel"
        completed={true}
      />
    </>
  );
}
export default App;
              