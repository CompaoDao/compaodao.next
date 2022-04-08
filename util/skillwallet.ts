import * as ethers from "ethers";
import community from "../abis/Community.json";
export async function getAllMembers(communityAddress: string) {
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
