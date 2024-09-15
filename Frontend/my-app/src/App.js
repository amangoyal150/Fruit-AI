import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import ChatPage from './components/ChatPage';
import TranslatorPage from './components/TranslatorPage';
import FAQPage from './components/FAQPage';
import AboutPage from './components/AboutPage';
// import './App.css';
import CreateFAQ from './components/CreateFAQ';
import UpdateFAQ from './components/UpdateFAQ';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/translator" element={<TranslatorPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/faq/create" element={<CreateFAQ />} /> {/* Route for creating FAQ */}
        <Route path="/faq/update/:id" element={<UpdateFAQ />} /> {/* Route for updating FAQ */}
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
