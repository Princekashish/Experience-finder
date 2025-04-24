import React, { useEffect, useCallback } from "react";
import { auth, db } from "../../../lib/config/Firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { User } from "firebase/auth";

interface AuthStatusProps {
  onAuthChange: (
    isAuthenticated: boolean,
    userEmail?: string,
    photoURL?: string,
    displayName?: string,
    uid?: string
  ) => void;
}

interface UserProfile {
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  credits: number;
  uid: string;
}

const AuthStatus: React.FC<AuthStatusProps> = ({ onAuthChange }) => {
  const createOrGetUserProfile = useCallback(async (user: User) => {
    try {
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        const userProfile: UserProfile = {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          credits: 10,
          uid: user.uid,
        };

        await setDoc(userRef, userProfile);
      }
    } catch (error) {
      console.error("Error creating/getting user profile:", error);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          await createOrGetUserProfile(user);
          
          onAuthChange(
            true,
            user.email || undefined,
            user.photoURL || undefined,
            user.displayName || undefined,
            user.uid
          );
        } else {
          onAuthChange(false);
        }
      } catch (error) {
        console.error("Error in auth state change:", error);
        onAuthChange(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [onAuthChange, createOrGetUserProfile]);

  return null;
};

export default AuthStatus;
