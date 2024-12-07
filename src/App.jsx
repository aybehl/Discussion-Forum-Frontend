import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignUpPage from "./pages/LoginOrSignupPage/SignUpPage";
import LoginPage from "./pages/LoginOrSignupPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import ProfileSetupPage from "./pages/ProfileSetupPage/ProfileSetupPage";
import { UserProvider } from "./contexts/UserProvider";
import { TagsProvider } from "./contexts/TagsProvider";
import QuestionDetailsPage from "./pages/QuestionDetailsPage/QuestionDetailsPage";
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage";

function App() {
  return (
    <UserProvider>
      <TagsProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/questions" element={<HomePage />} />
            <Route
              path="/signup/profile-setup"
              element={<ProfileSetupPage />}
            />

            <Route
              path="/questions/:questionId"
              element={<QuestionDetailsPage />}
            />

            <Route path="/edit-profile" element={<EditProfilePage />} />

            {/* <Route path="/posts" element={<PostsPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/mentions" element={<MentionsPage />} /> */}
          </Routes>
        </Router>
      </TagsProvider>
    </UserProvider>
  );
}

export default App;
