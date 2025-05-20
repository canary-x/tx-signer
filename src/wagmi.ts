// import { getWagmiConnectorV2 } from "@binance/w3w-wagmi-connector-v2";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import {
    mainnet,

    AppKitNetwork,
} from "@reown/appkit/networks";
import { cookieStorage, createStorage } from "wagmi";
import { injected } from "wagmi/connectors";


const metadata = {
    name: "Canary Disputes",
    description: "Canary Disputes",
    url: "https://web3modal.com",
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet] as AppKitNetwork[];



// const binanceConnector = getWagmiConnectorV2();
const projectId = "d137583ba53f4bab33ab178f40520a3d";
const wagmiAdapter = new WagmiAdapter({
    networks: chains,
    projectId: projectId,
    ssr: true,
    storage: createStorage({
        storage: cookieStorage,
    }),
    connectors: [injected() /*binanceConnector()*/],
    transports: {
    },
});

export { wagmiAdapter, chains, metadata, projectId };
