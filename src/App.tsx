import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
