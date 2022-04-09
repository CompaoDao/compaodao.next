import axios from "axios";
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
  return allMembers as string[];
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
    skillwalletid.abi,
    provider
  );
  const tokenId = await contract.getSkillWalletIdByOwner(address);
  console.log(tokenId);
  return tokenId;
}
export async function getUserByTokenId(tokenId: string) {
  const url = `https://api.skillwallet.id/api/skillwallet?tokenId=${tokenId}`;
  const resp = await axios.get(url);
  return resp.data;
}
export interface user {
  partnersAgreementKey: { communityAddress: string };
}
export const CurrentUserContext = createContext(undefined as undefined | user);
export async function getMembersData(memberAddresses: string[]) {
  const payroll = await Promise.all(
    memberAddresses.map(async (address) => {
      const tokenId = await getTokenIdByAddress(address);
      const user = await getUserByTokenId(tokenId);

      return {
        id: address,
        position: user.skills[0].name,
        name: user.nickname,
      };
    })
  );
  console.log(payroll);
  return payroll;
}

// export const CurrentUserContext = createContext(
//   undefined as
//     | undefined
//     | { partnersAgreementKey: { communityAddress: string } }
// );
