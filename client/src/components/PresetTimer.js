import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import moment from "moment";
import { keyframes, styled } from "styled-components";

const PresetTimer = () => {
  const { loggedInUser } = useContext(UserContext);

  const [ time, setTime ] = useState(0);
  const [countDown, setCountDown] = useState(0);
  const [runTimer, setRunTimer] = useState(false);

  const currentDate = moment()._d;
  const formattedDate = moment(currentDate).format("D MMMM YYYY");

// Array of times for the user to choose from.
const minuteOptions = [ 5, 15, 30, 45, 60];
  
// sets the time from which the countdown starts based on the time selected from the minuteOptions array
const selectTime = (event) => {
  setTime(event.target.value)
  setCountDown(event.target.value * 60)
};

      // math to separate the count into minutes and seconds
      const seconds = String(countDown % 60).padStart(2, 0);
      const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);


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
      fetch("/api/meditation",{
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accountId: loggedInUser._id, email: loggedInUser.email, log: {date: formattedDate, meditation:`preset - ${time} minutes`} })
      })
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

  return (
    <Wrapper >
      <Circle>
        <Display>{minutes}:{seconds}</Display>
      </Circle>
      <div>
        <p>Timed Meditation</p>
        <Button type="button" onClick={toggleTimer}>
          {runTimer ? "Pause" : "Start"}
        </Button>
        <Button type="button" onClick={stopTimer}>
          Stop
        </Button>
      </div>
      <div>
      {minuteOptions.map((time) => {
        return (
            <Button key={time} value={time} onClick={selectTime}>
              {time} minutes
            </Button>
        )
      })}
      </div>  
    </Wrapper>
  );
};

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin: 2rem;
`

const growShrink = keyframes`
0% { transform: scale(1) }
50% { transform: scale(1.2) }
100% { transform: scale(1)}
`
const Circle = styled.div`
height: 20rem;
width: 20rem;
background-image: radial-gradient(circle, #DEDFD9, #B4BCA9 );
border: 0.1rem solid #B4BCA9; 
border-radius: 50%; 
z-index: -1;
animation: ${growShrink} 9s linear forwards infinite;
display: flex;
justify-content: center;
align-items: center;
margin: 4rem;
`
const Display = styled.p`
font-size: 4rem;
margin: 2rem;
`

const Button = styled.button`
border-radius: 0.4rem;
width: auto;
padding: 0.5rem;
margin: 1rem;
font-family: var(--body-font-family);
font-size: 1.2rem;
background: transparent;
border: 0.1rem solid var(--color-primary);
color: var(--color-primary);
font-weight: bold;
transition: all 250ms;

&:hover, 
&:focus {
cursor: pointer;
border-color: rgba(100,79,68,0.5);
box-shadow: rgba(100,79,68,0.1) 0 4px 12px;
color: rgba(100,79,68,0.8);
}

&:hover {
transform: translateY(-1px);
}

&:active {
background-color: rgba(100,79,68,0.2);
border-color: rgba(100,79,68,0.5);
box-shadow: rgba(100,79,68, 0.06) 0 2px 4px;
color: rgba(0, 0, 0, 0.65);
transform: translateY(0);
}
`

export default PresetTimer;