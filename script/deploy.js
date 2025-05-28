const hre = require ("hardhat");

async function main() {
    const Manager = await hre.ethers.getContractFactory("Manager");
    const manager = await Manager.deploy();

    await manager.deployed();

    console.log('Tracking deployed to ${lock.address}')
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})