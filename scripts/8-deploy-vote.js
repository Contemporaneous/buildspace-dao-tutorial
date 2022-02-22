import sdk from "./1-initialize-sdk.js";

const appModule = sdk.getAppModule(
  "0xcc9CD9379239903D3E63bF7734bF7a6b45cd636E",
);

(async () => {
  try {
    const voteModule = await appModule.deployVoteModule({
      name: "Dope Goat DAO's Epic Proposals",

      votingTokenAddress: "0x5670fBa87751DE88e6c852aEb6e9d2262F9BCCfC",

      // Wait time to vote after joining
      proposalStartWaitTimeInSeconds: 0,

      // How long do members have to vote on a proposal when it's created?
      // Here, we set it to 24 hours (86400 seconds)
      proposalVotingTimeInSeconds: 24 * 60 * 60,

      // Will explain more below.
      votingQuorumFraction: 0,

      // What's the minimum # of tokens a user needs to be allowed to create a proposal?
      // I set it to 0. Meaning no tokens are required for a user to be allowed to
      // create a proposal.
      minimumNumberOfTokensNeededToPropose: "0",
    });

    console.log(
      "✅ Successfully deployed vote module, address:",
      voteModule.address,
    );
  } catch (err) {
    console.error("Failed to deploy vote module", err);
  }
})();