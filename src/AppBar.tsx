import axios from "axios";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import AdStats from "./AdStats";

const URL = "http://127.0.0.1:80";

function AppBar() {
  const[authToken, setAuthToken] = useState({
    api_key: "",
    token: ""
  });

  const { publicKey, signMessage } = useWallet();

  async function signAndSend() {
    if (!publicKey) return;

    const message = new TextEncoder().encode(
      "Get registered with ads-platform"
    );
    const signature = await signMessage?.(message);
    console.log(signature);
    console.log(publicKey);

    try {
      const response = await axios.post(`${URL}/user/registerAppCreator`, {
        signature,
        wallet_address: publicKey?.toString(),
        name: "Subhodip Ghosh", // Dummy name
        app_category: "FPS Game", // Dummy category
      });

    //   console.table(response);
      setAuthToken({
        api_key: response.data.api_key,
        token: response.data.token,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.api_key);
      
    } catch (e) {
      console.log("Axios Err -> ", e);
      alert("Signin unsuccessful")
    }
  }

  useEffect(() => {
    try {
      signAndSend();
    } catch (e) {
      console.log("err while sign and send", e);
    }
  }, [publicKey]);

  return (
    <div className="">
      <div className="">Ads-platform Application creator</div>
      <div className="">
        {publicKey ? <WalletDisconnectButton /> : <WalletMultiButton />}
      </div>
      <div>
        <h1>Copy your api key: {authToken.api_key !== "" ? authToken.api_key : ""}</h1>
      </div>
      <div>
        <AdStats token={authToken}/>
      </div>
    </div>
  );
}

export default AppBar;
