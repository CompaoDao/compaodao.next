import axios from "axios";
import * as ethers from "ethers";
import { createContext } from "react";
import community from "../abis/Community.json";
import skillwalletid from "../abis/SkillWalletID.json";

// Connect to the network
const SKILLWALLET_ADDRESS = "0xfb19708dEc0c84b739F98D9AAAE719D236Af3B32";
const provider = new ethers.providers.AlchemyProvider(
  "maticmum",
  "TLPI2cNQ21vuiwGs2X1HaUJxt-ZwnOFx"
);

export async function getWalletAddress() {
  const provider = new ethers.providers.Web3Provider(
    window.ethereum,
    "any"
  );
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  return await signer.getAddress();
}

export async function getAllMemberAddresses(communityAddress: string) {
  const contract = new ethers.Contract(communityAddress, community.abi, provider);

  const allMembers = await contract.getMemberAddresses();
  return allMembers as string[];
}

export async function getTokenIdByAddress(address: string) {
  const contract = new ethers.Contract(
    SKILLWALLET_ADDRESS,
    skillwalletid.abi,
    provider
  );
  const tokenId = await contract.getSkillWalletIdByOwner(address);
  return tokenId;
}
export async function getUserByTokenId(tokenId: string) {
  let contract = new ethers.Contract(
    SKILLWALLET_ADDRESS,
    skillwalletid.abi,
    provider
  );

  const ipfsId = await contract.tokenURI(tokenId);
  const url = `https://ipfs.io/ipfs/${ipfsId}/metadata.json`
  const response = await axios.get(url);
  return response.data;
}
export interface user {
  partnersAgreementKey: { communityAddress: string };
}
// export const CurrentUserContext = createContext(undefined as undefined | user);
export async function getMembersData(memberAddresses: string[]) {
  const payroll = await Promise.all(
    memberAddresses.map(async (address) => {
      const tokenId = await getTokenIdByAddress(address);
      const user = await getUserByTokenId(tokenId);
      return {
        id: address,
        position: user.properties.roles[0].name,
        name: user.name,
      };
    })
  );
  return payroll;
}
