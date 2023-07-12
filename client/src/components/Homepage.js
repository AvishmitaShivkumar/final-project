import { useContext, useEffect, useState } from "react";
import NavComponent from "./NavComponent";
import { styled } from "styled-components";
import Breathe from "./Breathe";
import Loading from "./Loading";
import { UserContext } from "./UserContext";



const Homepage = () => {
    const { loggedInUser } = useContext(UserContext);
    const [ quotes, setQuotes ] = useState("");

    useEffect(() => {
        fetch("/api/quote")
        .then(response => response.json())
        .then(parsed => {
            setQuotes(parsed.data)
        })
    }, [])

    return(
        <>
        <NavComponent/>
        <Breathe/>
    
    {!loggedInUser
    ? <Description>
    <p>Grounded, very simply, offers you the chance to gain or regain some grounding.
        {/* You'll need to create a free account and then all your meticulous progress will be saved.  */}
        {/* Take a breath. Now, take another. Take your time here.  */}
    </p>
    {/* <Text>Take some time to meditate or express gratitude.</Text> */}
    {/* <Text>Regardless of whether you choose to meditate or express gratitude, you'll hopefully leave feeling just a touch better.</Text> */}
    <p>Please sign in or create a free account </p>
    </Description>
    :
    !quotes
        ? <Loading/>
        : <>
        {quotes.map((quote, index) => {
            return(
                <QuoteWrapper key={index}>
                    <QuoteDetails>{quote.q}</QuoteDetails>
                    <QuoteDetails>- {quote.a}</QuoteDetails>
                </QuoteWrapper>
            )
        }) }
        </>
    }
    
    </>
    );
};

const QuoteWrapper = styled.div`
width: 80vw;
margin: auto;
text-align: center;
margin-top: 4rem;
`
const QuoteDetails = styled.p`
margin: 2rem;
`
const Description = styled.div`
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;
height: 10vh;
margin: 2rem;
`


export default Homepage;