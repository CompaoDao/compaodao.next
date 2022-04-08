import "../styles/globals.css";
import { AppProps } from "next/app";
import { InitSwAuth } from "@skill-wallet/auth";
import { useEffect } from "react";
//Skill wallet community id: f407f2a2b646a7940f159ce27c2c9427c97dc853
function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    InitSwAuth();
  }, []);
  return (
    <>
      {/*@ts-ignore*/}
      <sw-auth
        partner-key="f407f2a2b646a7940f159ce27c2c9427c97dc853"
        use-dev="true"
      >
        {/*@ts-ignore*/}
      </sw-auth>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
