import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header/Header";
import SignIn from "./Header/SignIn";
import SignUp from "./Header/SignUp";
import SignUpConfirmation from "./SignUpConfirmation";
import Meditation from "./Meditation/Meditation";
import Gratitude from "./Gratitude/Gratitude";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signupconfirmation" element={<SignUpConfirmation />} />
        <Route path="/meditation" element={<Meditation />} />
        <Route path="/gratitude" element={<Gratitude />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
