import React, { useContext, useEffect, useState } from 'react';
import { InitSwAuth } from "@skill-wallet/auth";
import LogoIcon from '../../assets/icons/LogoIcon';
import { AuthContext } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    InitSwAuth();
  }, []);

  useEffect(() => {
    typeof window !== undefined &&
      setCurrentUser(
        window.sessionStorage.getItem("skillWallet") &&
          JSON.parse(window.sessionStorage.getItem("skillWallet") as string)
      );
  }, [typeof window !== undefined]);

  useEffect(() => {
    function handleStorage(e: Event) {
      const user = window.sessionStorage.getItem("skillWallet") && JSON.parse(window.sessionStorage.getItem("skillWallet") as string);
      debugger;
      // When local storage changes, dump the list to
      // the console.
      setCurrentUser(user);
      if(!!user) {
        router.push({pathname:'/dashboard'});
      } else {
        router.push({pathname:'/'});
      }
      // router.push({pathname:'/dashboard'});
      return null;
    }

    console.log("hufen", typeof window !== "undefined");

    typeof window !== "undefined" &&
      window.addEventListener("onSkillwalletLogin", handleStorage);
  });

  const handleLogoClick = () => {
    if(currentUser) {
      router.push("/dashboard");
    } else {
      router.push("/")
    }
  }


  return (
    <div className="landing-header">
        <div className="landing-header-logo" onClick={() => handleLogoClick()}>
          <LogoIcon />
        </div>
        <div className="landing-header-wallet">
          {/* <Button>Connect Wallet</Button> */}
          {/*@ts-ignore*/}
          <sw-auth
            partner-key="75122500c30d00dd83c1a2c306d3e6e298ba70b7"
            use-dev="true"
          >
            {/*@ts-ignore*/}
          </sw-auth>
          
        </div>
      </div>
  )
}

export default Header;