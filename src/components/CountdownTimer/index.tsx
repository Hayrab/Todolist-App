import { useEffect, useState } from "react";

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

  return <div>⏳ {timeLeft}s left</div>;
};
// const getFormattedTime = (miliseconds: number) => {
//   const total_seconds = parseInt(Math.floor(miliseconds / 1000));
//   const total_minutes = parseInt(Math.floor(total_seconds / 60));
//   const total_hours = parseInt(Math.floor(total_minutes / 60));
//   const days = parseInt(Math.floor(total_hours/ 24))

//   const seconds = parseInt(total_seconds%60);
//   const minutes = parseInt(total_minutes % 60);
//   const hours = parseInt(total_hours % 60);

//   return `${days} : ${hours} : ${minutes} : ${seconds}`;
// }

export default CountdownTimer;
