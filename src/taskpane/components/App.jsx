/* eslint-disable no-undef */
import React, { useState } from "react";
import { makeStyles, Button, tokens } from "@fluentui/react-components";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // Correct import
import Home from "./Home";
import Header from "./Header";

// Styles for the root container
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100dvh",
    backgroundColor: "#f3f2f1", // Light Fluent UI background
    padding: "2rem",
  },
  topBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "1rem",
    paddingBottom: "1rem",
  },
  userImage: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    objectFit: "cover", // Ensures the image is cropped nicely within the circle
    border: `2px solid ${tokens.colorNeutralStroke1}`,
  },
  loginContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
    backgroundColor: "#ffffff", // White background for login area
    padding: "2rem",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    width: "100%",
  },
  button: {
    marginTop: "1.5rem",
    width: "100%",
  },
  welcomeText: {
    marginBottom: "1rem",
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#333333",
  },
});

const App = () => {
  const styles = useStyles();
  const [authToken, setAuthToken] = useState(null); // To store the OAuth token
  const [user, setUser] = useState(null); // To store the authenticated user details
  const [isHomePage, setIsHomePage] = useState(false); // To track if we are on the home page

  // Handle successful login
  const handleLoginSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    const decodedUser = jwtDecode(token);
    setAuthToken(token);
    setUser(decodedUser);
    setIsHomePage(true); // Navigate to home after login
  };

  // Handle login failure
  const handleLoginError = () => {
    console.error("Google login failed");
  };

  // Handle logout
  const logoutHandler = () => {
    googleLogout(); // Revoke the Google token (optional)
    setAuthToken(null); // Clear the auth token
    setUser(null); // Clear the user state
    setIsHomePage(false); // Go back to login page after logout
  };

  return (
    <div className={styles.root}>
      <Header logo="../../../assets/optimus-logo-01.png" user={user ? user : null} />
      {authToken && (
        <div className={styles.topBar}>
          {user && (
            <>
              <img
                src={
                  user?.picture
                    ? user.picture
                    : "https://w7.pngwing.com/pngs/184/113/png-transparent-user-profile-computer-icons-profile-heroes-black-silhouette-thumbnail.png"
                }
                alt="User Avatar"
                className={styles.userImage}
              />
              <Button appearance="primary" shape="circular" onClick={logoutHandler}>
                Logout
              </Button>
            </>
          )}
        </div>
      )}
      <GoogleOAuthProvider clientId={process.env.REACT_APP_Google_Client_Id}>
        {!authToken && !isHomePage && (
          <div className={styles.loginContainer}>
            <h1 className={styles.welcomeText}>Welcome! Please sign in with Google</h1>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
              render={(renderProps) => (
                <Button
                  appearance="primary"
                  size="large"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className={styles.button}
                >
                  Sign in with Google
                </Button>
              )}
            />
          </div>
        )}
        {authToken && isHomePage && <Home user={user ? user : null} />}
      </GoogleOAuthProvider>
    </div>
  );
};

export default App;
