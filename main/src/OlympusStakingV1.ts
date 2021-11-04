import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts'
import { Stake, Unstake } from '../generated/schema'
import { OlympusERC20 } from '../generated/sOlympusERC20V1/OlympusERC20'
import { OHM_ERC20_CONTRACT, STAKING_CONTRACT_V1 } from './utils/Constants'

import {  StakeOHMCall, UnstakeOHMCall  } from '../generated/OlympusStakingV1/OlympusStakingV1'
import { toDecimal } from "./utils/Decimals"
// import { loadOrCreateOHMie, updateOhmieBalance } from "./utils/OHMie"
import { loadOrCreateTransaction } from "./utils/Transactions"
import { StakeAdd } from './utils/YearStakes'

export function handleStake(call: StakeOHMCall): void {
    let transaction = loadOrCreateTransaction(call.transaction, call.block)
    let value = toDecimal(call.inputs.amountToStake_, 9)
    let ohm_contract = OlympusERC20.bind(Address.fromString(OHM_ERC20_CONTRACT))
    let ohm_balance = toDecimal(ohm_contract.balanceOf(Address.fromString(STAKING_CONTRACT_V1)), 9)


    StakeAdd("stake", 'ohm', value, transaction.timestamp, ohm_balance)
    let stake = new Stake(transaction.id)
    stake.amountStaked = value
    stake.from = transaction.from
    stake.currentStaked = ohm_balance
    stake.timestamp = transaction.timestamp
    stake.transaction = transaction.id
    stake.save()
}

export function handleUnstake(call: UnstakeOHMCall): void {
    let transaction = loadOrCreateTransaction(call.transaction, call.block)
    let value = toDecimal(call.inputs.amountToWithdraw_, 9)
    let ohm_contract = OlympusERC20.bind(Address.fromString(OHM_ERC20_CONTRACT))
    let ohm_balance = toDecimal(ohm_contract.balanceOf(Address.fromString(STAKING_CONTRACT_V1)), 9)
    StakeAdd("unstake", 'ohm', value, transaction.timestamp, ohm_balance)

    let unstake = new Unstake(transaction.id)
    unstake.amount = value
    unstake.currentStaked = ohm_balance
    unstake.transaction = transaction.id
    unstake.from = transaction.from
    unstake.timestamp = transaction.timestamp
    unstake.save()
}