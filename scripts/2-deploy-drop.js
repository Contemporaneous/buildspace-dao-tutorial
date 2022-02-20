import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

import dotenv from "dotenv";
dotenv.config();

const app = sdk.getAppModule("0xa957CAe76ebd1f8d6A04D6517EEBFb9ABCfd25CF");

(async () => {
  try {
    const bundleDropModule = await app.deployBundleDropModule({
      name: "DopeGoat Membership",
      description: "A DAO for Dope Goats.",
      image: readFileSync("scripts/assets/dopeGoat.png"),
      // We need to pass in the address of the person who will be receiving the proceeds from sales of nfts in the module.
      // We're planning on not charging people for the drop, so we'll pass in the 0x0 address
      // you can set this to your own wallet address if you want to charge for the drop.
      primarySaleRecipientAddress: process.env.WALLET_ADDRESS,
    });
    
    console.log(
      "✅ Successfully deployed bundleDrop module, address:",
      bundleDropModule.address,
    );
    console.log(
      "✅ bundleDrop metadata:",
      await bundleDropModule.getMetadata(),
    );
  } catch (error) {
    console.log("failed to deploy bundleDrop module", error);
  }
})()