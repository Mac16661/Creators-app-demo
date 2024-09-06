import React, { useEffect } from "react";
import axios from "axios";

// Define the type for the token prop
interface Token {
  api_key: string;
  token: string;
}

// Define props for the component
interface AdStatsProps {
  token: Token;
}

const URL = "http://127.0.0.1:80";

const AdStats: React.FC<AdStatsProps> = ({ token }) => {
  useEffect(() => {
    console.log(token);

    const fetchStats = async () => {
      if (token.token) {
        try {
          const response = await axios.get(`${URL}/stats/getStats`, {
            headers: {
              Authorization: token.token,
            },
            params: {
              user_type: "app_creator",
            },
          });

          console.log(response);
        } catch (e) {
          console.log("err ocurred during axios req", e);
        }
      }
    };

    if(token.token) fetchStats();

    return () => {};
  }, [token]);

  return <div>AdStats</div>;
};

export default AdStats;
