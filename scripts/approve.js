const hre = require("hardhat");
const fxRootContractABI = require("../fxRootContract.json");
const contractJSON = require("../artifacts/contracts/DamToken.sol/DamToken.json");

const contractAddress = "0x6e73e8D0625D563E0c43a41d65FA8B79AE284d36";
const contractABI = contractJSON.abi;
const fxERC721ContractAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de";
const walletAddress = "0x9434E0a9878a1bE87918762a846dBEa7B333B5DE";

async function main() {
  const contract = await hre.ethers.getContractAt(contractABI, contractAddress);
  const fxContract = await hre.ethers.getContractAt(
    fxRootContractABI,
    fxERC721ContractAddress
  );
  const totalNFTs = await contract.totalSupply();
  for (let i = 0; i < totalNFTs; i++) {
    const approveTx = await contract.approve(fxERC721ContractAddress, i);
    await approveTx.wait();
    console.log(`NFT with tokenId ${i} approved`);
  }
  console.log("NFTs approved");

  for (let i = 0; i < totalNFTs; i++) {
    const depositTx = await fxContract.deposit(
      contractAddress,
      walletAddress,
      i,
      "0x6556"
    );
    await depositTx.wait();
    console.log(`NFT with TokenId ${i} deposited`);
  }

  console.log("NFTs deposited");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
