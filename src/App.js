import { useEffect, useMemo, useState } from "react";
import { ThirdwebSDK } from "@3rdweb/sdk";

// import thirdweb
import { useWeb3 } from "@3rdweb/hooks";

//Initiate sdk on rinkeby
const sdk = new ThirdwebSDK("rinkeby");

const bundleDropModule = sdk.getBundleDropModule(
    "0xcc9CD9379239903D3E63bF7734bF7a6b45cd636E",
);

const App = () => {
    const { connectWallet, address, error, provider } = useWeb3();
    console.log("👋 Address:", address);

    //Check if the sdigner is available
    const signer = provider ? provider.getSigner() : undefined;

    // State variables
    const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
    const [isClaiming, setIsClaiming] = useState(false);


    //useEffects
    useEffect(() => {
        sdk.setProviderOrSigner(signer);
      }, [signer]);

    useEffect(async () => {
        // If they don't have an connected wallet, exit!
        if (!address) {
          return;
        }
    
        // Check if the user has the NFT by using bundleDropModule.balanceOf
        const balance = await bundleDropModule.balanceOf(address, "0");
       
        try {
          // If balance is greater than 0, they have our NFT!
          if(balance.gt(0)) {
              setHasClaimedNFT(true);
              console.log("🌟 this user has a membership NFT!");
          } else {
              setHasClaimedNFT(false);
              console.log("😭 this user doesn't have a membership NFT.")
          }
        } catch (error) {
            setHasClaimedNFT(false);
            console.error("failed to nft balance", error);
        }
      }, [address]);
    
    if (!address) {
        return (
        <div className="landing">
            <h1>Welcome to the Dope Goat DAO</h1>
            <button onClick={() => connectWallet("injected")} className="btn-hero">
                Connect your wallet
            </button>
        </div>
        );
    }

    if (hasClaimedNFT) {
      return (
        <div className="member-page">
          <h1>Dope Goat DAO Member Page</h1>
          <p>Congratulations on being a member</p>
        </div>
      );
    };

    const mintNft = async () => {
        setIsClaiming(true);
        try {
          // Call bundleDropModule.claim("0", 1) to mint nft to user's wallet.
          await bundleDropModule.claim("0",1);
          // Set claim state.
          setHasClaimedNFT(true);
          // Show user their fancy new NFT!
          console.log(`🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${bundleDropModule.address}/0`);
        } catch (error) {
          console.error("failed to claim", error);
        } finally {
          // Stop loading state.
          setIsClaiming(false);
        }
    };
    

    return (
        <div className="mint-nft">
          <h1>Mint your free Dope Goat DAO Membership NFT</h1>
          <button
            disabled={isClaiming}
            onClick={() => mintNft()}
          >
            {isClaiming ? "Minting..." : "Mint your nft (FREE)"}
          </button>
        </div>
      );
    };
    
  export default App;
  