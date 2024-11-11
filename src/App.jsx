import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import SignUpPage from './pages/LoginOrSignupPage/SignUpPage';
import LoginPage from './pages/LoginOrSignupPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import ProfileSetupPage from './pages/ProfileSetupPage/ProfileSetupPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage /> }/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile-setup" element={<ProfileSetupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
