import {
    PublicKey, Keypair, Connection, Transaction, ComputeBudgetProgram,
    sendAndConfirmTransaction, VersionedTransaction, TransactionMessage,
    TransactionInstruction, SystemProgram,
    LAMPORTS_PER_SOL,
    sendAndConfirmRawTransaction,
} from "@solana/web3.js";
import {
    NATIVE_MINT, TOKEN_PROGRAM_ID, createTransferCheckedInstruction,
    createAssociatedTokenAccountIdempotentInstruction,
    createCloseAccountInstruction, getAssociatedTokenAddress, getMint, getMinimumBalanceForRentExemptAccount,
    createSyncNativeInstruction,
    createAssociatedTokenAccountInstruction
} from "@solana/spl-token";
import { jitoWithAxios } from "./src/jitoWithAxios";
import base58 from "bs58";
import { retrieveEnvVariable, saveDataToFile, sleep, readJson } from "./src/utils";
import { bundle } from "./src/jito";
import { Liquidity, LiquidityPoolKeysV4, MAINNET_PROGRAM_ID, InstructionType, Percent, CurrencyAmount, Token, SOL, LiquidityPoolInfo, TokenAmount } from "@raydium-io/raydium-sdk";
import { derivePoolKeys } from "./src/poolAll";
import fs from 'fs'
import path from 'path'
import { lookupTableProvider } from "./src/lut";
import { BN } from "bn.js";

// Environment Variables3
const baseMintStr = retrieveEnvVariable('BASE_MINT');
const mainKpStr = retrieveEnvVariable('MAIN_KP');
// const sellerKpStr = retrieveEnvVariable('SELLER_KP');
// const buyerKpStr = retrieveEnvVariable('BUYER_KP');
const rpcUrl = retrieveEnvVariable("RPC_URL");
let interval = Number(retrieveEnvVariable('INTERVAL'));
const makerNum = Number(retrieveEnvVariable('WALLET_NUM'));
const poolId = retrieveEnvVariable('POOL_ID');
const mode = retrieveEnvVariable('MODE');

// Solana Connection and Keypair
const connection = new Connection(rpcUrl, { commitment: "confirmed" });
// const sellerKp = Keypair.fromSecretKey(base58.decode(sellerKpStr));
// const buyerKp = Keypair.fromSecretKey(base58.decode(buyerKpStr));
const mainKp = Keypair.fromSecretKey(base58.decode(mainKpStr));
const baseMint = new PublicKey(baseMintStr);

let poolKeys: LiquidityPoolKeysV4 | null = null;
let tokenAccountRent: number | null = null;
let decimal: number | null = null;
let poolInfo: LiquidityPoolInfo | null = null;

let maker = 0
let now = Date.now()
let unconfirmedKps: Keypair[] = []



const run = async () => {
    console.log("============================ Bot start ===============================");

    for (let i = 0; i < 21; i++) {

        const Sellerdata = readJson("data1.json")
        const sellerKpStr = Sellerdata[i];
        const sellerKp = Keypair.fromSecretKey(base58.decode(sellerKpStr));
        console.log("seller secretkey=========>", sellerKpStr)
        console.log("seller publickey=====>", sellerKp.publicKey);

        const buyerKp = Keypair.generate();
        saveDataToFile([base58.encode(buyerKp.secretKey)], "data2.json")
        console.log("buyer=============>", base58.encode(buyerKp.secretKey));
        console.log("=============== end ===============")
        console.log("============================ Mainkey ===============================");

        console.log("Seller keypair :", mainKp.publicKey.toBase58());
        const mainKpBalance = (await connection.getBalance(mainKp.publicKey)) / LAMPORTS_PER_SOL;
        console.log("Seller keypair balance :", mainKpBalance);
        const mainKpQuoteAta = await getAssociatedTokenAddress(NATIVE_MINT, mainKp.publicKey);
        const mainKpBaseAta = await getAssociatedTokenAddress(baseMint, mainKp.publicKey);

        console.log(mainKpQuoteAta);
        console.log(mainKpBaseAta);


        console.log("============================ seller ===============================");

        console.log("Seller keypair :", sellerKp.publicKey.toBase58());
        const sellerBalance = (await connection.getBalance(sellerKp.publicKey)) / LAMPORTS_PER_SOL;
        console.log("Seller keypair balance :", sellerBalance);
        const sellerQuoteAta = await getAssociatedTokenAddress(NATIVE_MINT, sellerKp.publicKey);
        const sellerBaseAta = await getAssociatedTokenAddress(baseMint, sellerKp.publicKey);

        console.log(sellerQuoteAta);
        console.log(sellerBaseAta);


        console.log("============================ buyer ===============================");

        console.log("Buyer keypair :", buyerKp.publicKey.toBase58());
        const buyerBalance = (await connection.getBalance(buyerKp.publicKey)) / LAMPORTS_PER_SOL;
        console.log("Buyer keypair balance :", buyerBalance);
        const buyerQuoteAta = await getAssociatedTokenAddress(NATIVE_MINT, buyerKp.publicKey);
        const buyerBaseAta = await getAssociatedTokenAddress(baseMint, buyerKp.publicKey);

        console.log(buyerQuoteAta);
        console.log(buyerBaseAta);


        let versionedTxs: VersionedTransaction[] = []
        let solAmount: TokenAmount | CurrencyAmount;
        let solMinAmount: TokenAmount | CurrencyAmount;




        try {
            console.log("============= Seller sell token =================")


        } catch (error) {
            console.log("================ Token sell fail ==============")
            console.log("Error in sell ", error)
        }



        try {
            console.log("============================= Buyer airdrop start ==========================");




        } catch (error) {
            console.log("==================== Aridrop failed =====================")

        }


        try {
            console.log("============= Buyer buy token =================")

        }}

}



run();
