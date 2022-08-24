import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from '@mui/material/Container';

// Components
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

// Context States
import NoteState from "./contexts/notes/NoteState";
import DialogState from "./contexts/dialog/DialogState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";
import Profile from "./components/Profile";

const App = () => {
  return (
    <>
      <DialogState>
        <NoteState>
            <BrowserRouter>
              <Navbar />
              <Container style={{marginTop: 70}}>
                <Routes>
                  <Route index element={<Home />} />
                  {/* <Route path="/" element={<Home />} /> */}
                  <Route path="/about" element={<About />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </Container>
              <Alert />
            </BrowserRouter>
        </NoteState>
      </DialogState>
    </>
  );
};

export default App;
