import type { Dispatch, FormEvent, SetStateAction } from "react";
import Modal from "../../../components/Modal";
import styles from "./ModalDetailTask.module.scss";

type User = {
  id: string;
  name: string;
};

type BoardType = "Todo" | "Doing" | "Done";

type TaskType = {
  id: string;
  title: string;
  description: string;
  assignee: string;
  duration: number;
  board: BoardType;
  createdAt: number;
};

type PropType = {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  setDetailTask: Dispatch<SetStateAction<TaskType | null>>;
  tasks: TaskType;
  users: User[];
};

const ModalDetailTask = (props: PropType) => {
  const { handleSubmit, setDetailTask, users, tasks } = props;
  console.log(tasks);
  return (
    <Modal onClose={() => setDetailTask(null)}>
      <div className={styles.modaldetailtask_header}>
        <h3>Detail Task</h3>
        <i
          onClick={() => setDetailTask(null)}
          className={`${styles.modaldetailtask_header_closebtn} bx  bx-x`}
        ></i>
      </div>
      <form onSubmit={handleSubmit} className={styles.modaldetailtask_body}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            required
            placeholder="Input Title Task Here..."
            defaultValue={tasks.title}
            disabled
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            required
            placeholder="Input description Task Here..."
            defaultValue={tasks.description}
            disabled
          />
        </div>
        <div>
          <label htmlFor="user">User</label>
          <input
            name="user"
            type="text"
            required
            defaultValue={
              users.find((u) => u.id === tasks.assignee)?.name ?? "Unknown"
            }
            disabled
          />
        </div>

        <div>
          <label htmlFor="duration">Duration Task</label>
          <input
            name="duration"
            type="number"
            required
            placeholder="Input Task Duration Here..."
            defaultValue={tasks.duration}
            disabled
          />
        </div>
      </form>
    </Modal>
  );
};

export default ModalDetailTask;
