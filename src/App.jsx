import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [profilePic, setProfilePic] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const responseGoogleSuccess = (response) => {
    console.log(response);
    const {
      profileObj: { name, email, imageUrl },
    } = response;
    setName(name);
    setEmail(email);
    setProfilePic(imageUrl);
    setIsLoggedIn(true);
  };

  const responseGoogleFailure = (error) => {
    console.error("Erro de autenticação:", error);
    setIsLoggedIn(false); // Limpa o estado em caso de erro
  };

  return (
    <>
      <GoogleOAuthProvider clientId="1031021177024-oh5eo3f6tpars8a7ea0569jqkgc9dsub.apps.googleusercontent.com">
        <div>
          <h1>Oi</h1>
        </div>
        <div>
          <GoogleLogin
            clientId="1031021177024-oh5eo3f6tpars8a7ea0569jqkgc9dsub.apps.googleusercontent.com"
            onSuccess={responseGoogleSuccess}
            onFailure={responseGoogleFailure}
          />
          {isLoggedIn && ( // Exibe informações do usuário apenas se estiver logado
            <div style={{ textAlign: "center" }}>
              <h1>User Information</h1>
              <p>Name: {name}</p>
              <p>Email: {email}</p>
              {profilePic && <img src={profilePic} alt="Profile Picture" />}
            </div>
          )}
        </div>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
