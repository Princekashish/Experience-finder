import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

interface AuthStatusProps {
  onAuthChange: (isAuthenticated: boolean, userEmail?: string | null) => void;
}

const AuthStatus: React.FC<AuthStatusProps> = ({ onAuthChange }) => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      onAuthChange(!!user, user?.uid || null);
    });

    return () => unsubscribe();
  }, [auth, onAuthChange]);

  return null;
};

export default AuthStatus;
