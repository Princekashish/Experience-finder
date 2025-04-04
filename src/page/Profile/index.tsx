import React, { useEffect, useState } from "react";
import { auth, db } from "../../lib/config/Firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { User } from "firebase/auth";
// import { format } from "date-fns";
import {
  User as UserIcon,
  CreditCard,
  History,
  Activity,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  XCircle,
  BookOpen,
} from "lucide-react";
import AuthStatus from "../../components/custom/AuthStatus";

interface CreditHistory {
  id: string;
  amount: number;
  type: "add" | "deduct";
  reason: string;
  timestamp: Date;
}

interface PaymentHistory {
  id: string;
  amount: number;
  status: "success" | "failed";
  timestamp: Date;
  plan: string;
}

interface UserActivity {
  id: string;
  type: "trip" | "learning_plan" | "generation";
  title: string;
  timestamp: Date;
}

interface LearningData {
  id: string;
  topicName: string;
  weeklyGoals: string[];
  userSelected: {
    hourperday: string;
    month: string;
    subject: string;
  };
}

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [credits, setCredits] = useState<number>(0);
  const [creditHistory, setCreditHistory] = useState<CreditHistory[]>([]);
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([]);
  const [learningData, setLearningData] = useState<LearningData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const fetchUserData = async (userId: string) => {
    if (isDataFetched) return; // Prevent multiple fetches

    try {
      setLoading(true);
      // Fetch user credits
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setCredits(userDoc.data()?.credits || 0);
      }

      // Fetch credit history
      const creditHistoryRef = collection(db, "users", userId, "creditHistory");
      const creditHistoryQuery = query(
        creditHistoryRef,
        orderBy("timestamp", "desc")
      );
      const creditHistorySnapshot = await getDocs(creditHistoryQuery);
      const creditHistoryData = creditHistorySnapshot.docs.map((doc) => ({
        id: doc.id,
        amount: doc.data().amount,
        type: doc.data().type,
        reason: doc.data().reason,
        timestamp: doc.data().timestamp.toDate(),
      }));
      setCreditHistory(creditHistoryData);

      // Fetch payment history
      const paymentHistoryRef = collection(
        db,
        "users",
        userId,
        "paymentHistory"
      );
      const paymentHistoryQuery = query(
        paymentHistoryRef,
        orderBy("timestamp", "desc")
      );
      const paymentHistorySnapshot = await getDocs(paymentHistoryQuery);
      const paymentHistoryData = paymentHistorySnapshot.docs.map((doc) => ({
        id: doc.id,
        amount: doc.data().amount,
        status: doc.data().status,
        plan: doc.data().plan,
        timestamp: doc.data().timestamp.toDate(),
      }));
      setPaymentHistory(paymentHistoryData);

      // Fetch learning data
      const learningRef = collection(db, "AiData_Learning");
      const learningQuery = query(learningRef, where("user", "==", userId));
      const learningSnapshot = await getDocs(learningQuery);

      //   learningSnapshot.forEach((doc) => {
      //     console.log(doc.id, "=>", doc.data());
      //   });
      const learningData = learningSnapshot.docs.map((doc) => ({
        id: doc.id,
        topicName: doc.data().topicName || "",
        weeklyGoals: doc.data().weeklyGoals || [],
        userSelected: {
          hourperday: doc.data().userSelected?.hourperday || "",
          month: doc.data().userSelected?.month || "",
          subject: doc.data().userSelected?.subject || "",
        },
      }));
      setLearningData(learningData);
      setIsDataFetched(true); // Mark data as fetched
    } catch (error) {
      console.error("Error fetching user learning history:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle auth state changes
  const handleAuthChange = async (
    isAuthenticated: boolean,
    email?: string | null,
    photoURL?: string,
    displayName?: string,
    uid?: string
  ) => {
    if (isAuthenticated && uid && !isDataFetched) {
      setUser(auth.currentUser);
      await fetchUserData(uid);
    } else if (!isAuthenticated) {
      setUser(null);
      setLoading(false);
      setIsDataFetched(false); // Reset fetch flag when user logs out
    }
  };

  // Initial auth check
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser && !isDataFetched) {
      setUser(currentUser);
      fetchUserData(currentUser.uid);
    } else {
      setLoading(false);
    }
  }, [isDataFetched]); // Only depend on isDataFetched

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <AuthStatus onAuthChange={handleAuthChange} />
      {user ? (
        <div className="max-w-6xl mx-auto flex  gap-5">
          {/* User Profile Section */}
          <div className="bg-gray-800 rounded-3xl p-8 mb-8  sticky top-20">
            <div className="flex items-center space-x-6 flex-col justify-center  gap-4">
              <img
                src={user.photoURL || "/profile-photo.png"}
                alt="Profile"
                className="w-24 h-24 rounded-full"
              />
              <div className="flex justify-center items-center flex-col">
                <h1 className="text-3xl font-bold">
                  {user.displayName || "Anonymous User"}
                </h1>
                <p className="text-gray-400">{user.email}</p>
                <div className="mt-4 flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span className="text-xl font-semibold">
                    {credits} Credits
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            {/* Credits History Section */}
            <div className="bg-gray-900 rounded-3xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <History className="w-6 h-6 mr-2" />
                Credits History
              </h2>
              <div className="space-y-4">
                {creditHistory.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-gray-800 rounded-xl"
                  >
                    <div className="flex items-center space-x-4">
                      {item.type === "add" ? (
                        <ArrowUp className="w-6 h-6 text-green-500" />
                      ) : (
                        <ArrowDown className="w-6 h-6 text-red-500" />
                      )}
                      <div>
                        <p className="font-semibold">{item.reason}</p>
                        <p className="text-sm text-gray-400">
                          {new Date(item.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`font-bold ${
                        item.type === "add" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {item.type === "add" ? "+" : "-"}
                      {item.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment History Section */}
            <div className="bg-gray-900 rounded-3xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <CreditCard className="w-6 h-6 mr-2" />
                Payment History
              </h2>
              <div className="space-y-4">
                {paymentHistory.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-gray-800 rounded-xl"
                  >
                    <div className="flex items-center space-x-4">
                      {item.status === "success" ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-500" />
                      )}
                      <div>
                        <p className="font-semibold">{item.plan}</p>
                        <p className="text-sm text-gray-400">
                          {new Date(item.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`font-bold ${
                        item.status === "success"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      ₹{item.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Plans Section */}
            <div className="bg-gray-900 rounded-3xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                Learning Plans
              </h2>
              <div className="space-y-4">
                {learningData.map((plan) => (
                  <div key={plan.id} className="p-6 bg-gray-800 rounded-xl">
                    <h3 className="text-xl font-semibold mb-4">
                      {plan.topicName}
                    </h3>

                    {/* Weekly Goals */}
                    <div className="mb-4">
                      <h4 className="text-gray-400 mb-2">Weekly Goals:</h4>
                      <ul className="list-disc list-inside space-y-2">
                        {plan.weeklyGoals.map((goal, index) => (
                          <li key={index} className="text-gray-300">
                            {goal}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* User Selected Preferences */}
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="bg-gray-700 p-3 rounded-lg">
                        <p className="text-gray-400">Hours per Day</p>
                        <p className="font-semibold">
                          {plan.userSelected.hourperday}
                        </p>
                      </div>
                      <div className="bg-gray-700 p-3 rounded-lg">
                        <p className="text-gray-400">Duration</p>
                        <p className="font-semibold">
                          {plan.userSelected.month}
                        </p>
                      </div>
                      <div className="bg-gray-700 p-3 rounded-lg">
                        <p className="text-gray-400">Subject</p>
                        <p className="font-semibold">
                          {plan.userSelected.subject}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <p>Please log in to view your profile</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
