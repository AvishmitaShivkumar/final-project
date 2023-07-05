import { BrowserRouter, Routes, Route} from "react-router-dom";
import Homepage from "./Homepage";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SignUpConfirmation from "./SignUpConfirmation";


const App = () => {
  
  return (
  <BrowserRouter>
  <GlobalStyles/>
  <Header/>
  <Routes>
    <Route path="/" element={<Homepage/>}/>
    <Route path="/signin" element={<SignIn/>}/>
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="/signup/confirmation" element={<SignUpConfirmation/>}/>
  </Routes>
  </BrowserRouter>
  );
}

export default App;
