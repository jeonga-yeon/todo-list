import { Route, Routes, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import LogIn from "./Components/LogIn";
import MyBoards from "./Components/MyBoards";
import "./router.css";

function Router() {
  const location = useLocation();
  return (
    <TransitionGroup className="transitions-wrapper">
      <CSSTransition key={location.pathname} classNames={"next"} timeout={1000}>
        <Routes location={location}>
          <Route path="/" element={<LogIn />} />
          <Route path="/boards" element={<MyBoards />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default Router;
