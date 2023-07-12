import { RiLoaderFill } from "react-icons/ri";
import { keyframes, styled } from "styled-components";

const Loading = () => {
return(
    <Wrapper>
        <RiLoaderFill/>
    </Wrapper>
    
)
};

const rotate = keyframes`
from {
transform: rotate(0deg)
}
to {
    transform: rotate(360deg)
}
`
const Wrapper = styled.div`
display: flex;
justify-content: center;
animation: ${rotate} 5s linear forwards infinite;
font-size: 3rem;
`

export default Loading;