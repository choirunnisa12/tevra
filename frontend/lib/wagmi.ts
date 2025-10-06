import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia, localhost, mainnet } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Tevra Bot',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'tevra-bot-project',
  chains: [localhost, sepolia, mainnet],
  ssr: true,
});
