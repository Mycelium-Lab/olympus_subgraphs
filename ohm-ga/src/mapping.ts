import { Address, BigDecimal, BigInt, log, Bytes } from '@graphprotocol/graph-ts'
import {
  wOHM,
  Transfer,
  MintCall,
  BurnCall,
} from "../generated/wOHM/wOHM"
import { createTotalsDaily } from './utils/wallets'
import {SOHM_ERC20_CONTRACT, OHM_ERC20_CONTRACT} from './utils/Constants'



export function handleMint(call: MintCall): void {

  createTotalsDaily(call.block.timestamp, call.block.number)

}

export function handleBurn(call: BurnCall): void {

  createTotalsDaily(call.block.timestamp, call.block.number)

}


export function handleTransfer(event: Transfer): void {

  if ((event.params.to.toHex() === "0x245cc372C84B3645Bf0Ffe6538620B04a217988B") || (event.params.from.toHex() === "0x245cc372C84B3645Bf0Ffe6538620B04a217988B")) {

    createTotalsDaily(event.block.timestamp, event.block.number)

  }

}
