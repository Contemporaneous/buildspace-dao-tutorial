import sdk from "./1-initialize-sdk.js";

const appModule = sdk.getAppModule(
  "0xa957CAe76ebd1f8d6A04D6517EEBFb9ABCfd25CF",
);

(async () => {
  try {
    const voteModule = await appModule.deployVoteModule({
      name: "Dope Goat DAO's Epic Proposals",
      votingTokenAddress: "0x5670fBa87751DE88e6c852aEb6e9d2262F9BCCfC",

      // Wait time to vote after joining
      proposalStartWaitTimeInSeconds: 1,

      // How long do members have to vote on a proposal when it's created?
      // Here, we set it to 24 hours (86400 seconds)
      proposalVotingTimeInSeconds: 1 * 60 * 60,

      // Will explain more below.
      votingQuorumFraction: 1,

      // What's the minimum # of tokens a user needs to be allowed to create a proposal?
      // I set it to 0. Meaning no tokens are required for a user to be allowed to
      // create a proposal.
      minimumNumberOfTokensNeededToPropose: "1",
    });

    console.log(
      "✅ Successfully deployed vote module, address:",
      voteModule.address,
    );
  } catch (err) {
    console.error("Failed to deploy vote module", err);
  }
})();