import { Link, useLocation } from "react-router-dom";
import { styled } from "styled-components";


const NavComponent = () => {
    // assigning location variable for navigation.
    const location = useLocation();

    // destructuring pathname from location
    const { pathname } = location;

    // split method to get the name of path in array.
    const splitLocation = pathname.split("/");

    return(
        <>
        <Wrapper>
            <Navigation className={splitLocation[1] === "meditation" ? "active" : ""}>
                <StyledLink to="/meditation">Meditation</StyledLink>
                </Navigation>    
            <Navigation className={splitLocation[1] === "gratitude" ? "active" : ""}>
            <StyledLink to="/gratitude">Gratitude</StyledLink>
                </Navigation>
        </Wrapper>
        </>
    );
};


const Wrapper = styled.ul`
display: flex;
justify-content: center;
`
const StyledLink = styled(Link)`
text-decoration: none;
`

const Navigation = styled.li`
margin: 1rem 6rem;
font-weight: bold;
padding-bottom: 0.2rem;

&:hover{
    border-bottom: 0.2rem solid var(--color-primary);   
    padding: 0; 
}

&.active {
border-bottom: 0.2rem solid var(--color-primary);
}
`

export default NavComponent;