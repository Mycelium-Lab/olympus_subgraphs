import { Bytes } from "@graphprotocol/graph-ts"
import { balanceAdded} from "./utils/YersToken" 
import { WETH} from "./utils/Suffix"
import {toDecimal} from './utils/Decimals'





import {
    Transfer
  } from "../generated/WETH/WETH"


export function handleTransfer(event: Transfer): void {
    if(event.params.src==Bytes.fromHexString("0x31F8Cc382c9898b273eff4e0b7626a6987C846E8")){
      balanceAdded(toDecimal(event.params.wad,18),false,event.block.timestamp,WETH,"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2");
    }
    
    if(event.params.dst== Bytes.fromHexString("0x31F8Cc382c9898b273eff4e0b7626a6987C846E8"))
    { 
      balanceAdded(toDecimal(event.params.wad,18),true,event.block.timestamp,WETH,"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2");
    }
  }