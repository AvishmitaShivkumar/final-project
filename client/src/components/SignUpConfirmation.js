import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import NavComponent from "./NavComponent";

const SignUpConfirmation = () => {
    const { loggedInUser } = useContext(UserContext);

    return (
        !loggedInUser ? <p>Loading...</p> 
        : (
            <>
            <Wrapper>
            <TextWrapper>
                <Text>Thanks for creating an account! </Text> 
                {/* <Text>Feel free to spend as much time as you'd like here and come back as often as you'd like.  </Text> */}
                <Text>Here is your account information.</Text>
                <Text>User id: {loggedInUser._id}</Text>
                <Text>Name: {loggedInUser.name}</Text>
                <Text>Email: {loggedInUser.email}</Text>        
            </TextWrapper>
            </Wrapper>
            {/* add the meditation and gratitude tabs here.  */}
            <NavWrapper>
                <NavComponent/>
            </NavWrapper>
            </>
        )
    )
};

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background: url("/container-background.png") no-repeat center ;
height: 30vh;
`
const TextWrapper = styled.div`
text-align: center;
width: 30vw;
`
const Text = styled.p`
margin: 1rem;
`
const NavWrapper = styled.div`
margin-top: 5rem;
`

export default SignUpConfirmation;