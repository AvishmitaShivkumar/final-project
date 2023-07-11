import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import OpenTimer from "./OpenTimer";
import PresetTimer from "./PresetTimer";
import NavComponent from "./NavComponent";
import { keyframes, styled } from "styled-components";
import { TimerContext } from "./TimerContext";


const Meditation = () => {
  const { loggedInUser } = useContext(UserContext);
  const { secondsPreset, minutesPreset, secondsOpen, minutesOpen } = useContext(TimerContext);


  return (
    <>
    <NavComponent/>
    {!loggedInUser
    ? <p>Please sign in or create an account.</p>
    : 
    <>
      <Wrapper>
        <Circle>
          <Display>
            {minutesPreset === "00" && secondsPreset === "00" ? minutesOpen : minutesPreset}:{minutesPreset === "00" && secondsPreset === "00" ? secondsOpen : secondsPreset}</Display>
        </Circle>
        <ComponentWrapper>
          <PresetTimer />
          <OpenTimer/>
        </ComponentWrapper>
      </Wrapper>
    </>
    } 
    </> 
  )
};

const Wrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;
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
const ComponentWrapper = styled.div`
display: flex;
`
export default Meditation;