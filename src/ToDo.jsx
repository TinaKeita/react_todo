import { useState } from "react";

function ToDo({ id, task, completed, onDelete }) {
    const [check, setCheck] = useState(completed);

    return (
        <article>
            <label>
                <input
                    type="checkbox"
                    checked={check}
                    onChange={() => setCheck(!check)}
                />
                {task}
            </label>
            <button onClick={() => onDelete(id)}>❌</button>
        </article>
    );
}

export default ToDo;
