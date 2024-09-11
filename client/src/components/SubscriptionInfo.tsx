import React, { useEffect, useState } from "react";
import axios from "axios";

interface SubscriptionInfoProps {
  userId?: string;
}

const SubscriptionInfo: React.FC<SubscriptionInfoProps> = ({ userId }) => {
  const [subscriptionInfo, setSubscriptionInfo] = useState<any>(null);

  useEffect(() => {
    const fetchSubscriptionInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/subscription/status/${userId}`
        );
        setSubscriptionInfo(response.data);
      } catch (error) {
        console.error("Error fetching subscription info:", error);
      }
    };

    fetchSubscriptionInfo();
  }, [userId]);

  if (!subscriptionInfo) {
    return <div>Loading subscription information...</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Subscription Information</h2>
      <p>
        Status: {subscriptionInfo.subscriptionActive ? "Active" : "Inactive"}
      </p>
      <p>Type: {subscriptionInfo.subscriptionType}</p>
      <p>Remaining Time: {subscriptionInfo.remainingTime} minutes</p>
      <p>End Date: {new Date(subscriptionInfo.endDate).toLocaleDateString()}</p>
    </div>
  );
};

export default SubscriptionInfo;
