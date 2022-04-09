import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import * as ethers from "ethers";
import { postPayrollToIPFS } from "../util/IPFS";
import "react-toastify/dist/ReactToastify.css";
import Landing from "../components/Landing/Landing";

const Home: NextPage = () => {
  const communityAddress =
    typeof window !== "undefined" &&
    window.sessionStorage.getItem("skillWallet") &&
    JSON.parse(window.sessionStorage.getItem("skillWallet") as string)
      .partnersAgreementKey.communityAddress;
  //isCoreTeamMember -> can edit hires or not

  return (
    <div>
      <Head>
        <title>CompaoDao</title>
        <meta name="description" content="CompaoDao" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Landing />
      </main>
    </div>
  );
};

export default Home;
