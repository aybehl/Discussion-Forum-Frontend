import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignUpPage from "./pages/LoginOrSignupPage/SignUpPage";
import LoginPage from "./pages/LoginOrSignupPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import ProfileSetupPage from "./pages/ProfileSetupPage/ProfileSetupPage";
import { UserProvider } from "./contexts/UserProvider";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/signup/profile-setup" element={<ProfileSetupPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
