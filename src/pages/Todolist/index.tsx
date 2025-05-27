import { useEffect, useId, useState, type FormEvent } from "react";
import styles from "./Todolist.module.scss";
import Modal from "../../assets/Modal";

type BoardType = "Todo" | "Doing" | "Done";
type User = {
  id: string;
  name: string;
};
type TaskType = {
  id: string;
  title: string;
  description: string;
  assignee: string;
  duration: number;
  board: BoardType;
  createdAt: number;
};

const boards: BoardType[] = ["Todo", "Doing", "Done"];
const users: User[] = [
  { id: "1", name: "Puji" },
  { id: "2", name: "adnan" },
  { id: "3", name: "nopal" },
];

const ToDoList = () => {
  const [task, setTask] = useState<TaskType[]>([]);
  const [modalAddtask, setModalAddtask] = useState<boolean>(false);
  const id = useId() + Date.now();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const data: TaskType = {
      id: id,
      title: form.get("title") as string,
      description: form.get("description") as string,
      assignee: form.get("assignee") as string,
      duration: Number(form.get("duration") as string),
      board: "Todo",
      createdAt: Date.now(),
    };
    setTask((prev) => [...prev, data]);
    setModalAddtask(false);
  };

  console.log(task);

  const handleDeleteTask = (id: string) => {
    setTask((prev) => prev.filter((task) => task.id !== id));
  };

  const handleDrop = (taskId: string, newBoard: BoardType) => {
    setTask((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, board: newBoard } : task
      )
    );
  };

  return (
    <div className={styles.todolist}>
      ToDoList
      <div className={styles.todolist_boards}>
        {boards.map((board) => (
          <div
            className={styles.todolist_boards_panel}
            key={board}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const taskId = e.dataTransfer.getData("text/plain");
              handleDrop(taskId, board);
            }}
          >
            <h2>{board}</h2>
            {task
              .filter((task) => task.board === board)
              .map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) =>
                    e.dataTransfer.setData("text/plain", task.id)
                  }
                  style={{
                    margin: "0.5rem 0",
                    padding: "0.5rem",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  <strong>{task.title}</strong>
                  <p>{task.description}</p>
                  <p>Assignee: {users[parseInt(task.assignee) - 1].name}</p>
                  <CountdownTimer
                    startTime={task.createdAt}
                    duration={task.duration}
                  />
                  <button onClick={() => handleDeleteTask(task.id)}>
                    Delete
                  </button>
                </div>
              ))}
          </div>
        ))}
        <button onClick={() => setModalAddtask(true)}>Add Task</button>
        {modalAddtask && (
          <Modal onClose={() => setModalAddtask(false)}>
            <form onSubmit={handleSubmit}>
              <h3>Create Task</h3>
              <input name="title" type="text" />
              <input name="description" type="text" />
              <select name="assignee">
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              <input name="duration" type="number" />
              <button type="submit">Submit Task</button>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
};

const CountdownTimer: React.FC<{ startTime: number; duration: number }> = ({
  startTime,
  duration,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = duration - elapsed;
      setTimeLeft(remaining > 0 ? remaining : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, duration]);

  return <div>⏳ {timeLeft}s left</div>;
};

export default ToDoList;
