const hre = require("hardhat");
const contractJSON = require("../artifacts/contracts/DamToken.sol/DamToken.json");

const contractAddress = "0x6e73e8D0625D563E0c43a41d65FA8B79AE284d36";
const contractABI = contractJSON.abi;
const walletAddress = "0x9434E0a9878a1bE87918762a846dBEa7B333B5DE";
let noOfNFTs = 5;
async function main() {
  const contract = await hre.ethers.getContractAt(contractABI, contractAddress);

  const tx = await contract.mint(walletAddress, noOfNFTs);
  await tx.wait();

  console.log(
    walletAddress +
      " now has: " +
      (await contract.balanceOf(walletAddress)) +
      " NFTs"
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
