import { Link } from "react-router-dom";
import { styled } from "styled-components";
import NavComponent from "./NavComponent";


const Homepage = () => {

    return(
        // quote goes here

        <NavComponent/>
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
margin: 1rem 4rem;
font-weight: bold;

&.active {
border-bottom: 0.2rem solid var(--color-accent);
}
`

export default Homepage;