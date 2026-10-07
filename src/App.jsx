import { BrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import {Navbar} from "./components/Navbar/Navbar";

function App() {

  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Dashboard/>
    </BrowserRouter>
    </>
  )
}

export default App;
