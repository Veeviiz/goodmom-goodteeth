import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/quiz" element={<Quiz></Quiz>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
