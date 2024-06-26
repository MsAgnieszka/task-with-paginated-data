import "./App.css";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "./screens/MainPage";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </div>
  );
};

export default App;
