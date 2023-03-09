import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatPage from "./app/pages/ChatPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/rooms/:id" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
