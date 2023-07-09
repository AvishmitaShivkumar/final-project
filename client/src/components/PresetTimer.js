import { useEffect, useState } from "react";
import NavComponent from "./NavComponent";

const PresetTimer = () => {
const [ time, setTime ] = useState(0);
    const [countDown, setCountDown] = useState(0);
    const [runTimer, setRunTimer] = useState(false);

  useEffect(() => {
    let timerId;

    if (runTimer) {
      setCountDown(60 * time);
      timerId = setInterval(() => {
        setCountDown((countDown) => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [runTimer]);

    useEffect(() => {
    if (countDown < 0 && runTimer) {
      setRunTimer(false);
      setCountDown(0);
    }
  }, [countDown, runTimer]);

    const togglerTimer = () => {
        setRunTimer(!runTimer)
    };

const selectTime = (event) => {
    setTime(event.target.value)
    setCountDown(event.target.value * 60)
};

  const seconds = String(countDown % 60).padStart(2, 0);
  const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);

  const minuteOptions = [ 5, 15, 30, 45, 60];

  return (
    <div >
      <div>
        {minutes}:{seconds}
      </div>

      <button type="button" onClick={togglerTimer}>
        {runTimer ? "Reset" : "Start"}
      </button>

      {minuteOptions.map((time) => {
        return (
            <button key={time} value={time} onClick={selectTime}>{time} minutes</button>
        )
      })}
    </div>
  );
};

export default PresetTimer;