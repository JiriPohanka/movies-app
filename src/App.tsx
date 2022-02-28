import { Routes, Route, BrowserRouter } from "react-router-dom";
import Detail from "./pages/Detail";
import Home from "./pages/Home";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="detail/:movieId" element={<Detail />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
