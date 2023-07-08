import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import moment from "moment";
import NavComponent from "./NavComponent";
import styled from "styled-components";

const Gratitude = () => {
const { loggedInUser } = useContext(UserContext);
const [ gratitude, setGratitude ] = useState("");
const [ gotGratitude, setGotGratitude ] = useState("");

// this state is used to trigger the GET request
const [ toGet, setToGet ] = useState(true);

const currentDate = moment()._d;
const formattedDate = moment(currentDate).format("D MMMM YYYY");

// stores user input from the form in a state variable
const handleChange = (event) => {
    setGratitude(event.target.value)
};

const handleSubmit = (event) => {
    event.preventDefault();

    // sends the user's entry to the database
    fetch("/api/gratitude", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ accountId: loggedInUser._id, email: loggedInUser.email, log: gratitude}),
    })
    .then(response => response.json())
    .then(() => {
        setGratitude("");
        setToGet(!toGet)
    })

    // clears the form 
    event.target.reset();
};

// retrieves all the previous entries for the day for the logged in user.
useEffect(() => {
    fetch(`/api/gratitude/${loggedInUser._id}`)
    .then(response => response.json())
    .then(parsed => {
        if(parsed.status === 200){
            setGotGratitude(parsed.data.log)
        } else {
            setGotGratitude("")
        }
    })
},[toGet]);


return(
    <>
    <NavComponent/>
    {!loggedInUser 
    ? <p>Please sign in or create an account.</p>
    :
    <Wrapper>
        <Flower src="/flower-transparent.png"/>
        <GratitudeForm onSubmit={handleSubmit}>
            <Date>{formattedDate}</Date>
            <Label htmlFor="gratitude">What are you grateful for today?</Label>
            <GratitudeInput
            id="gratitude"
            rows={5}
            onChange={handleChange}
            />
            <Button type="submit">Save</Button>
            {gotGratitude &&
                gotGratitude
                .slice()
                .reverse()
                .map((log) => {
                    return (
                        <p key={Math.random()}>{log}</p>
                    )
                })
            }
        </GratitudeForm>
    </Wrapper>

    }
    </>
)
};

const Wrapper = styled.div`
display: flex;
justify-content: center;
`

const Flower = styled.img`
width: 15vw;
height: 40vh;
object-fit: cover;
margin: 2rem;
overflow: visible;
`
const GratitudeForm = styled.form`
display: flex;
flex-direction: column;
width: 25vw;
margin: 2rem 0;
`
const Date = styled.p`
padding-bottom: 0.3rem;
border-bottom: 0.2rem solid var(--color-primary);
`
const Label = styled.label`
font-size: 1.3rem;
font-style: italic;
margin: 1rem 0;
`
const GratitudeInput = styled.textarea`
background: transparent;
font-family: var(--body-font-family);
font-size: 1.3rem;
margin: 1rem 0;
padding: 1rem;
border-radius: 0.4rem;

&::placeholder {
    color: rgba(100,79,68,0.7);
    font-size: 1.3rem;
}
`
const Button = styled.button`
border-radius: 0.4rem;
width: auto;
padding: 0.5rem;
margin: 1rem 0;
font-family: var(--body-font-family);
font-size: 1.2rem;
background: transparent;
border: 0.1rem solid var(--color-primary);
color: var(--color-primary);
font-weight: bold;
transition: all 250ms;

&:hover, 
&:focus {
cursor: pointer;
border-color: rgba(100,79,68,0.5);
box-shadow: rgba(100,79,68,0.1) 0 4px 12px;
color: rgba(100,79,68,0.8);
}

&:hover {
transform: translateY(-1px);
}

&:active {
background-color: rgba(100,79,68,0.2);
border-color: rgba(100,79,68,0.5);
box-shadow: rgba(100,79,68, 0.06) 0 2px 4px;
color: rgba(0, 0, 0, 0.65);
transform: translateY(0);
}
`

export default Gratitude;