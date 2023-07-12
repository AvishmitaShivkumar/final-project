import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import NavComponent from "./NavComponent";
import styled from "styled-components";
import GratitudeComponent from "./GratitudeComponent";
import { TimerContext } from "./TimerContext";
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";
import Loading from "./Loading";

const Gratitude = () => {
    // generates a unique id.
    let id = uuidv4();

const { loggedInUser } = useContext(UserContext);
const { formattedDate } = useContext(TimerContext);

const [ gratitude, setGratitude ] = useState({date: formattedDate, id});
const [ gotGratitude, setGotGratitude ] = useState("");

// any change in this state triggers the GET request
const [ toGet, setToGet ] = useState(true);

const [ loading, setLoading ] = useState(false);

// stores user input from the form in a state variable
const handleChange = (key, value) => {
    setGratitude({...gratitude, [key]: value});
};

const handleClick = () => {
    gratitude.gratitude && setLoading(true);
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
        setGratitude({date: formattedDate, id});
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
            setLoading(false)
        } else {
            setGotGratitude("")
            setLoading(false)
        }
    })
},[toGet]);


return(
    <>
    <NavComponent/>
    {!loggedInUser 
    ? <Message>
        <p>Please <Link to="/signin">sign in</Link> or <Link to="/signup">create a free account</Link> to use this feature.</p>
      </Message>
    :
    <Wrapper>
        <Flower src="/flower-transparent.png"/>
        <GratitudeForm onSubmit={handleSubmit}>
            <Date>{formattedDate}</Date>
            <Label htmlFor="gratitude">What are you grateful for today?</Label>
            <GratitudeInput
            id="gratitude"
            rows={5}
            onChange={(event) => handleChange(event.target.id, event.target.value)}
            />
            <Button type="submit" onClick={handleClick}>{loading ? "Saving" : "Save"}</Button>
            {!gotGratitude 
            ? <Loading/> 
                : gotGratitude.filter((entry) => {
                    if(entry.date === formattedDate) {
                        return entry
                    }
                })
                .slice()
                .reverse()
                .map((entry) => {
                    return (
                        <div key={entry.id}>
                        <GratitudeComponent entry={entry} toGet={toGet} setToGet={setToGet} />
                        </div>
                    )
                })
            }
            
        </GratitudeForm>
    </Wrapper>

    }
    </>
)
};

const Message = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 20vh;
`
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