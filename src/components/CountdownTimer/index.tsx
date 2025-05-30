import { useEffect, useState } from "react";
import styles from "./CountdownTimer.module.scss";

const CountdownTimer: React.FC<{ startTime: number; duration: number }> = ({
  startTime,
  duration,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  const doubledigit = (remaining: number) => {
    return String(remaining).padStart(2, "0");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = duration - elapsed;
      setTimeLeft(remaining > 0 ? remaining : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, duration]);

  const total_minutes = Math.floor(timeLeft / 60);
  const total_hours = Math.floor(total_minutes / 60);
  const days = Math.floor(total_hours / 24);

  const seconds = timeLeft % 60;
  const minutes = total_minutes % 60;
  const hours = total_hours % 60;

  return (
    <div className={styles.countdowntimer}>
      <i className={`${styles.countdowntimer_icon} bx  bx-clock-2`} />
      {days > 0 && <span>{doubledigit(days)} d&nbsp;</span>}
      {hours > 0 && <span>{doubledigit(hours)} h&nbsp; </span>}
      {minutes > 0 && <span>{doubledigit(minutes)} m&nbsp; </span>}
      <span>{doubledigit(seconds)} s left</span>
    </div>
  );
};

export default CountdownTimer;
