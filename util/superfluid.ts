import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
import Operation from "@superfluid-finance/sdk-core/dist/main/Operation";

export const createFlow = async (recipient: string, superToken: string, flowRate: string) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const sf = await Framework.create({
        chainId: 80001,
        provider: provider
    });

    try {
        const createFlowOperation = sf.cfaV1.createFlow({
            flowRate: flowRate,
            receiver: recipient,
            superToken: superToken
        });

        console.log("Creating...");
        const result = await createFlowOperation.exec(provider.getSigner());
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

export const updateFlow = async (recipient: string, superToken: string, newFlowRate: string) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const sf = await Framework.create({
        chainId: 80001,
        provider: provider
    });

    try {
        let operation: Operation
        if (Number(newFlowRate) === 0) {
            operation = sf.cfaV1.deleteFlow({
                superToken: superToken,
                sender: await provider.getSigner().getAddress(),
                receiver: recipient
            });
        } else {
            operation = sf.cfaV1.updateFlow({
                flowRate: newFlowRate,
                receiver: recipient,
                superToken: superToken
            });
        }

        console.log("Updating...");
        const result = await operation.exec(provider.getSigner());
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

export const getFlowRate = async (recipient: string, superToken: string) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const sf = await Framework.create({
        chainId: 80001,
        provider: provider
    });

    try {
        const flow = await sf.cfaV1.getFlow({
            superToken: superToken,
            sender: await provider.getSigner().getAddress(),
            receiver: recipient,
            providerOrSigner: provider
        });

        return flow.flowRate;
    } catch (error) {
        console.error(error);
    }
}