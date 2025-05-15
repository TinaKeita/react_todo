import { useState } from "react"; //izsauc usestate lai varētu izmantot lokālos stāvokļus

function ToDo({ id, task, completed, onDelete, onToggle, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task);

    function handleSave() {
        onEdit(id, editedTask); // padod id un editoto tekstu
        setIsEditing(false); //seto us false so edit input logs nerādās
    }

    return (
        <article>
            <label>
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => onToggle(id)}
                />
            </label>

            {/*edit input field kas parādās kad uzspiež edit pogu*/}
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editedTask}
                        onChange={(e) => setEditedTask(e.target.value)}
                    />
                    <button onClick={handleSave}>💾</button> //izsauc save kas saglabā mainīto info
                </>
            ) : (
                <>
                    {task}
                    {' '}
                    <button onClick={() => setIsEditing(true)}>✏️</button>
                </>
            )}

            {' '}
            <button onClick={() => onDelete(id)}>❌</button>
        </article>
    );
}

export default ToDo;
