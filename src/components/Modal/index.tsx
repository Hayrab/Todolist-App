import { useEffect, useRef } from "react";
import styles from "./modal.module.scss";

type PropType = {
  children: React.ReactNode;
  onClose: () => void;
};

const Modal = (props: PropType) => {
  const { children, onClose } = props;

  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const clickHandleOutsite = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", clickHandleOutsite);
    return () => {
      document.removeEventListener("mousedown", clickHandleOutsite);
    };
  }, [onClose]);
  return (
    <div className={styles.modal}>
      <div className={styles.modal_main} ref={ref}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
