import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnalyzeForm from "./components/AnalyzeForm";
import ResultViewer from "./components/ResultViewer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AnalyzeForm />} />
        <Route path="/result/:id" element={<ResultViewer />} />
      </Routes>
    </Router>
  );
}

export default App;
