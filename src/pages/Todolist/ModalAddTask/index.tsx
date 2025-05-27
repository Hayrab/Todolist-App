import type { Dispatch, FormEvent, SetStateAction } from "react";
import Modal from "../../../components/Modal";

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
      <form onSubmit={handleSubmit}>
        <h3>Create Task</h3>
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
        <button type="submit">Submit Task</button>
      </form>
    </Modal>
  );
};

export default ModalAddTask;
