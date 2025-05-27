import { useId, useState, type FormEvent } from "react";
import styles from "./Todolist.module.scss";
import CountdownTimer from "../../components/CountdownTimer";
import ModalAddTask from "./ModalAddTask";

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
      <button onClick={() => setModalAddtask(true)}>Add Task</button>
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
            <h2 className={styles.todolist_boards_panel_title}>{board}</h2>
            {task
              .filter((task) => task.board === board)
              .map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) =>
                    e.dataTransfer.setData("text/plain", task.id)
                  }
                  className={styles.todolist_boards_panel_task}
                >
                  <div>
                    <strong>{task.title}</strong>
                    <button onClick={() => handleDeleteTask(task.id)}>
                      <i className="bx  bx-trash" />
                    </button>
                  </div>
                  <p>{task.description}</p>
                  <p>Assignee: {users[parseInt(task.assignee) - 1].name}</p>
                  <CountdownTimer
                    startTime={task.createdAt}
                    duration={task.duration}
                  />
                </div>
              ))}
          </div>
        ))}

        {modalAddtask && (
          <ModalAddTask
            users={users}
            setModalAddtask={setModalAddtask}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default ToDoList;
