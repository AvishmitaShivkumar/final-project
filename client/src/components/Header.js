import styled from "styled-components";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";


const Header = () => {
    const { loggedInUser, setLoggedInUser} = useContext(UserContext);

    const navigate = useNavigate();

    // assigning location variable for navigation.
    const location = useLocation();

    // destructuring pathname from location
    const { pathname } = location;

    // split method to get the name of the path in array
    const splitLocation = pathname.split("/");
    
    // logs the user out and naviagtes them to the homepage.
    const handleSignOut = () => {
        setLoggedInUser("")
        navigate("/")
    };

    return(
        <>
        <Container>
            <Title to="/">Grounded</Title>
            {loggedInUser 
            ? <>
            <UserText>Welcome, {loggedInUser.name}.</UserText>
            <Text>Stay as long as you'd like.</Text>
            <SignOut onClick={handleSignOut}>SIGN OUT</SignOut>
            </>
            : <>
            <TextContainer>
                <Text>Welcome.</Text>
                <Text>Stay as long as you'd like.</Text>
            </TextContainer>
            <SigninContainer>
                <SigninNav className={splitLocation[1] === "signin" ? "active" : ""}>
                    <StyledLink to="/signin">SIGN IN</StyledLink>
                </SigninNav>
                <SigninNav className={splitLocation[1] === "signup" ? "active" : ""}>
                    <StyledLink to="/signup">SIGN UP</StyledLink>
                </SigninNav>
            </SigninContainer>
            </>
            }
        </Container>
        </>
    )
};

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-end;
align-items: center;
height: 40vh;
`
const Title = styled(NavLink)`
font-size: 6rem;
font-family: var(--header-font-family);
margin: 1rem;
text-decoration: none;
`
const Text = styled.p`
margin: 0.5rem;
`
const UserText = styled(Text)`
color: var(--color-accent);
`
const TextContainer = styled.div`
margin: 1rem;
text-align: center;
`
const SigninContainer = styled.ul`
display: flex;
margin: 0.5rem;
font-size: 1.1rem;
`
const SigninNav = styled.li`
margin: 1rem;
font-weight: bold;
padding-bottom: 0.2rem;

&:hover{
    cursor: pointer;
    border-bottom: 0.2rem solid var(--color-accent);
    padding: 0;
}

&.active {
border-bottom: 0.2rem solid var(--color-accent);
}
`
const StyledLink = styled(Link)`
text-decoration: none;
color: var(--color-accent);
`
const SignOut = styled(Link)`
color: var(--color-accent);
margin: 1.5rem;
font-size: 1.1rem;
font-weight: bold;
padding-bottom: 0.2rem;
text-decoration: none;

&:hover{
    cursor: pointer;
    border-bottom: 0.2rem solid var(--color-accent);
    padding: 0;
}

&:active {
    border-bottom: 0.2rem solid var(--color-accent);
}
`

export default Header;