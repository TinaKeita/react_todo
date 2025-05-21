import Diary from "./Diary";
import { useState, useEffect } from "react";

function getLocalDiaries() {
  const stored = localStorage.getItem("diaries");
  return stored ? JSON.parse(stored) : [];
}

function DiariesList() {
    // sākotnējais saraksts ar dienasgrāmatas ierakstiem
    const [diaries, setDiaries] = useState(getLocalDiaries);

    useEffect(() => {
        localStorage.setItem("diaries", JSON.stringify(diaries));
    }, [diaries]);

    // stāvokļi jaunā ieraksta izveidei
    const [newTitle, setNewTitle] = useState("");
    const [newBody, setNewBody] = useState("");

    //  Jauni stāvokļi rediģēšanas funkcionalitātei
    const [editingId, setEditingId] = useState(null); // uzglabā ID ierakstam, ko rediģē
    const [editedTitle, setEditedTitle] = useState(""); // uzglabā rediģēto virsrakstu
    const [editedBody, setEditedBody] = useState(""); // uzglabā rediģēto tekstu

    function handleAddDiary(e) {
        e.preventDefault(); // novērš lapas pārlādi pēc formas nosūtīšanas

        // tiek veidots jauns objekts
        const newDiary = {
            id: crypto.randomUUID(), // ģenerē unikālu id
            title: newTitle,
            body: newBody,
            date: new Date().toISOString().slice(0, 10), // šodienas datums YYYY-MM-DD
        };

        setDiaries([...diaries, newDiary]); // pievieno ierakstu saraksta beigās
        setNewTitle(""); // notīra ievades laukus
        setNewBody("");
    }

    function handleDeleteDiary(id) { // dzēš ierakstu pēc id
        setDiaries((prev) => prev.filter(d => d.id !== id));
    }

    //  Aktivē rediģēšanas režīmu konkrētajam ierakstam
    function handleEditClick(diary) {
        setEditingId(diary.id);
        setEditedTitle(diary.title);
        setEditedBody(diary.body);
    }

    //  Saglabā izmaiņas ierakstam un pārslēdz režīmu atpakaļ
    function handleSaveEdit(id) {
        setDiaries((prev) =>
            prev.map(d =>
                d.id === id ? { ...d, title: editedTitle, body: editedBody } : d
            )
        );
        setEditingId(null); // izslēdz rediģēšanas režīmu
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

            {/* izvada lai redz lietotājs */}
            {diaries.map((diary) => (
                <div key={diary.id} style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "5px",
                    backgroundColor: "#f9f9f9"
                }}>
                    {/*  Ja rediģē šo ierakstu, rādām ievades laukus */}
                    {editingId === diary.id ? (
                        <>
                            <input
                                type="text"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                            />
                            <br />
                            <textarea
                                value={editedBody}
                                onChange={(e) => setEditedBody(e.target.value)}
                            />
                            <br />
                            <button onClick={() => handleSaveEdit(diary.id)}>💾 Saglabāt</button>
                            <button onClick={() => setEditingId(null)}>❌ Atcelt</button> {/* Papildus atcelšana */}
                        </>
                    ) : (
                        <>
                            <Diary {...diary} />
                            {/* Rediģēšanas poga */}
                            <button onClick={() => handleEditClick(diary)}>✏️ Rediģēt</button>
                        </>
                    )}

                    <button onClick={() => handleDeleteDiary(diary.id)}>❌ Dzēst</button>
                </div>
            ))}
        </div>
    );
}

export default DiariesList;
