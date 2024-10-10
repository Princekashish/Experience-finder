import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface AuthStatusProps {
  onAuthChange: (isAuthenticated: boolean, userEmail?: string | null) => void;
}

const AuthStatus: React.FC<AuthStatusProps> = ({ onAuthChange }) => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const email = user?.email || null;

      if (email) {
        localStorage.setItem("user_email", email);
      } else {
        localStorage.removeItem("user_email");
      }

      setUserEmail(email);
      onAuthChange(!!email, email);
    });

    return () => unsubscribe();
  }, [auth, onAuthChange]);

  return null; // No UI rendered
};

export default AuthStatus;
