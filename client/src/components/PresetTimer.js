import { useEffect, useState } from "react";
import NavComponent from "./NavComponent";

const PresetTimer = () => {
    const [ time, setTime ] = useState(0);
    const [countDown, setCountDown] = useState(0);
    const [runTimer, setRunTimer] = useState(false);

  // Array of times for the user to choose from.
  const minuteOptions = [ 5, 15, 30, 45, 60];
  
  // sets the time from which the countdown starts based on the time selected from the minuteOptions array
  const selectTime = (event) => {
    setTime(event.target.value)
    setCountDown(event.target.value * 60)
  };

  useEffect(() => {
    let timer;

    // tells the timer to countdown
    if (runTimer) {
      timer = setInterval(() => {
        // callback function in the state runs the function after the state is set which allows the countdown to keep running
        setCountDown((countDown) => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [runTimer]);

    // stops the timer when it reaches zero.
    useEffect(() => {
    if (countDown < 0 && runTimer) {
      setRunTimer(false);
      setCountDown(0);

      // The countdown time that was completed gets sent to the database.
      // POST - include user id
    }
  }, [countDown, runTimer]);

    // toggles the timer between "Start" and "Pause"
    const toggleTimer = () => {
        setRunTimer(!runTimer)
    };

    // stops the timer and resets to the last chosen time.
    const stopTimer = () => {
      setCountDown(60 * time)
      setRunTimer(false)
    };


  // math to separate the count into minutes and seconds
  const seconds = String(countDown % 60).padStart(2, 0);
  const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);

  

  return (
    <div >
      <div>
        {minutes}:{seconds}
      </div>

      <button type="button" onClick={toggleTimer}>
        {runTimer ? "Pause" : "Start"}
      </button>
      <button type="button" onClick={stopTimer}>
        Stop
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