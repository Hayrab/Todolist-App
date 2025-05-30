import type { Dispatch, FormEvent, SetStateAction } from "react";
import Modal from "../../../components/Modal";
import styles from "./ModalAddTask.module.scss";

type User = {
  id: string;
  name: string;
};

type PropType = {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  setModalAddtask: Dispatch<SetStateAction<boolean>>;
  users: User[];
};

const ModalAddTask = (props: PropType) => {
  const { handleSubmit, setModalAddtask, users } = props;
  return (
    <Modal onClose={() => setModalAddtask(false)}>
      <div className={styles.modaladdtask_header}>
        <h3>Create Task</h3>
        <i
          onClick={() => setModalAddtask(false)}
          className={`${styles.modaladdtask_header_closebtn} bx  bx-x`}
        ></i>
      </div>
      <form onSubmit={handleSubmit} className={styles.modaladdtask_body}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            required
            placeholder="Input Title Task Here..."
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            required
            placeholder="Input description Task Here..."
          />
        </div>
        <div>
          <label htmlFor="assignee">Select User resposible for this task</label>
          <select name="assignee">
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="duration">Duration Task</label>
          <input
            name="duration"
            type="number"
            required
            placeholder="Input Task Duration Here..."
          />
        </div>
        <div className={styles.modaladdtask_footer}>
          <button
            className={styles.modaladdtask_footer_submitbtn}
            type="submit"
          >
            Submit Task
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalAddTask;
