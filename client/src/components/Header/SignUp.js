import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../UserContext";

const SignUp = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //  stores the user entered input values in a state
  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = (event) => {
    setErrorMessage("");
    // prevent's form's default behaviour
    event.preventDefault();

    // dictates whether the button says "Sign in" or  "Signing in"
    if (!loggedInUser && formData) {
      setLoading(true);
    } else {
      setLoading(false);
    }

    // creates a new user in the database - POST
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }),
    })
      .then((response) => response.json())
      .then((parsed) => {
        if (parsed.status === 201) {
          setLoggedInUser(parsed.data);
          navigate("/signupconfirmation");
        } else {
          setErrorMessage(parsed.error);
        }
      });

    // clears the form
    event.target.reset();
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          id="name"
          placeholder="Full name"
          onChange={(event) =>
            handleChange(event.target.id, event.target.value)
          }
        />
        <Input
          type="email"
          id="email"
          placeholder="Email"
          onChange={(event) =>
            handleChange(event.target.id, event.target.value)
          }
        />
        <Input
          type="password"
          id="password"
          placeholder="Password"
          onChange={(event) =>
            handleChange(event.target.id, event.target.value)
          }
        />
        <Button type="submit">{loading ? "Signing up" : "Sign up"}</Button>
        {errorMessage && <SignUpError>{errorMessage}</SignUpError>}
      </Form>
    </>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background: url("/container-background.png") no-repeat center;
  height: 20vh;
  padding: 10vh;
  position: relative;
`;
const Input = styled.input`
  font-family: var(--body-font-family);
  font-size: 1.2rem;
  text-align: center;
  width: 30vw;
  border: 0.1rem solid var(--color-accent);
  margin: 1rem;

  &::placeholder {
    color: var(--color-accent);
    font-style: italic;
  }
`;
const Button = styled.button`
  background-color: var(--color-accent);
  color: white;
  border: none;
  border-radius: 0.4rem;
  width: 10rem;
  padding: 0.5rem;
  margin: 1rem;
  font-family: var(--body-font-family);
  font-size: 1.2rem;

  &:hover,
  &:focus {
    background-color: rgba(203, 128, 125, 0.8);
  }

  &:active {
    transform: scale(1.05);
  }
`;
const SignUpError = styled.p`
  margin-top: 2rem;
  font-size: 1.3rem;
  position: absolute;
  bottom: 3rem;
`;

export default SignUp;
