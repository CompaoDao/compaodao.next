import React, { useEffect } from 'react';
import LogoIcon from '../../assets/icons/LogoIcon';
import Button from '../Button/Button';
import { InitSwAuth } from "@skill-wallet/auth";
//Skill wallet community id: f407f2a2b646a7940f159ce27c2c9427c97dc853

const Landing = () => {
  useEffect(() => {
    InitSwAuth();
  }, []);

  return (
    <div className="landing-container">
      <div className="landing-header">
        <div className="landing-header-logo">
          <LogoIcon />
        </div>
        <div className="landing-header-wallet">
          {/* <Button>Connect Wallet</Button> */}
          {/*@ts-ignore*/}
          <sw-auth
            partner-key="f407f2a2b646a7940f159ce27c2c9427c97dc853"
            use-dev="true"
          >
            {/*@ts-ignore*/}
          </sw-auth>
          
        </div>
      </div>
      <div className="landing-jumbotron">
        <div className="landing-jumbotron-container">
          <div className="landing-jumbotron-main">
            Crypto Invoice Generator For Digital Assets
          </div>
          <div className="landing-jumbotron-description">
            Automate your business cashflow with crypto invoices, salaries, and expenses
          </div>
          <div className="landing-jumbotron-buttons">
            <div className="landing-jumbotron-buttons-wallet">
              <Button>Connect Wallet</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="landing-how">
        How does it work?
      </div>
      <div className="landing-point">
        <div className="landing-point-number">
          First
        </div>
        <div className="landing-point-description">
          {`Add a payroll with recipient's wallet address`}
        </div>
        <div>
          <img className="landing-point-image" src="/point-one.png" />
        </div>

        <div className="landing-point-number">
          Second
        </div>
        <div className="landing-point-description">
          {`Automatically generate invoices of payments`}
        </div>
        <div>
          <img className="landing-point-image" src="/point-three.png" />
        </div>

        <div className="landing-point-number">
          Third
        </div>
        <div className="landing-point-description">
          {`View a high level dashboard for employee payments`}
        </div>
        <div>
          <img className="landing-point-image" src="/point-two.png" />
        </div>
      </div>
      
      <div className="landing-bottom">
        <div className="landing-bottom-title">
          Get Started Today
        </div>
      </div>

      <div className="landing-footer">
        <div className="landing-footer-left">
          Ⓒ CompaoDao
        </div>
        <div className="landing-footer-right">
          2022 All Rights Reserved
        </div>
      </div>
    </div>
  )
};

export default Landing;