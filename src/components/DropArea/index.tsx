import { useState } from "react";
import styles from "./DropArea.module.scss";

type PropsType = {
  onDrop: () => void;
  activeCard: number | null;
  index: number;
};

const DropArea = (props: PropsType) => {
  const { onDrop, activeCard, index } = props;
  const [showDrop, setShowDrop] = useState<boolean>(false);

  const dragValidation = () => {
    if (activeCard === index) return false;
    // if (index === 0 && index === activeCard) return false;
    return true;
  };

  return dragValidation ? (
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
  ) : null;
};

export default DropArea;
