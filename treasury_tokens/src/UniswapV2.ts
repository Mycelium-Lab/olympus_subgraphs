import { Bytes } from "@graphprotocol/graph-ts"
import { balanceAdded} from "./utils/YersToken" 
import { UniswapV2} from "./utils/Suffix"
import {toDecimal} from './utils/Decimals'





import {
    Transfer
  } from "../generated/UniswapV2/UniswapV2"


export function handleTransfer(event: Transfer): void {
    if(event.params.from==Bytes.fromHexString("0x31F8Cc382c9898b273eff4e0b7626a6987C846E8")){
      
      balanceAdded(toDecimal(event.params.value,18),false,event.block.timestamp,UniswapV2,"0xfDf12D1F85b5082877A6E070524f50F6c84FAa6b");
      
    }
    
    if(event.params.to== Bytes.fromHexString("0x31F8Cc382c9898b273eff4e0b7626a6987C846E8"))
    { 
  
      balanceAdded(toDecimal(event.params.value,18),true,event.block.timestamp,UniswapV2,"0xfDf12D1F85b5082877A6E070524f50F6c84FAa6b");
     
    }
  }