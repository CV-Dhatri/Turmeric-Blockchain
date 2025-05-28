import React, { useState, useEffect, Children } from "react";
import Web3modal from "web3modal";
import { ethers } from "ethers";

//Internal import
import tracking from "../Manager.json"
import { get } from "https";
const ContractAddress = "";
const ContractABI = manager.abi;

//Fetch the smart contract
const fetchContract = (signerOrProvider) =>
    new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);

export const ManagerContext = React.createContext();

export const ManagerProvider = ({ children }) => {
    const TurmericApp = "Turmeric Product Dapp";
    const [currentUser, setCurrentUser] = useState("");

    const createProd = async (intems) => {
        console.Consolelog(items);
        const { itemId, receiver, test, quantity } = items;

        try {
            const web3Modal = new Web3modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const createItem = await contract.produceProd(
                itemId,
                receiver,
                test,
                quantity
            );
            await createItem.wait(); 
            console.log(createItem);
        } catch (error) {
            console.log("Wrong item error", error);
        }
    };

    const getAllProd = async () => {
        try {
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);

            const prods = await contract.getAllTransactions();
            const allProds = prods.map((prod) => ({
                itemId: shipment.itemId,
                sender: shipment.sender,
                receiver: shipment.receiver,
                test: shipment.test,
                quantity: shipment.quantity,
                status: shipment.status,
                isTested: shipment.isTested,
                isDelivered: shipment.isDelivered
            }));_
            return allProds;
        } catch (error) {
            console.log("Error, returning product");
        }
    };

    const getProdsCount = async () => {
        try {
            if(!window.ethereum) return "Tnstall MetaMask";

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const prodsCount = await contract.getProdCount(accounts[0]);
            return prodsCount.toNumber();
        } catch (error) {
            console.log("Error, returning product");
        }
    };

    const completeProd = async (completeP) => {
        console.log(completeP);

        const { receiver, index } = completeP;
        try {
            if(!window.ethereum) return "Tnstall MetaMask";

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const transaction = await contract.completeProd(
                itemId,
                accounts[0],
                receiver,
                index,
                {
                    gasLimit: 300000,
                }
            );

            transaction.wait();
            console.log(transaction);
        } catch (error) {
            console.log("Wrong complete product", error);
        }
    };

    const getProd = async (index) => {
        console.log(index *1);
        try {
            if(!window.ethereum) return "Tnstall MetaMask";

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const prod = await contract.getProd(account[0], index *1);

            const SingleProd = {
                itemId: shipment[0],
                sender: shipment[1],
                receiver: shipment[2],
                test: shipment[3],
                quantity: shipment[4],
                status: shipment[5],
                isTested: shipment[6],
                isDelivered: shipment[7]
            };
            
            return SingleProd;
        } catch (error) {
            console.log("No such product.");
        }
    };

    const startProd = async (getProduct) => {
        const { receiver, index } = getProduct;

        try {
            if(!window.ethereum) return "Tnstall MetaMask";

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const prod = await contract.startProd(
                itemId,
                account[0],
                receiver, 
                quantity,
                index *1,
            );
            prod.wait();
            console.log(shipment);
        } catch (error) {
            console.log("No such product", error)
        }
    };

    const checkWallet = async () => {
        try {
            if (!window.ethereum) return "Tnstall MetaMask";

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            if (accounts.length) {
                setCurrentUser(accounts[0]);
            } else {
                return "No account found."
            }
        } catch (error) {
            return "Account not connected."
        }
    };

    const connectWallet =async () => {
        try {
            if(!window.ethereum) return "Tnstall MetaMask";

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            setCurrentUser(accounts[0]);
        } catch (error) {
            return "Wallet not connected."
        }
    };

    useEffect(() => {
        checkWallet();
    }, []);

    return (
        <ManagerContext.Provider
        value={{
            connectWallet,
            createProd,
            getAllProd,
            completeProd,
            getProd,
            startProd,
            getProdsCount,
            TurmericApp,
            currentUser,
        }}
        >
        {children}    
        </ManagerContext.Provider>
    );
};