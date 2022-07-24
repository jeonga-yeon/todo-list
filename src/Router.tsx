import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./Components/LogIn";
import MyBoards from "./Components/MyBoards";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/boards" element={<MyBoards />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
