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

}

run();
