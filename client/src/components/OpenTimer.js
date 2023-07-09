import { useEffect, useState } from "react";

const OpenTimer = () => {
    const [ count, setCount ] = useState(0);
    const [ runTimer, setRunTimer ] = useState(false);

    let timer;

    useEffect(() => {
        if(runTimer) {
            timer = setInterval(() => {
                // callback function in the state runs the function after the state is set which allows the count to keep running.
                setCount((count) => count + 1);
            }, 1000);
        } else {
            clearInterval(timer);
        }
        
        return () => {
            clearInterval(timer)}
    }, [runTimer]);

    // toggles the timer between "Start" and "Pause"
    const toggleTimer = () => {
        setRunTimer(!runTimer);
    };

    // stops the timer and resets to the last chosen time.
    const stopTimer = () => {
        setCount(0);
        setRunTimer(false);

        // When user stops the timer, the time gets sent to the database.
        // POST - include user id
    };

    // math to separate the count into minutes and seconds
    const seconds = String(count % 60).padStart(2, 0);
    const minutes = String(Math.floor(count / 60)).padStart(2, 0);

    return(
        <>
        <p>Open-ended timer goes here</p>
        <p>{minutes}:{seconds} </p>
        <button type="button" onClick={toggleTimer}>
            {runTimer ? "Pause" : "Start"}
        </button>
        <button type="button" onClick={stopTimer}>
            Stop
        </button>
        </>
    )
};

export default OpenTimer;

