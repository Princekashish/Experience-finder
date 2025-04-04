import React, { useEffect } from "react";
import { auth, db } from "../../../lib/config/Firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { User } from "firebase/auth";

interface AuthStatusProps {
  onAuthChange: (isAuthenticated: boolean, userEmail?: string | null, photoURL?: string, displayName?: string, uid?: string) => void;
}

const AuthStatus: React.FC<AuthStatusProps> = ({ onAuthChange }) => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Create or get user profile with credits on login/signup
        await createOrGetUserProfile(user);

        // Pass user info to parent component including uid
        onAuthChange(true, user.email || undefined, user.photoURL || undefined, user.displayName || undefined, user.uid);
      } else {
        onAuthChange(false);
      }
    });

    return () => unsubscribe();
  }, [onAuthChange]);

  return null;
};

// Create or get user profile in Firestore
const createOrGetUserProfile = async (user: User) => {
  const userRef = doc(db, "users", user.uid);

  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    // If the user doesn't exist, create a new profile with 10 credits
    await setDoc(userRef, {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      credits: 10, // Initialize with 10 credits
      uid: user.uid, // Include uid in the profile
    });
  }
};

export default AuthStatus;
