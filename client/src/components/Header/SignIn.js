import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../UserContext";

const SignIn = () => {
  const { setLoggedInUser } = useContext(UserContext);
  const [formData, setFormData] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // stores the user entered input values in a state
  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleClick = () => {
    // dictates whether the button says "Sign in" or  "Signing in"
    formData && setLoading(true);
  };

  const handleSubmit = (event) => {
    // prevent's form's default behaviour
    event.preventDefault();

    // fetches the user information or returns an error message if there is no account.
    fetch("/api/signin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    })
      .then((response) => response.json())
      .then((parsed) => {
        if (parsed.status === 200) {
          setLoggedInUser(parsed.data);
          setLoading(false);
          navigate("/");
        } else {
          setErrorMessage(parsed.error);
        }
      });

    // clear's the form
    event.target.reset();
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
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
        <Button onClick={handleClick}>
          {loading ? "Signing in" : "Sign in"}
        </Button>
        {errorMessage && <SignInError>{errorMessage}</SignInError>}
      </Form>
    </>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background: url("./container-background.png") no-repeat center;
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
const SignInError = styled.p`
  margin-top: 2rem;
  font-size: 1.3rem;
  position: absolute;
  bottom: 3rem;
`;
export default SignIn;
