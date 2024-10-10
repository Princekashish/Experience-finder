import React, { useEffect } from "react";
import { auth } from "../../../lib/config/Firebase"; // Import Firebase auth

interface AuthStatusProps {
  onAuthChange: (isAuthenticated: boolean, userEmail?: string | null) => void;
}

const AuthStatus: React.FC<AuthStatusProps> = ({ onAuthChange }) => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        onAuthChange(true, user.email);
      } else {
        onAuthChange(false);
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [onAuthChange]);

  return null; // This component does not render anything itself
};

export default AuthStatus;
