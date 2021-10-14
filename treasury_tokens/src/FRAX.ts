import { Bytes } from "@graphprotocol/graph-ts"
import { balanceAdded} from "./utils/YersToken" 
import { FRAX} from "./utils/Suffix"




import {
    Transfer
  } from "../generated/FRAX/FRAX"


export function handleTransfer(event: Transfer): void {
    if(event.params.from==Bytes.fromHexString("0x31F8Cc382c9898b273eff4e0b7626a6987C846E8")){
      
      balanceAdded(event.params.value,false,event.block.timestamp,FRAX,"0x853d955acef822db058eb8505911ed77f175b99e");
      
    }
    
    if(event.params.to== Bytes.fromHexString("0x31F8Cc382c9898b273eff4e0b7626a6987C846E8"))
    { 
  
      balanceAdded(event.params.value,true,event.block.timestamp,FRAX,"0x853d955acef822db058eb8505911ed77f175b99e");
     
    }
  }