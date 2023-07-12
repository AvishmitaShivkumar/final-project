import { keyframes, styled } from "styled-components";

const Breathe = () => {
  return (
  <Wrapper>
    <Circle>
      <p>Breathe</p>
    </Circle>
   </Wrapper>
  );
};

const Wrapper = styled.div`
display: flex;
justify-content: center;
`

const growShrink = keyframes`
0% { transform: scale(1) }
50% { transform: scale(1.2) }
100% { transform: scale(1)}
`
const Circle = styled.div`
height: 10rem;
width: 10rem;
background-image: url("/container-background.png");
border-radius: 50%; 
z-index: -1;
animation: ${growShrink} 9s linear forwards infinite;
display: flex;
justify-content: center;
align-items: center;
margin: 2rem;
`

export default Breathe;