import { useEffect, useState } from "react";
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
import {
  Trophy,
  Users,
  Coins,
  History,
  CreditCard,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  XCircle,
  PlaneTakeoff,
  Twitter,
} from "lucide-react";
import AuthStatus from "../../components/custom/AuthStatus";
import ScrollTop from "../../lib/ScrollTop";

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

// interface LearningData {
//   id: string;
//   topicName: string;
//   weeklyGoals: string[];
//   userSelected: {
//     hourperday: string;
//     month: string;
//     subject: string;
//   };
// }

interface RelaxData {
  id: string;
  userSelected: {
    budget: string;
    duration: string;
    fromLocation: string;
    toLocation: string;
    people: string;
    planningWith: string;
  };
}


const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [credits, setCredits] = useState<number>(0);
  const [creditHistory, setCreditHistory] = useState<CreditHistory[]>([]);
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([]);
  // const [learningData, setLearningData] = useState<LearningData[]>([]);
  const [relaxData, setRelaxData] = useState<RelaxData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [activeTab, setActiveTab] = useState("credits");
  // Mock game history data - replace with actual fetch in production
  // const [gameHistory, setGameHistory] = useState<GameHistory[]>([
  //   { id: "1", name: "Starcraft II", result: "Won" },
  //   { id: "2", name: "League of Legends", result: "Lost" },
  //   { id: "3", name: "Starcraft II", result: "Won" },
  // ]);

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
      // const learningRef = collection(db, "AiData_Learning");
      // const learningQuery = query(learningRef, where("user", "==", userId));
      // const learningSnapshot = await getDocs(learningQuery);
      // const learningData = learningSnapshot.docs.map((doc) => ({
      //   id: doc.id,
      //   topicName: doc.data().topicName || "",
      //   weeklyGoals: doc.data().weeklyGoals || [],
      //   userSelected: {
      //     hourperday: doc.data().userSelected?.hourperday || "",
      //     month: doc.data().userSelected?.month || "",
      //     subject: doc.data().userSelected?.subject || "",
      //   },
      // }));
      // setLearningData(learningData);

      // Fetch relax data
      const relaxRef = collection(db, "AiData_Relax");
      const relaxQuery = query(relaxRef, where("user", "==", userId));
      const relaxSnapshot = await getDocs(relaxQuery);
      const relaxData = relaxSnapshot.docs.map((doc) => ({
        id: doc.id,
        userSelected: {
          budget: doc.data().userSelected?.budget || "",
          duration: doc.data().userSelected?.duration || "",
          fromLocation: doc.data().userSelected?.fromLocation || "",
          toLocation: doc.data().userSelected?.toLocation || "",
          people: doc.data().userSelected?.people || "",
          planningWith: doc.data().userSelected?.planningWith || "",
        },
      }));
      setRelaxData(relaxData);

      setIsDataFetched(true); // Mark data as fetched
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle auth state changes
  const handleAuthChange = async (
    isAuthenticated: boolean,
    userEmail?: string | null,
    photoURL?: string,
    displayName?: string,
    uid?: string
  ) => {
    if (
      isAuthenticated &&
      uid &&
      userEmail &&
      photoURL &&
      displayName &&
      !isDataFetched
    ) {
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
      <div className="min-h-screen  text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12  border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  text-white">
      <ScrollTop />
      <AuthStatus onAuthChange={handleAuthChange} />
      {user ? (
        <div className="container mx-auto px-4 py-8 ">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - User Info */}
            <div className="lg:w-1/3">
              {/* Profile Card */}
              <div className="bg-white/10 rounded-3xl overflow-hidden shadow-lg mb-6 ">
                <div className="relative">
                  <div className="h-32 bg-[#1A1A1A]"></div>
                  <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                    <img
                      src={user.photoURL || "/profile-photo.png"}
                      alt="Profile"
                      className="w-32 h-32 rounded-full border-2 p-1 border-yellow-600"
                    />
                  </div>
                </div>
                <div className="pt-20 pb-6 px-6 text-center">
                  <div className="bg-gray-700/50 inline-block px-3 py-1 rounded-full mb-2">
                    <span className="text-sm text-white font-medium">PRO</span>
                  </div>
                  <h1 className="text-3xl font-bold  ">
                    {user.displayName || "Anonymous User"}
                  </h1>
                  <p className="text-gray-400 text-sm font-light tracking-tighter mb-4">
                    {user.email}
                  </p>
                  <p className="text-gray-100 tracking-tighter mb-2">
                    Joined January 2024
                  </p>
                  <p className="text-white/90 font-light mb-6 text-sm">
                    Let me know the vibe you're going for—adventurous, classy,
                    minimal, or playful—and I can give you a few variations too!
                  </p>
                  <div className="flex justify-center space-x-4">
                    <a
                      href="https://www.linkedin.com/in/princekashish/"
                      target="_black"
                    >
                      <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-700 hover:bg-gray-600 transition">
                        <Twitter className="w-4 h-4" />
                        <span>Twitter</span>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Stats & Details */}
            <div className="lg:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Coins Card */}
                <div className="backdrop-blur-xl bg-white/10 border-[1px] border-gray-50    rounded-3xl p-6 shadow-lg">
                  <h3 className="text-gray-400 mb-2 flex items-center">
                    <Coins className="w-4 h-4 mr-2" />
                    Coins
                  </h3>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{credits}</span>
                    <span className="text-sm text-gray-400 ml-2">
                      Total Earned
                    </span>
                  </div>
                </div>
                {/* Trip History Card */}
                <div className="backdrop-blur-xl bg-white/10 border-[1px] border-gray-50 rounded-3xl p-6 shadow-lg">
                  <h3 className="text-gray-400 mb-2 flex items-center">
                    <Trophy className="w-4 h-4 mr-2" />
                    History
                  </h3>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">
                      {relaxData.length}
                    </span>
                    <span className="text-sm text-gray-400 ml-2">
                      Generated
                    </span>
                  </div>
                </div>

                {/* Payment Card */}
                <div className=" bg-white/10 border-[1px] border-gray-50   rounded-3xl p-6 shadow-lg">
                  <h3 className="text-gray-400 mb-2 flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Payment
                  </h3>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">
                      {paymentHistory.length}
                    </span>
                    <span className="text-sm text-gray-400 ml-2">
                      Payment Histoy
                    </span>
                  </div>
                </div>
              </div>

              {/* Recent Game History */}
              <div className="bg-[#1A1A1A]  text-gray-400  rounded-3xl p-6 shadow-lg mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Recent</h2>
                </div>
                <div className="space-y-3">
                  {[...relaxData] // Create a copy of the array to avoid mutating the original
                    .reverse() // Reverse the array to get newest first
                    .slice(0, 3) // Take only the first 3 items
                    .map((trip) => (
                      <div
                        key={trip.id}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center">
                          <PlaneTakeoff className="w-5 h-5 mr-3" />
                          <span>
                            {trip.userSelected.fromLocation} →{" "}
                            {trip.userSelected.toLocation}
                          </span>
                        </div>
                        <span className="px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-400">
                          {trip.userSelected.duration} Days
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Tab Navigation for History */}
              <div className="bg-[#1A1A1A]  text-gray-400   rounded-t-3xl p-4 ">
                <div className="flex border-b border-gray-700">
                  <button
                    onClick={() => setActiveTab("credits")}
                    className={`py-2 px-4 ${
                      activeTab === "credits"
                        ? "border-b-2 border-blue-500 text-blue-500"
                        : "text-gray-400"
                    }`}
                  >
                    Credits History
                  </button>
                  <button
                    onClick={() => setActiveTab("payments")}
                    className={`py-2 px-4 ${
                      activeTab === "payments"
                        ? "border-b-2 border-blue-500 text-blue-500"
                        : "text-gray-400"
                    }`}
                  >
                    Payment History
                  </button>
                  <button
                    onClick={() => setActiveTab("trips")}
                    className={`py-2 px-4 ${
                      activeTab === "trips"
                        ? "border-b-2 border-blue-500 text-blue-500"
                        : "text-gray-400"
                    }`}
                  >
                    Trip Plans
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="bg-[#1A1A1A] rounded-b-3xl p-6 shadow-lg h-[32vh]  overflow-auto no-scrollbar ">
                {activeTab === "credits" && (
                  <div className="space-y-4 ">
                    <h3 className="text-lg font-semibold flex items-center  text-gray-400">
                      <History className="w-5 h-5 mr-2" />
                      Credits History
                    </h3>
                    {creditHistory.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 bg-zinc-800  rounded-3xl"
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
                            item.type === "add"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {item.type === "add" ? "+" : "-"}
                          {item.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "payments" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center  text-gray-400">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Payment History
                    </h3>
                    {paymentHistory.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4  bg-zinc-800  rounded-xl"
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
                )}

                {activeTab === "trips" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center  text-gray-400">
                      <PlaneTakeoff className="w-5 h-5 mr-2" />
                      Trip Plans
                    </h3>
                    {[...relaxData].reverse().map((plan) => (
                      <div key={plan.id} className="p-4  bg-zinc-800  rounded-xl">
                        <h3 className="text-lg font-semibold mb-3">
                          {plan.userSelected.fromLocation} →{" "}
                          {plan.userSelected.toLocation}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                          <div className="bg-zinc-700 p-3 rounded-lg">
                            <p className="text-gray-400">Duration</p>
                            <p className="font-semibold">
                              {plan.userSelected.duration} Days
                            </p>
                          </div>
                          <div className="bg-zinc-700  p-3 rounded-lg">
                            <p className="text-gray-400">People</p>
                            <p className="font-semibold">
                              {plan.userSelected.people}
                            </p>
                          </div>
                          <div className="bg-zinc-700  p-3 rounded-lg">
                            <p className="text-gray-400">Planning With</p>
                            <p className="font-semibold capitalize">
                              {plan.userSelected.planningWith}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen  text-black flex items-center justify-center">
          <p>Please log in to view your profile</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
