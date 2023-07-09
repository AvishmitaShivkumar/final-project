import { useContext } from "react";
import { UserContext } from "./UserContext";
import OpenTimer from "./OpenTimer";
import PresetTimer from "./PresetTimer";
import NavComponent from "./NavComponent";


const Meditation = () => {
  const { loggedInUser } = useContext(UserContext);

  return (
    <>
    <NavComponent/>
    {!loggedInUser
    ? <p>Please sign in or create an account.</p>
    : 
    <>
      <p>Timed Meditations</p>
      <PresetTimer/>
      <p>Open-Ended Meditations</p>
      <OpenTimer/>
    </>
    }
    </> 
  )
};

export default Meditation;