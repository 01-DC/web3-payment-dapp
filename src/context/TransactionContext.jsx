import React, { useEffect, useState, createContext } from "react"
import { ethers } from "ethers"

import { contractABI, contractAddress } from "../utils/constants"

export const TransactionContext = createContext()

const { ethereum } = window

const getEthereumContract = () => {
	const provider = new ethers.providers.Web3Provider(ethereum)
	const signer = provider.getSigner()
	const transactionContract = new ethers.Contract(
		contractAddress,
		contractABI,
		signer
	)

	return transactionContract
}

export const TransactionProvider = ({ children }) => {
	const [currentAccount, setCurrentAccount] = useState()
	const [isLoading, setisLoading] = useState(false)
	const [transactionCount, setTransactionCount] = useState(
		localStorage.getItem("transactionCount")
	)
	const [formData, setFormData] = useState({
		addressTo: "",
		amount: "",
		keyword: "",
		message: "",
	})

	const handleChange = (e, name) => {
		setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))
	}

	const checkIfWalletIsConnected = async () => {
		try {
			if (!ethereum) return alert("Please install Metamask.")

			const accounts = await ethereum.request({ method: "eth_accounts" })
			if (accounts.length) {
				setCurrentAccount(accounts[0])
				//getAllTransactions()
			} else {
				console.log("No accounts found.")
			}
			// console.log(accounts)
		} catch (error) {
			console.error(error)
			throw new Error("No ethereum object.")
		}
	}

	const connectWallet = async () => {
		try {
			if (!ethereum) return alert("Please install Metamask.")

			const accounts = await ethereum.request({
				method: "eth_requestAccounts",
			})
			setCurrentAccount(accounts[0])
			console.log(accounts)
		} catch (error) {
			console.error(error)
			throw new Error("No ethereum object.")
		}
	}

	const sendTransactions = async () => {
		try {
			if (!ethereum) return alert("Please install Metamask.")
			//get data from form
			const { addressTo, amount, keyword, message } = formData
			const transactionContract = getEthereumContract()
			const parsedAmount = ethers.utils.parseEther(amount)

			await ethereum.request({
				method: "eth_sendTransaction",
				params: [
					{
						from: currentAccount,
						to: addressTo,
						gas: "0x5208", //21000 GWEI
						value: parsedAmount._hex, // 0
					},
				],
			})

			const transactionHash = await transactionContract.addToBlockchain(
				addressTo,
				parsedAmount,
				message,
				keyword
			)
			setisLoading(true)
			console.log(`Loading - ${transactionHash.hash}`)
			await transactionHash.wait()
			setisLoading(false)
			console.log(`Success - ${transactionHash.hash}`)

			const transactionCount =
				await transactionContract.getTransactionCount()

			setTransactionCount(transactionCount.toNumber())
			
		} catch (error) {
			console.log(error)
			throw new Error("No ethereum object.")
		}
	}
	useEffect(() => {
		checkIfWalletIsConnected()
	}, [])

	return (
		<TransactionContext.Provider
			value={{
				connectWallet,
				currentAccount,
				formData,
				setFormData,
				handleChange,
				sendTransactions,
			}}>
			{children}
		</TransactionContext.Provider>
	)
}
