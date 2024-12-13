import {Navigate, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import SignUpPage from "./pages/auth/SignUpPage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import {useEffect} from "react";
import {useAuthStore} from './store/authStore.js'


function App() {

    // protect routes that require authentication
    const ProtectedRoute = ({ children }) => {
        const { isAuthenticated, user } = useAuthStore();

        if (!isAuthenticated) {
            return <Navigate to='/login' replace />;
        }

        return children;
    };

    // redirect authenticated users to the home page
    const RedirectAuthenticatedUser = ({ children }) => {
        const { isAuthenticated, user } = useAuthStore();

        if (isAuthenticated) {
            return <Navigate to='/' replace />;
        }

        return children;
    };

    const {isCheckingAuth, checkAuth, isAuthenticated, user} = useAuthStore();
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    console.log("is authenticated", isAuthenticated)
    console.log(user)

  return (
      <>
          <Routes>
              <Route path="/" element={
                  <ProtectedRoute>
                      <HomePage />
                  </ProtectedRoute>
                  //<HomePage />
              }></Route>
              <Route path="/create" element={
                  <ProtectedRoute>
                      <CreatePage/>
                  </ProtectedRoute>
                  //<CreatePage />
              }></Route>
              <Route path="/signup" element={
                  <RedirectAuthenticatedUser>
                      <SignUpPage />
                  </RedirectAuthenticatedUser>
              }></Route>
              <Route path="/login" element={
                  <RedirectAuthenticatedUser>
                      <LoginPage />
                  </RedirectAuthenticatedUser>
              }></Route>
          </Routes>
      </>
  )
}

export default App
