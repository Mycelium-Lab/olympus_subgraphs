import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts'
import { Stake, Unstake } from '../generated/schema'
import { OlympusERC20 } from '../generated/sOlympusERC20V1/OlympusERC20'
import { OHM_ERC20_CONTRACT, STAKING_CONTRACT_V2 } from './utils/Constants'

import {  StakeCall, UnstakeCall  } from '../generated/OlympusStakingV2/OlympusStakingV2'
import { toDecimal } from "./utils/Decimals"
import { loadOrCreateTransaction } from "./utils/Transactions"
import { StakeAdd } from './utils/YearStakes'

export function handleStake(call: StakeCall): void {
    // let ohmie = loadOrCreateOHMie(call.from as Address)
    let transaction = loadOrCreateTransaction(call.transaction, call.block)
    let value = toDecimal(call.inputs._amount, 9)
    let ohm_contract = OlympusERC20.bind(Address.fromString(OHM_ERC20_CONTRACT))
    let ohm_balance = toDecimal(ohm_contract.balanceOf(Address.fromString(STAKING_CONTRACT_V2)), 9)
}

export function handleUnstake(call: UnstakeCall): void {
    let transaction = loadOrCreateTransaction(call.transaction, call.block)
    let value = toDecimal(call.inputs._amount, 9)
    let ohm_contract = OlympusERC20.bind(Address.fromString(OHM_ERC20_CONTRACT))
    let ohm_balance = toDecimal(ohm_contract.balanceOf(Address.fromString(STAKING_CONTRACT_V2)), 9)

    StakeAdd("unstake", 'ohm', value, transaction.timestamp, ohm_balance)
    let unstake = new Unstake(transaction.id)
    unstake.amount = value
    unstake.currentStaked = ohm_balance
    unstake.transaction = transaction.id
    unstake.from = transaction.from
    unstake.timestamp = transaction.timestamp
    unstake.save()
}