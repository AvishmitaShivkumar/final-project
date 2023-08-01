import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import styled from "styled-components";
import { TimerContext } from "../TimerContext";

const OpenTimer = () => {
  const { loggedInUser } = useContext(UserContext);
  const {
    setCount,
    runOpen,
    setRunOpen,
    formattedDate,
    secondsOpen,
    minutesOpen,
  } = useContext(TimerContext);

  let timer;

  useEffect(() => {
    if (runOpen) {
      timer = setInterval(() => {
        // callback function in the state runs the function after the state is set which allows the count to keep running.
        setCount((count) => count + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [runOpen]);

  // toggles the timer between "Start" and "Pause"
  const toggleTimer = () => {
    setRunOpen(!runOpen);
  };

  // stops the timer and resets to the last chosen time.
  const stopTimer = () => {
    console.log("timer being set");
    setCount(0);
    setRunOpen(false);

    // When user stops the timer, the time gets sent to the database.
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/meditation`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accountId: loggedInUser._id,
        email: loggedInUser.email,
        log: {
          date: formattedDate,
          meditation: `open - ${minutesOpen}:${secondsOpen}`,
        },
      }),
    });
  };

  return (
    <>
      <Wrapper>
        <Title>Open-Ended Meditations</Title>
        <div>
          <Button type="button" onClick={toggleTimer}>
            {runOpen ? "Pause" : "Start"}
          </Button>
          <Button type="button" onClick={stopTimer}>
            Stop
          </Button>
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 30vw;
  height: 30vh;
`;
const Title = styled.p`
  margin: 1rem;
`;
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
    border-color: rgba(100, 79, 68, 0.5);
    box-shadow: rgba(100, 79, 68, 0.1) 0 4px 12px;
    color: rgba(100, 79, 68, 0.8);
  }

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    background-color: rgba(100, 79, 68, 0.2);
    border-color: rgba(100, 79, 68, 0.5);
    box-shadow: rgba(100, 79, 68, 0.06) 0 2px 4px;
    color: rgba(0, 0, 0, 0.65);
    transform: translateY(0);
  }
`;
export default OpenTimer;
