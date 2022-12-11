import { EthProvider } from "./contexts/EthContext";
import "./App.css";
import Home from "./components/home/home";
import {Routes, Route, useNavigate} from "react-router-dom";
import PageNotFound from "./components/PageNotFound/PageNotFound"
import Todo from "./components/Todo/todo"


function App() {
  const navigate = useNavigate();

  return (
     <EthProvider>
      <div id="App" >
      <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/todo" element={<Todo />} />
      <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
    </EthProvider> 
  );
}

export default App;
