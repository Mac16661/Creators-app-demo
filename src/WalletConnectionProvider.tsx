import React, {ReactNode}  from'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { clusterApiUrl } from '@solana/web3.js';

require('@solana/wallet-adapter-react-ui/styles.css');

interface WalletConnectionProviderProps {
    children: ReactNode;
}

const WalletConnectionProvider: React.FC<WalletConnectionProviderProps> = ({ children }) => {
    // Choose the Solana cluster (devnet, testnet, mainnet)
    const network = clusterApiUrl('devnet');
    const wallets = [new PhantomWalletAdapter()];  // You can add more wallets here

    return (
        <ConnectionProvider endpoint={network}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default WalletConnectionProvider;
