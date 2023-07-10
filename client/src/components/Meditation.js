import { useContext } from "react";
import { UserContext } from "./UserContext";
import OpenTimer from "./OpenTimer";
import PresetTimer from "./PresetTimer";
import NavComponent from "./NavComponent";
import { styled } from "styled-components";


const Meditation = () => {
  const { loggedInUser } = useContext(UserContext);

  return (
    <>
    <NavComponent/>
    {!loggedInUser
    ? <p>Please sign in or create an account.</p>
    : 
    <>
      <Wrapper>
        <PresetTimer />
        <OpenTimer/>
      </Wrapper>
    </>
    }
    </> 
  )
};

const Wrapper = styled.div`
display: flex;
justify-content: space-evenly;
`
export default Meditation;