import { Bytes } from "@graphprotocol/graph-ts"
import { balanceAdded} from "./utils/YersToken" 
import { DAI} from "./utils/Suffix"




import {
    Transfer
  } from "../generated/DAI/DAI"


export function handleTransfer(event: Transfer): void {
    
    if(event.params.src==Bytes.fromHexString("0x31F8Cc382c9898b273eff4e0b7626a6987C846E8")){
      
      balanceAdded(event.params.wad,false,event.block.timestamp,DAI,"0x6B175474E89094C44Da98b954EedeAC495271d0F");
      
    }
    
    if(event.params.dst== Bytes.fromHexString("0x31F8Cc382c9898b273eff4e0b7626a6987C846E8"))
    { 
  
      balanceAdded(event.params.wad,true,event.block.timestamp,DAI,"0x6B175474E89094C44Da98b954EedeAC495271d0F");
     
    }
  }