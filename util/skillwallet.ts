import * as ethers from "ethers";
import { createContext } from "react";
import community from "../abis/Community.json";
import skillwalletid from "../abis/SkillWalletID.json";
export async function getAllMemberAddresses(communityAddress: string) {
  // Connect to the network
  let provider = new ethers.providers.AlchemyProvider(
    "maticmum",
    "TLPI2cNQ21vuiwGs2X1HaUJxt-ZwnOFx"
  );
  let contract = new ethers.Contract(communityAddress, community.abi, provider);
  console.log("mmd", contract);
  console.log("idn", await provider.getNetwork());
  const allMembers = await contract.getMemberAddresses();
  console.log(allMembers);
  return allMembers;
}
export async function getTokenIdByAddress(address: string) {
  const SkillWalletContractAddress =
    "0xfb19708dEc0c84b739F98D9AAAE719D236Af3B32";
  // Connect to the network
  let provider = new ethers.providers.AlchemyProvider(
    "maticmum",
    "TLPI2cNQ21vuiwGs2X1HaUJxt-ZwnOFx"
  );
  let contract = new ethers.Contract(
    SkillWalletContractAddress,
    Skil.abi,
    provider
  );
  console.log("mmd", contract);
  console.log("idn", await provider.getNetwork());
  const allMembers = await contract.getMemberAddresses();
  console.log(allMembers);
  return allMembers;
}
export const CurrentUserContext = createContext(
  undefined as
    | undefined
    | { partnersAgreementKey: { communityAddress: string } }
);
