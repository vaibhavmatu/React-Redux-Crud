import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import AddUser from "./pages/AddUser";
import EditUser from './pages/EditUser';

function App() {
  return (
    <div className="App">
     <Routes>
     <Route exact path="/" element={<Home />}></Route>
     <Route exact path="/addUser" element={<AddUser />}></Route>
     <Route exact path="/editUser/:id" element={<EditUser />}></Route>
     </Routes>
    </div>
  );
}

export default App;
