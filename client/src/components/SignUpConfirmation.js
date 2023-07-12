import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import NavComponent from "./NavComponent";
import Loading from "./Loading";

const SignUpConfirmation = () => {
    const { loggedInUser } = useContext(UserContext);

    return (
        !loggedInUser ? <Loading/>
        : (
            <>
            <Wrapper>
            <TextWrapper>
                <Text>Thanks for creating an account! </Text> 
                <SubText>Would you like to meditate now?</SubText> 
                <SubText>Or would you prefer to spend some time with gratitude?</SubText>
            </TextWrapper>
            </Wrapper>
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
height: 25vh;
`
const TextWrapper = styled.div`
text-align: center;
width: 30vw;
`
const Text = styled.p`
margin: 1rem;
margin-bottom: 3rem;
`
const SubText = styled.p`
font-size: 1.3rem ;
margin: 0.7rem;
`
const NavWrapper = styled.div`
margin-top: 3rem;
`

export default SignUpConfirmation;