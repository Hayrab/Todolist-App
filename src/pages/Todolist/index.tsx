import { Fragment, useState, type FormEvent } from "react";
import styles from "./Todolist.module.scss";
import CountdownTimer from "../../components/CountdownTimer";
import ModalAddTask from "./ModalAddTask";
import DropArea from "../../components/DropArea";

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
  { id: "2", name: "Adnan" },
  { id: "3", name: "Nopal" },
  { id: "4", name: "Irma" },
];

const ToDoList = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [modalAddtask, setModalAddtask] = useState<boolean>(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const data: TaskType = {
      id: `${Date.now()}-${Math.random()}`,
      title: form.get("title") as string,
      description: form.get("description") as string,
      assignee: form.get("assignee") as string,
      duration: Number(form.get("duration") as string),
      board: "Todo",
      createdAt: Date.now(),
    };
    setTasks((prev) => [...prev, data]);
    setModalAddtask(false);
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const onDrop = (board: BoardType, position: number) => {
    if (!activeCard) return;
    if (!activeCardId) return;

    const taskToMove = tasks.find((task) => task.id === activeCardId);
    if (!taskToMove) return;

    const updatedTasks = tasks.filter((task) => task.id !== activeCardId);
    updatedTasks.splice(position, 0, { ...taskToMove, board });

    setTasks(updatedTasks);
  };

  return (
    <div className={styles.todolist}>
      <div className={styles.todolist_headpanel}>
        <h1>To Do List</h1>
        <button
          className={styles.todolist_headpanel_button}
          onClick={() => setModalAddtask(true)}
        >
          Add Task
        </button>
      </div>
      <div className={styles.todolist_boards}>
        {boards.map((board) => (
          <div
            className={styles.todolist_boards_panel}
            key={board}
            onDragOver={(e) => e.preventDefault()}
          >
            <h2 className={styles.todolist_boards_panel_title}>{board}</h2>

            <DropArea
              onDrop={() => {
                onDrop(board, 0);
                setActiveCard(null);
              }}
            />

            {tasks
              .filter((task) => task.board === board)
              .map((task, index) => (
                <Fragment key={task.id}>
                  <div
                    draggable
                    onDragStart={() => {
                      setActiveCardId(task.id);
                      setActiveCard(index);
                    }}
                    onDragEnd={() => {
                      setActiveCard(null);
                      setActiveCardId(null);
                    }}
                    className={styles.todolist_boards_panel_task}
                  >
                    <h3 className={styles.todolist_boards_panel_task_title}>
                      {task.title}
                    </h3>
                    <p
                      className={styles.todolist_boards_panel_task_description}
                    >
                      {task.description}
                    </p>

                    <p>Assignee {users[parseInt(task.assignee) - 1].name}</p>
                    <div className={styles.todolist_boards_panel_task_footer}>
                      <CountdownTimer
                        startTime={task.createdAt}
                        duration={task.duration}
                      />
                      <button
                        className={styles.todolist_boards_panel_task_button}
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <i className="bx  bx-trash" />
                      </button>
                    </div>
                  </div>

                  <DropArea
                    onDrop={() => {
                      setActiveCard(null);
                      setActiveCardId(null);
                      onDrop(board, index + 1);
                    }}
                  />
                </Fragment>
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
