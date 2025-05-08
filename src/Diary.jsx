function Diary({ title, body, date }) {
    return (
        <div>
            <h3>{title}</h3>
            <p>{body}</p>
            <small>{date}</small>
        </div>
    );
}

export default Diary;
