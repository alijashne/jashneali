import { useEffect } from "react";

const TruecallerLogin = () => {
  useEffect(() => {
    window.Truecaller &&
      window.Truecaller.init({
        appId: "4bDESae83adf3ddb54f829f18db0c506daca5", // Replace with your Truecaller app ID
        button: "truecaller-login-button", // ID of the Truecaller login button
        onSuccess: (response) => {
          console.log("Truecaller login successful:", response);
        },
        onFailure: (response) => {
          console.error("Truecaller login failed:", response);
        },
      });
  }, []);

  const handleTruecallerLogin = () => {
    // Trigger Truecaller login
    window.Truecaller && window.Truecaller.open();
  };

  return (
    <div>
      <button id="truecaller-login-button" onClick={handleTruecallerLogin}>
        Login with Truecaller
      </button>
    </div>
  );
};

export default TruecallerLogin;
