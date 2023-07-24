import { useContext } from "react";
import { UserContext } from "../UserContext";
import OpenTimer from "./OpenTimer";
import PresetTimer from "./PresetTimer";
import NavComponent from "../NavComponent";
import { keyframes, styled } from "styled-components";
import { TimerContext } from "../TimerContext";
import { Link } from "react-router-dom";

const Meditation = () => {
  const { loggedInUser } = useContext(UserContext);
  const { secondsPreset, minutesPreset, secondsOpen, minutesOpen } =
    useContext(TimerContext);

  return (
    <>
      <NavComponent />
      {!loggedInUser ? (
        <Message>
          <p>
            Please <Link to="/signin">sign in</Link> or{" "}
            <Link to="/signup">create a free account</Link> to use this feature.
          </p>
        </Message>
      ) : (
        <>
          <Wrapper>
            <PresetTimer />
            <Circle>
              <Display>
                {minutesPreset === "00" && secondsPreset === "00"
                  ? minutesOpen
                  : minutesPreset}
                :
                {minutesPreset === "00" && secondsPreset === "00"
                  ? secondsOpen
                  : secondsPreset}
              </Display>
            </Circle>
            <OpenTimer />
          </Wrapper>
        </>
      )}
    </>
  );
};

const Message = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;
const growShrink = keyframes`
0% { transform: scale(1) }
50% { transform: scale(1.2) }
100% { transform: scale(1)}
`;
const Circle = styled.div`
  height: 20rem;
  width: 20rem;
  background-image: url("/container-background.png");
  border-radius: 50%;
  z-index: -1;
  animation: ${growShrink} 9s linear forwards infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4rem;
`;
const Display = styled.p`
  font-size: 4rem;
  margin: 2rem;
`;
export default Meditation;
