import { Address, BigInt } from '@graphprotocol/graph-ts'

import {  DepositCall, RedeemCall, BondCreated, BondRedeemed, BondPriceChanged} from '../generated/DAIBondV2/DAIBondV2'
import { Deposit, Redemption, PriceChange, VariableAdjustment } from '../generated/schema'
import { OlympusERC20 } from '../generated/sOlympusERC20V1/OlympusERC20'
import { loadOrCreateTransaction } from "./utils/Transactions"
// import { loadOrCreateOHMie, updateOhmieBalance } from "./utils/OHMie"
import { toDecimal } from "./utils/Decimals"
import { DAIBOND_TOKEN, OHM_ERC20_CONTRACT, DAIBOND_CONTRACTS2} from './utils/Constants'
import { loadOrCreateToken } from './utils/Tokens'
import { loadOrCreateRedemption } from './utils/Redemption'
import { createDailyBondRecord } from './utils/DailyBond'
import {DepositAdd} from "./utils/YearsDeposit"

/**

    @dev : Handle DAI Bond create
*/
export function handleBondCreate(event: BondCreated) : void{
  let transaction = loadOrCreateTransaction(event.transaction, event.block)
  let token = loadOrCreateToken(DAIBOND_TOKEN)
  let amount = toDecimal(event.params.deposit, 18)
  DepositAdd('deposit', token.id, amount, transaction.timestamp)

}

export function handleBondRedeem(event: BondRedeemed) : void{
  let transaction = loadOrCreateTransaction(event.transaction, event.block)
  let token = loadOrCreateToken(DAIBOND_TOKEN)
  let amount = toDecimal(event.params.payout, 9)
  let redeem = new Redemption(transaction.id)

  DepositAdd('redeem', token.id, amount, transaction.timestamp)
  redeem.save()
}

export function handleBondPriceChange(event: BondPriceChanged) : void{
  let transaction = loadOrCreateTransaction(event.transaction, event.block)
  let token = loadOrCreateToken(DAIBOND_TOKEN)

  let price = new PriceChange(transaction.id)

  price.transaction = transaction.id
  
  price.priceInUSD = toDecimal(event.params.priceInUSD, 9)
  price.internalPrice = toDecimal(event.params.internalPrice, 2)
  price.ratio = toDecimal(event.params.debtRatio, 9)
  price.token = token.id
  price.timestamp = transaction.timestamp
  
  price.save()
}
