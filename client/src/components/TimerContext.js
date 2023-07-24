import moment from "moment";
import { createContext, useState } from "react";

export const TimerContext = createContext(null);

export const TimerProvider = ({ children }) => {
  
    const [ countDown, setCountDown ] = useState(0);
    const [ count, setCount ] = useState(0);
    const [ runOpen, setRunOpen ] = useState(false);
    const [ runPreset, setRunPreset ] = useState(false);

    const currentDate = moment()._d;
    const formattedDate = moment(currentDate).format("D MMMM YYYY");

    // math to separate the count into minutes and seconds for the preset timer.
    const secondsPreset = String(countDown % 60).padStart(2, 0);
    const minutesPreset = String(Math.floor(countDown / 60)).padStart(2, 0);

     // math to separate the count into minutes and seconds for the open timer.
    const secondsOpen = String(count % 60).padStart(2, 0);
    const minutesOpen = String(Math.floor(count / 60)).padStart(2, 0);


    return(
        <TimerContext.Provider value={{ countDown, setCountDown, count, setCount, runOpen, setRunOpen, runPreset, setRunPreset, formattedDate, secondsPreset, minutesPreset, secondsOpen, minutesOpen }}>
            { children }
        </TimerContext.Provider>
    )
};