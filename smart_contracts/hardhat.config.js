// https://eth-goerli.g.alchemy.com/v2/tKOeCTAxZrE-Af2Gf_FYZbj9V8ZBiuZU

require("@nomiclabs/hardhat-waffle")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: "0.8.0",
	networks: {
		goerli: {
			url: "https://eth-goerli.g.alchemy.com/v2/tKOeCTAxZrE-Af2Gf_FYZbj9V8ZBiuZU",
			accounts: [
				"0b86e6f9fd54b5304aede1cca35b4def77dd27ee1b4616f8133d3fdf320f30c7",
			],
		},
	},
}
