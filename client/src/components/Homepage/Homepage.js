import { useContext, useEffect, useState } from "react";
import NavComponent from "../NavComponent";
import { styled } from "styled-components";
import Breathe from "./Breathe";
import Loading from "../Loading";
import { UserContext } from "../UserContext";

const Homepage = () => {
  const { loggedInUser } = useContext(UserContext);
  const [quotes, setQuotes] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/quote`)
      .then((response) => response.json())
      .then((parsed) => {
        setQuotes(parsed.data);
      });
  }, []);

  return (
    <>
      <NavComponent />
      <Breathe />

      {!loggedInUser ? (
        <Description>
          <Text>Grounded, very simply, gives you some help centering yourself. </Text>
          <Text>Please sign in or create a free account </Text>
        </Description>
      ) : !quotes ? (
        <Loading />
      ) : (
        <>
          {quotes.map((quote, index) => {
            return (
              <QuoteWrapper key={index}>
                <QuoteDetails>{quote.q}</QuoteDetails>
                <QuoteDetails>- {quote.a}</QuoteDetails>
              </QuoteWrapper>
            );
          })}
        </>
      )}
    </>
  );
};

const QuoteWrapper = styled.div`
  width: 80vw;
  margin: auto;
  text-align: center;
  margin-top: 4rem;

  @media screen and (max-width:800px) {
    margin-top: 1rem;
  }
`;
const QuoteDetails = styled.p`
  margin: 2rem;

  @media screen and (max-width:800px) {
    font-size: 1.3rem;
  }
`;
const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 10vh;
  margin: 2rem;

  @media screen and (max-width: 800px) {
    height: 20vh;
    margin: 1rem 2rem;
  }
`;
const Text = styled.p`
font-size: 1.2rem;
`;

export default Homepage;
