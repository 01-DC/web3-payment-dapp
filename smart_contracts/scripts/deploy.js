const hre = require("hardhat")

const main = async () => {
	// const currentTimestampInSeconds = Math.round(Date.now() / 1000)
	// const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60
	// const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS

	// const lockedAmount = hre.ethers.utils.parseEther("1")

	const Transactions = await hre.ethers.getContractFactory("Transactions")
	// const transaction = await Transactions.deploy(unlockTime, { value: lockedAmount })
	const transaction = await Transactions.deploy()

	await transaction.deployed()

	console.log("Transactions deployed to: ", transaction.address)
}

const runMain = async () => {
	try {
		await main()
		process.exit(0)
	} catch (error) {
		console.error(error)
		process.exit(1)
	}
}

runMain()

// main().catch((error) => {
// 	console.error(error)
// 	process.exitCode = 1
// })
