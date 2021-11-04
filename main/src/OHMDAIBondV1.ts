// import { Address } from '@graphprotocol/graph-ts'
// import {  DepositCall, RedeemCall, BondCreated, BondRedeemed, BondPriceChanged, ControlVariableAdjustment} from '../generated/OHMDAIBondV1/OHMDAIBondV1'
// import { Deposit, Redemption, PriceChange, VariableAdjustment } from '../generated/schema'
// import { OlympusERC20 } from '../generated/sOlympusERC20V1/OlympusERC20'
// import { loadOrCreateTransaction } from "./utils/Transactions"
// // import { loadOrCreateOHMie, updateOhmieBalance } from "./utils/OHMie"
// import { toDecimal } from "./utils/Decimals"
// import { loadOrCreateToken } from './utils/Tokens'

// import { createDailyBondRecord } from './utils/DailyBond'
// import { OHMDAILPBOND_TOKEN, OHM_ERC20_CONTRACT, OHMDAISLPBOND_CONTRACT1 } from './utils/Constants'
// import { getPairUSD } from './utils/Price'


// export function handleBondCreate(event: BondCreated) : void{
//   let transaction = loadOrCreateTransaction(event.transaction, event.block)
//   let token = loadOrCreateToken(OHMDAILPBOND_TOKEN)
//   let amount = toDecimal(event.params.deposit, 18)
//   let payout = toDecimal(event.params.payout, 9)
//   let price = event.params.priceInUSD
//   let deposit = new Deposit(transaction.id)
//   let ohm_contract = OlympusERC20.bind(Address.fromString(OHM_ERC20_CONTRACT))

//   let counter = Deposit.load('3')
//   if(counter == null)
//   {
//       counter = new Deposit('3')
//   }
//   counter.totalDeposited = counter.totalDeposited.plus(amount)
//   counter.save()

//   deposit.ohmReserve = toDecimal(ohm_contract.balanceOf(Address.fromString(OHMDAISLPBOND_CONTRACT1)), 9)
//   deposit.amount = amount
//   deposit.payout = payout
//   deposit.expires = event.params.expires
//   deposit.priceInUSD = toDecimal(price, 18)
//   deposit.token = token.id
//   deposit.timestamp = transaction.timestamp
//   deposit.transaction = transaction.id
//   deposit.totalDeposited = counter.totalDeposited

//   deposit.save()

// }

// export function handleBondRedeem(event: BondRedeemed) : void{
//   let transaction = loadOrCreateTransaction(event.transaction, event.block)
//   let token = loadOrCreateToken(OHMDAILPBOND_TOKEN)
//   let amount = toDecimal(event.params.payout, 9)
//   let remaining = event.params.remaining;
//   let redeem = new Redemption(transaction.id)
//   let ohm_contract = OlympusERC20.bind(Address.fromString(OHM_ERC20_CONTRACT))

//   let counter = Redemption.load('3')
//   if(counter == null)
//   {
//       counter = new Redemption('3')
//   }
//   counter.totalRedeemd = counter.totalRedeemd.plus(amount)
//   counter.save()
  
  
//   redeem.ohmReserve = toDecimal(ohm_contract.balanceOf(Address.fromString(OHMDAISLPBOND_CONTRACT1)), 9)
//   redeem.token = token.id
//   redeem.timestamp = transaction.timestamp
//   redeem.payout = amount
//   redeem.totalRedeemd = counter.totalRedeemd
//   redeem.transaction = transaction.id

//   redeem.save()
// }

// export function handleBondPriceChange(event: BondPriceChanged) : void{
//   let transaction = loadOrCreateTransaction(event.transaction, event.block)
//   let token = loadOrCreateToken(OHMDAILPBOND_TOKEN)

//   let price = new PriceChange(transaction.id)

//   price.transaction = transaction.id
  
//   price.priceInUSD = toDecimal(event.params.priceInUSD, 9)
//   price.internalPrice = toDecimal(event.params.internalPrice, 2)
//   price.ratio = toDecimal(event.params.debtRatio, 9)
//   price.token = token.id
//   price.timestamp = transaction.timestamp
  
//   price.save()
// }

// export function handleControlVariableAdjustment(event: ControlVariableAdjustment) : void{
//   let transaction = loadOrCreateTransaction(event.transaction, event.block)
//   let token = loadOrCreateToken(OHMDAILPBOND_TOKEN)

//   let variable = new VariableAdjustment(transaction.id)

//   variable.token = token.id

//   variable.initialBCV = toDecimal(event.params.initialBCV, 9)
//   variable.newBCV = toDecimal(event.params.newBCV, 9)
//   variable.adjustment = toDecimal(event.params.adjustment, 9)
//   variable.addition = event.params.addition

//   variable.save()
// }


// // export function handleDeposit(call: DepositBondPrincipleCall): void {
// // //   let ohmie = loadOrCreateOHMie(call.transaction.from)
// //   let transaction = loadOrCreateTransaction(call.transaction, call.block)
// //   let token = loadOrCreateToken(OHMDAILPBOND_TOKEN)

// //   let amount = toDecimal(call.inputs.amountToDeposit_, 18)
// //   let deposit = new Deposit(transaction.id)
// //   deposit.transaction = transaction.id
// // //   deposit.ohmie = ohmie.id
// //   deposit.amount = amount
// //   deposit.value = toDecimal(call.inputs.amountToDeposit_, 9)
// //   deposit.maxPremium = new BigDecimal(new BigInt(0))
// //   deposit.token = token.id;
// //   deposit.timestamp = transaction.timestamp;
// //   deposit.save()

// //   createDailyBondRecord(deposit.timestamp, token, deposit.amount, deposit.value)
// // //   updateOhmieBalance(ohmie, transaction)
// // }

// // export function handleRedeem(call: RedeemBondCall): void {
// // //   let ohmie = loadOrCreateOHMie(call.transaction.from)
// //   let transaction = loadOrCreateTransaction(call.transaction, call.block)
  
// //   // let redemption = Redemption.load(transaction.id)
// //   // if (redemption==null){
// //   //   redemption = new Redemption(transaction.id)
// //   // }
// //   let redemption = new Redemption(transaction.id)
// //   redemption.transaction = transaction.id
// // //   redemption.ohmie = ohmie.id
// //   redemption.token = loadOrCreateToken(OHMDAILPBOND_TOKEN).id;
// //   redemption.timestamp = transaction.timestamp;
// //   redemption.save()
// // //   updateOhmieBalance(ohmie, transaction)
// // }