import {Dashboard} from "./pages/dashboard";
import {SignUp} from "./pages/SignUp";
import {SignIn} from "./pages/SignIn";
import {Brainly} from "./pages/Brainly" ; 
import {About} from "./pages/About" ; 
import {Contact} from "./pages/Contact" ;
import {ProtectedRoute} from "./components/ProtectedRoute" ;
import {BrowserRouter , Routes , Route} from "react-router-dom" ;  

function App() {
  return <BrowserRouter >
  <Routes>
    <Route path="/" element={<Brainly/>}/>
    <Route path="/signup" element={<SignUp/>} />
    <Route path="/signin" element={<SignIn/>} />
    <Route path="/dashboard" element={
      <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
    } />
    <Route path="/about" element={<About />} /> 
    <Route path="/contact" element={<Contact />} />
  </Routes>
  </BrowserRouter>
}

export default App