import { Home } from "./pages/Home";
import { ResultsPage } from "./pages/ResultsPage";
import Drivers from "./pages/Drivers";
import Teams from "./pages/Teams";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import { NotFound } from "./pages/NotFound";
import './index.css';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route index element={<Home />}/>
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="*" element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;