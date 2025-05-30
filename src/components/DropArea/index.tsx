import { useState } from "react";
import styles from "./DropArea.module.scss";

type PropsType = {
  onDrop: () => void;
};

const DropArea = (props: PropsType) => {
  const { onDrop } = props;
  const [showDrop, setShowDrop] = useState<boolean>(false);

  return (
    <div
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDrop={() => {
        onDrop();
        setShowDrop(false);
      }}
      onDragOver={(e) => e.preventDefault()}
      className={showDrop ? styles.droparea : styles.hidedroparea}
    >
      Drop Here...
    </div>
  );
};

export default DropArea;
