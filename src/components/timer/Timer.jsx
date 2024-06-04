import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";

const Timer = (props) => {
  const { deadline } = props;
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const getTime = useCallback(() => {
    const time = Date.parse(deadline) - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  }, [deadline]);

  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);

    return () => clearInterval(interval);
  }, [deadline, getTime]);

  return (
    <div>
      <span>{days < 10 ? "0" + days : days}</span>
      <span>:</span>
      <span>{hours < 10 ? "0" + hours : hours}</span>
      <span>:</span>
      <span>{minutes < 10 ? "0" + minutes : minutes}</span>
      <span>:</span>
      <span>{seconds < 10 ? "0" + seconds : seconds}</span>
    </div>
  );
};
export default Timer;
