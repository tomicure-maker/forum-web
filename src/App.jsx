import { BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import PostDetail from "./components/PostDetail/PostDetail";
import {Navbar} from "./components/Navbar/Navbar";



function App() {

  return (
    <>
        <Navbar />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route
                    path="/post/:id"
                    element={<PostDetail posts={posts}/>}
                />
            </Routes>
          </BrowserRouter>
      </>
  );
}

export default App;
