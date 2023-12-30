import { useContext, useState } from "react";
import { TimerContext } from "../TimerContext";
import { UserContext } from "../UserContext";
import { CiEdit } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import { CiTrash } from "react-icons/ci";
import { styled } from "styled-components";

const GratitudeComponent = ({ entry, toGet, setToGet }) => {
  const { loggedInUser } = useContext(UserContext);
  const { formattedDate } = useContext(TimerContext);
  const [editting, setEditting] = useState(false);
  const [replaceText, setReplaceText] = useState({
    date: formattedDate,
    id: entry.id,
  });

  const [loading, setLoading] = useState(false);

  const handleInput = (key, value) => {
    setReplaceText({ ...replaceText, [key]: value });
  };

  const handleSave = (event) => {
    event.preventDefault();

    replaceText.gratitude && setLoading(true);
    // sends the user's entry to the database
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/gratitude/edit`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accountId: loggedInUser._id, log: replaceText }),
    })
      .then((response) => response.json())
      .then(() => {
        setEditting(false);
        setReplaceText({ date: formattedDate, id: entry.id });
        setToGet(!toGet);
        setLoading(false);
      });
  };

  const handleDelete = (event) => {
    event.preventDefault();

    // deletes the user's entry.
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/gratitude/delete`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accountId: loggedInUser._id, log: entry }),
    });
    setToGet(!toGet);
  };

  return !editting ? (
    <Wrapper>
      <Text>{entry.gratitude}</Text>
      <div>
        <Button
          type="button"
          onClick={() => {
            setEditting(true);
          }}
        >
          <Edit />
        </Button>
        <Button type="button" onClick={handleDelete}>
          <Trash />
        </Button>
      </div>
    </Wrapper>
  ) : (
    <Wrapper>
      <Input
        type="text"
        id="gratitude"
        placeholder="Enter your changes."
        onChange={(event) => handleInput(event.target.id, event.target.value)}
      />
      <SaveCancelWrapper>
        <Button type="button" onClick={handleSave}>
          {loading ? "Saving" : "Save"}
        </Button>
        <CancelButton
          type="button"
          onClick={() => {
            setEditting(false);
          }}
        >
          <MdCancel />
        </CancelButton>
      </SaveCancelWrapper>
    </Wrapper>
  );
};

const Text = styled.p`
@media screen and (max-width: 800px) {
  font-size: 1.2rem;
}
`
const Edit = styled(CiEdit)`
@media screen and (max-width: 800px) {
  font-size: 1rem;
}
`
const Trash = styled(CiTrash)`
@media screen and (max-width: 800px) {
  font-size: 1rem;
}
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 800px) {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
`;
const SaveCancelWrapper = styled.div`
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
    color: rgba(100, 79, 68, 0.7);
    font-size: 1.2rem;

    @media screen and (max-width: 800px) {
    font-size: 1rem;
  }
  }
  
  @media screen and (max-width: 800px) {
    width: 50vw;
  }
`;
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
    border-color: rgba(100, 79, 68, 0.5);
    box-shadow: rgba(100, 79, 68, 0.1) 0 4px 12px;
    color: rgba(100, 79, 68, 0.8);
  }

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    background-color: rgba(100, 79, 68, 0.2);
    border-color: rgba(100, 79, 68, 0.5);
    box-shadow: rgba(100, 79, 68, 0.06) 0 2px 4px;
    color: rgba(0, 0, 0, 0.65);
    transform: translateY(0);
  }

  @media screen and (max-width: 800px) {
    font-size: 1rem;
    margin-top: 0.4rem;
  }
`;
const CancelButton = styled(Button)`
  line-height: 0;
  padding: 0.35rem;
`;
export default GratitudeComponent;
