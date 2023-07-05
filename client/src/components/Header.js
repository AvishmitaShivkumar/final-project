import styled from "styled-components";
import { NavLink, Link, useLocation } from "react-router-dom";


const Header = () => {
    // assigning location variable
    const location = useLocation();

    // destructuring pathname from location
    const { pathname } = location;

    // split method to get the name of the path in array
    const splitLocation = pathname.split("/");
    
    return(
        <>
        <Container>
            <Title to="/">Grounded</Title>
            <TextContainer>
                <p>Welcome.</p>
                <p>Stay as long as you'd like.</p>
            </TextContainer>
            <SigninContainer>
                <SigninNav className={splitLocation[1] === "signin" ? "active" : ""}>
                    <StyledLink to="/signin">SIGN IN</StyledLink>
                </SigninNav>
                <SigninNav className={splitLocation[1] === "signup" ? "active" : ""}>
                    <StyledLink to="/signup">SIGN UP</StyledLink>
                </SigninNav>
            </SigninContainer>
        </Container>
        </>
    )
};

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-end;
align-items: center;
height: 43vh;
`
const Title = styled(NavLink)`
font-size: 6rem;
font-family: var(--header-font-family);
margin: 1rem;
text-decoration: none;
`
const TextContainer = styled.div`
margin: 1rem;
text-align: center;
`
const SigninContainer = styled.ul`
display: flex;
margin: 1rem;
font-size: 1.1rem;
`
const SigninNav = styled.li`
margin: 1rem;
font-weight: bold;

&.active {
border-bottom: 0.2rem solid var(--color-accent);
}
`
const StyledLink = styled(Link)`
text-decoration: none;
color: var(--color-accent);
`

export default Header;