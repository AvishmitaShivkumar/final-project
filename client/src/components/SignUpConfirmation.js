import { useContext } from "react";
import { UserContext } from "./UserContext";

const SignUpConfirmation = () => {
    const { loggedInUser } = useContext(UserContext);
    console.log(loggedInUser);

    return (
        !loggedInUser ? <p>Loading...</p> : <h1>Sign up confirmation</h1>
        
    // <>Sign up confirmation</>
    )

};

export default SignUpConfirmation;