import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { keyframes, styled } from "styled-components";
import { TimerContext } from "./TimerContext";

const PresetTimer = () => {
  const { loggedInUser } = useContext(UserContext);
  const { countDown, setCountDown, runPreset, setRunPreset, formattedDate} = useContext(TimerContext);

  const [ time, setTime ] = useState(0);

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
  if (runPreset) {
    timer = setInterval(() => {
    // callback function in the state runs the function after the state is set which allows the countdown to keep running
      setCountDown((countDown) => countDown - 1);
    }, 1000);
  } else {
    clearInterval(timer);
  }

  return () => clearInterval(timer);
}, [runPreset]);

    // stops the timer when it reaches zero.
    useEffect(() => {
    if (countDown < 0 && runPreset) {
      setRunPreset(false);
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
  }, [countDown, runPreset]);

    // toggles the timer between "Start" and "Pause"
    const toggleTimer = () => {
        setRunPreset(!runPreset)
    };

    // stops the timer and resets to the last chosen time.
    const stopTimer = () => {
      setCountDown(0)
      setRunPreset(false)
      
    };


  return (
    <Wrapper >
      <div>
        <Title>Timed Meditation</Title>
        <Button type="button" onClick={toggleTimer}>
          {runPreset ? "Pause" : "Start"}
        </Button>
        <Button type="button" onClick={stopTimer}>
          Stop
        </Button>
      </div>
      <div>
        <Text>Select a duration.</Text>
        <Times>
        {minuteOptions.map((time) => {
          return (
              <Button key={time} value={time} onClick={selectTime}>
                {time} minutes
              </Button>
          )
        })}
        </Times>  
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
width: 30vw;
height: 30vh;
`
const Title = styled.p`
margin: 1rem;
`
const Text = styled.p`
font-size: 1.3rem;
margin-top: 1rem;
text-align: center;
`
const Times = styled.div`
display: flex;
justify-content: center;
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