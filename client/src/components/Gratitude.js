import { styled } from "styled-components";
import NavComponent from "./NavComponent";
import moment from "moment";
import { useState } from "react";

const Gratitude = () => {
    const currentDate = moment()._d;
    const formattedCurrentDate = moment(currentDate).format("D MMMM YYYY");

    const [ dailyGratitude, setDailyGratitude ] = useState("");
    // const [ savedGratitude, setSavedGratitude ] = useState("");

    const handleChange = (key, value) => {
        setDailyGratitude({...dailyGratitude, [key]: value});
    };
    
    // GET in a useEffect to retrieve all entries for the date from the collection.

    const handleSubmit = (event, key, value) => {
        // prevent's form's default behaviour
        event.preventDefault();

        // setSavedGratitude(...savedGratitude, dailyGratitude.gratitude);
        

        // POST to update the gratitude collection 
        

        // clears the form
        event.target.reset();
    
    };

    console.log(dailyGratitude)
    // console.log(savedGratitude)

    return(
        <>
        <NavComponent/>
        <Wrapper>
            <Flower src="/flower-transparent.png"/>
            <GratitudeForm onSubmit={handleSubmit}>
                <Date>{formattedCurrentDate}</Date>
                <Label htmlFor="daily gratitude">What are you grateful for today?</Label>
                <GratitudeInput 
                id="gratitude" 
                name={formattedCurrentDate}
                placeholder="A thunderstorm breaking a heatwave. Your turn!"
                rows={5}
                onChange={(event) => handleChange(event.target.id, event.target.value)}
                />
                <Button type="submit">Save</Button>
                {dailyGratitude &&
            <p>{dailyGratitude.gratitude}</p>
            }
            </GratitudeForm>
        </Wrapper>
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