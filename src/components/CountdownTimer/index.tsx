import { useEffect, useState } from "react";
import styles from "./CountdownTimer.module.scss";

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

  const total_minutes = Math.floor(timeLeft / 60);
  const total_hours = Math.floor(total_minutes / 60);
  const days = Math.floor(total_hours / 24);

  const seconds = timeLeft % 60;
  const minutes = total_minutes % 60;
  const hours = total_hours % 60;

  return (
    <div className={styles.countdowntimer}>
      <i className={`${styles.countdowntimer_icon} bx  bx-clock-2`} />
      {days > 0 && <span>{String(days).padStart(2, "0")} d&nbsp;</span>}
      {hours > 0 && <span>{String(hours).padStart(2, "0")} h&nbsp; </span>}
      {minutes > 0 && <span>{String(minutes).padStart(2, "0")} m&nbsp; </span>}
      <span>{String(seconds).padStart(2, "0")} s left</span>
    </div>
  );
};

export default CountdownTimer;
