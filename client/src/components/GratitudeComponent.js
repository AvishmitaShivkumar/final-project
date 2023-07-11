import { useContext, useState } from "react";
import { TimerContext } from "./TimerContext";
import { UserContext } from "./UserContext";
import { CiEdit } from "react-icons/ci";
import { AiFillEdit } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { CiTrash } from "react-icons/ci";
import { styled } from "styled-components";


const GratitudeComponent = ({entry, toGet, setToGet}) => {
    const { loggedInUser } = useContext(UserContext);
    const { formattedDate } = useContext(TimerContext);
    const [ editting, setEditting ] = useState(false);
    const [ replaceText, setReplaceText ] = useState({date: formattedDate, id: entry.id});

    
    const handleInput = (key, value) => {
        setReplaceText({...replaceText, [key]: value});
    };

    const handleSave = (event) => {
        event.preventDefault();

      // sends the user's entry to the database
        fetch("/api/gratitude/edit", {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ accountId: loggedInUser._id, log: replaceText }),
        })
        .then(response => response.json())
        .then(() => {
            setEditting(false)
            setReplaceText({date: formattedDate, id: entry.id})
            setToGet(!toGet)
        })
    };

    const handleDelete = (event) => {
        event.preventDefault();

        // deletes the user's entry.
        fetch("/api/gratitude/delete", {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ accountId: loggedInUser._id, log: entry })
        });
        console.log("deleted")
        setToGet(!toGet)
    };

    return(
        !editting 
        ? <Wrapper  >
            <p>{entry.gratitude}</p> 
            <div>
                <Button type="button" onClick={() => {setEditting(true)}}>
                    <Edit/>
                {/* <AiFillEdit/> */}
                </Button>
                <Button type="button" onClick={handleDelete}><CiTrash/></Button>
            </div>
        </Wrapper>
        : 
        <Wrapper>
            <Input type="text" 
            id="gratitude" 
            placeholder="Enter your changes."
            onChange={(event) => handleInput(event.target.id, event.target.value)} />
            <Wrapper>
                <Button type="button" onClick={handleSave}>Save</Button>
                <CancelButton type="button" onClick={() => {setEditting(false)}}><MdCancel /></CancelButton>
            </Wrapper>
        </Wrapper>
    )
};

const Edit = styled(CiEdit)`

`
const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`
const Input = styled.input`
background: transparent;
border: 0.1rem solid var(--color-primary);
font-family: var(--body-font-family);
font-size: 1.5rem;
margin: 0.2rem;
padding: 0.2rem;
border-radius: 0.4rem;
width: 15vw;

&::placeholder {
    color: rgba(100,79,68,0.7);
    font-size: 1.2rem;
}
`
const Button = styled.button`
border-radius: 0.4rem;
width: auto;
padding: 0.2rem;
margin: 0.2rem;
font-family: var(--body-font-family);
font-size: 1.2rem;
background: transparent;
border: 0.1rem solid var(--color-primary);
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
const CancelButton =  styled(Button)`
line-height: 0;
padding: 0.35rem;
`
const EditButton = styled(Button)`
border: none;
`
export default GratitudeComponent;