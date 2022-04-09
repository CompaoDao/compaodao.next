import "../styles/index.scss";
import { AppProps } from "next/app";
import { InitSwAuth } from "@skill-wallet/auth";
import { useEffect, useState } from "react";
import Button from "../components/Button/Button";
//Skill wallet community id: f407f2a2b646a7940f159ce27c2c9427c97dc853
function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof document !== undefined) {
      const div = document.createElement("div");
      div.innerText = "Login";
      InitSwAuth({
        container: div,
      });
    }
  });
  /*const [communityAddress, setCommunityAddress] = useState(
    typeof window !== "undefined" &&
      window.sessionStorage.getItem("skillWallet") &&
      JSON.parse(window.sessionStorage.getItem("skillWallet") as string)
        .partnersAgreementKey.communityAddress
  );*/
  return <Component {...pageProps} />;
}
export default MyApp;
