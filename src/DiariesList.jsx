import { useState } from "react";
import Diary from "./Diary";

function DiariesList() {
    const [diaries, setDiaries] = useState([
        { id: 1, title: "Diena 1", body: "Šodien centos tikt galā ar React.", date: "2025-05-08" },
        { id: 2, title: "Diena 2", body: "Laraveellll.", date: "2025-05-09" },
        { id: 3, title: "Diena 3", body: "Nopirku pienu un maizi.", date: "2025-05-10" },
    ]);

    const [newTitle, setNewTitle] = useState("");
    const [newBody, setNewBody] = useState("");

    function handleAddDiary(e) {
        e.preventDefault(); // novērš lapas pārlādi pēc formas nosūtīšanas
        
        //tiek veidots jauns objekts
        const newDiary = {
            id: crypto.randomUUID(), //ģenerē unikalu id
            title: newTitle,
            body: newBody,
            date: new Date().toISOString().slice(0, 10), // šodienas datums YYYY-MM-DD
        };

        setDiaries([...diaries, newDiary]); //pievieno ierakstu saraksta beigās
        setNewTitle("");//notira ievades laukus
        setNewBody("");
    }

    function handleDeleteDiary(id) { //dzes ierakstu pec id
        setDiaries((prev) => prev.filter(d => d.id !== id));
    }

    return (
        <div>
            
            <h3>Pievieno jaunu</h3>
            {/* Forma jauna ieraksta pievienošanai */}
            <form onSubmit={handleAddDiary}>
                <input
                    type="text"
                    placeholder="Virsraksts"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                />
                <br />
                <textarea
                    placeholder="Ieraksta saturs"
                    value={newBody}
                    onChange={(e) => setNewBody(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Pievienot ierakstu</button>
            </form>

            <hr />

            {/* izvada lai redz lietotajs */}
            {diaries.map((diary) => (
                <div key={diary.id} style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "5px",
                    backgroundColor: "#f9f9f9"
                }}>
                    <Diary {...diary} />
                    <button onClick={() => handleDeleteDiary(diary.id)}>❌ Dzēst</button>
                </div>
            ))}
        </div>
    );
}

export default DiariesList;
