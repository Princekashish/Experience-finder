import { useState, useEffect, useCallback } from 'react';
import { auth } from '../lib/config/Firebase';
import { User, onAuthStateChanged } from 'firebase/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const handleAuthChange = useCallback((currentUser: User | null) => {
    // Only update if the user state has actually changed
    if (currentUser?.uid !== user?.uid) {
      setUser(currentUser);
      setLoading(false);
    }
  }, [user?.uid]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthChange);

    return () => {
      unsubscribe();
    };
  }, [handleAuthChange]);

  return { user, loading };
}; 