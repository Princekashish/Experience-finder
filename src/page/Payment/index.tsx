import { Check } from "lucide-react";
import { auth } from "../../lib/config/Firebase";
import { useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../lib/config/Firebase";

declare global {
  interface Window {
    Razorpay: any;
  }
}

// Define types for our pricing plan data
type PricingPlan = {
  id: string;
  name: string;
  price: number;
  credits: number;
  description: string;
  featured?: boolean;
  features: string[];
  isPopular: boolean;
};

const PricingPage = () => {
  const currentUser = auth.currentUser;
  const navigate = useNavigate();

  // All data comes from this array
  const pricingPlans: PricingPlan[] = [
    {
      id: "starter",
      name: "Starter",
      price: 100,
      credits: 50,
      description: "Get started with essential features",
      features: [
        "Priority support",
        "Save generations",
        "Commercial usage",
        "Premium templates",
      ],
      isPopular: false,
    },
    {
      id: "pro",
      name: "Pro",
      price: 500,
      credits: 250,
      description: "For growing businesses",
      featured: true,
      features: [
        "Priority support",
        "Save generations",
        "Commercial usage",
        "Premium templates",
        "Early access",
      ],
      isPopular: true,
    },
    {
      id: "premium",
      name: "Premium",
      price: 1000,
      credits: 500,
      description: "For enterprises and power users",
      features: [
        "Unlimited data storage",
        "Customizable dashboards",
        "Advanced data segmentation",
        "Real-time data processing",
        "AI-powered insights and recommendations",
        "Everything in Hobby Plan",
        "Everything in Pro Plan",
      ],
      isPopular: false,
    },
  ];

  // Function to handle Razorpay payment
  const handlePayment = async (plan: PricingPlan) => {
    // Request backend to create Razorpay order
    try {
      const response = await fetch("http://localhost:5000/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: plan.price }), // Send amount in INR
      });

      const orderData = await response.json();

      if (!orderData.id) {
        throw new Error("Payment order creation failed");
      }

      // Initialize Razorpay
      const options = {
        key: import.meta.env.VITE_PUBLIC_RAZORPAY_KEY_ID, // Your Razorpay key ID
        amount: orderData.amount, // Amount in paise
        currency: orderData.currency,
        name: plan.name,
        description: plan.description,
        order_id: orderData.id, // Razorpay Order ID
        handler: function (response: any) {
          // This is the callback function once payment is successful
          alert(
            `Payment successful! Transaction ID: ${response.razorpay_payment_id}`
          );

          // Verify payment with backend
          verifyPayment(
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature,
            plan
          );
        },
        prefill: {
          name: currentUser?.displayName || "", // Logged-in user's name
          email: currentUser?.email || "", // Logged-in user's email
          contact: "", // Optional: Add contact if available
        },
        theme: {
          color: "#F37254", // Customize the theme color
        },
      };

      // Dynamically load the Razorpay script
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open(); // Open the Razorpay payment modal
      };
      document.body.appendChild(script);
    } catch (error) {
      console.error("Error during payment process:", error);
      alert("Payment failed. Please try again.");
    }
  };

  // Function to verify payment
  const verifyPayment = async (
    orderId: string,
    paymentId: string,
    signature: string,
    plan: PricingPlan
  ) => {
    try {
      const response = await fetch("http://localhost:5000/api/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          razorpay_order_id: orderId,
          razorpay_payment_id: paymentId,
          razorpay_signature: signature,
        }),
      });

      const result = await response.json();

      if (result.success) {
        const userId = auth.currentUser?.uid;

        if (userId) {
          // Update credits in the backend
          await fetch("http://localhost:5000/api/update-credits", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId,
              creditsToAdd: plan.credits,
            }),
          });

          // Record payment history
          const paymentHistoryRef = collection(
            db,
            "users",
            userId,
            "paymentHistory"
          );
          await addDoc(paymentHistoryRef, {
            amount: plan.price,
            status: "success",
            plan: plan.name,
            timestamp: serverTimestamp(),
          });

          // Record credit history
          const creditHistoryRef = collection(
            db,
            "users",
            userId,
            "creditHistory"
          );
          await addDoc(creditHistoryRef, {
            amount: plan.credits,
            type: "add",
            reason: `Purchased ${plan.name} plan`,
            timestamp: serverTimestamp(),
          });

          // Update user's credits in Firestore
          const userRef = doc(db, "users", userId);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const currentCredits = userDoc.data()?.credits || 0;
            await setDoc(
              userRef,
              {
                ...userDoc.data(),
                credits: currentCredits,
              },
              { merge: true }
            );
          }

          alert("Payment successful! Credits have been added to your account.");
          navigate("/profile"); // Navigate to profile page after successful payment
        } else {
          alert("User not found.");
        }
      } else {
        const userId = auth.currentUser?.uid;
        // Record failed payment
        if (userId) {
          const paymentHistoryRef = collection(
            db,
            "users",
            userId,
            "paymentHistory"
          );
          await addDoc(paymentHistoryRef, {
            amount: plan.price,
            status: "failed",
            plan: plan.name,
            timestamp: serverTimestamp(),
          });
        }
        alert("Payment verification failed. Please contact support.");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      alert("Error verifying payment. Please try again.");
    }
  };
  return (
    <div className=" min-h-screen flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-5xl font-bold mb-4">Purchase Credits</h1>
        <p className="text-gray-400 text-xl">
          Unlock all features and get unlimited access to all of our future
          updates
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-6xl mt-5">
        {pricingPlans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white/10 rounded-3xl p-8 relative ${
              plan.id === "pro" ? "relative bottom-5" : ""
            }`}
          >
            {plan.featured && (
              <div className="absolute -top-3 right-8 bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-medium">
                Popular
              </div>
            )}
            <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
            <div className="flex items-baseline">
              <span className="text-6xl font-bold">₹{plan.price}</span>
            </div>
            <h1 className="mt-2 text-gray-600 font-semibold">
              Credits: {plan.credits}
            </h1>

            <button
              onClick={() => handlePayment(plan)}
              className={`w-full mt-6 ${
                plan.isPopular
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-gray-800"
              } text-white py-3 rounded-2xl mb-6`}
            >
              Get {plan.name}
            </button>

            <ul className="space-y-3">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 mr-2 mt-0.5 text-gray-400" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
