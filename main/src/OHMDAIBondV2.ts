// import { Address } from '@graphprotocol/graph-ts'
// import {  DepositCall, RedeemCall} from '../generated/OHMDAIBondV2/OHMDAIBondV2'
// import { Deposit, Redemption, PriceChange, VariableAdjustment } from '../generated/schema'
// import { OlympusERC20 } from '../generated/sOlympusERC20V1/OlympusERC20'
// import { loadOrCreateTransaction } from "./utils/Transactions"
// // import { loadOrCreateOHMie, updateOhmieBalance } from "./utils/OHMie"
// import { toDecimal } from "./utils/Decimals"
// import { loadOrCreateToken } from './utils/Tokens'

// import { createDailyBondRecord } from './utils/DailyBond'
// import { OHMDAILPBOND_TOKEN, OHM_ERC20_CONTRACT, OHMDAISLPBOND_CONTRACT2 } from './utils/Constants'
// import { getPairUSD } from './utils/Price'




// export function handleDeposit(call: DepositCall): void {
// //   let ohmie = loadOrCreateOHMie(call.transaction.from)
//   let transaction = loadOrCreateTransaction(call.transaction, call.block)
//   let token = loadOrCreateToken(OHMDAILPBOND_TOKEN)

//   let amount = toDecimal(call.inputs.amount_, 18)
//   let deposit = new Deposit(transaction.id)
//   deposit.transaction = transaction.id
// //   deposit.ohmie = ohmie.id
//   deposit.amount = amount
//   deposit.value = (call.inputs.amount_)
//   deposit.maxPremium = new BigDecimal(new BigInt(0))
//   deposit.token = token.id;
//   deposit.timestamp = transaction.timestamp;
//   deposit.save()

//   createDailyBondRecord(deposit.timestamp, token, deposit.amount, deposit.value)
// //   updateOhmieBalance(ohmie, transaction)
// }

// export function handleRedeem(call: RedeemCall): void {
// //   let ohmie = loadOrCreateOHMie(call.transaction.from)
//   let transaction = loadOrCreateTransaction(call.transaction, call.block)
  
//   // let redemption = Redemption.load(transaction.id)
//   // if (redemption==null){
//   //   redemption = new Redemption(transaction.id)
//   // }
//   let redemption = new Redemption(transaction.id)
//   redemption.transaction = transaction.id
// //   redemption.ohmie = ohmie.id
//   redemption.token = loadOrCreateToken(OHMDAILPBOND_TOKEN).id;
//   redemption.timestamp = transaction.timestamp;
//   redemption.save()
// //   updateOhmieBalance(ohmie, transaction)
// }