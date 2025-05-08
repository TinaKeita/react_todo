import Diary from "./Diary";

function DiariesList() {
    const diaries = [
        { id: 1, title: "Diena 1", body: "Šodien censos tik gala ar React.", date: "2025-05-08" },
        { id: 2, title: "Diena 2", body: "Laraveellll.", date: "2025-05-09" },
        { id: 3, title: "Diena 3", body: "Nopirku pienu un maizi.", date: "2025-05-10" },
    ];

    return (
        <div>
            {diaries.map((diary) => (
                <Diary key={diary.id} {...diary} />
            ))}
        </div>
    );
}

export default DiariesList;
