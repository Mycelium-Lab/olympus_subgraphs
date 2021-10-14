import { Bytes } from "@graphprotocol/graph-ts"
import { balanceAdded} from "./utils/YersToken" 
import { UNI_V2} from "./utils/Suffix"




import {
    Transfer
  } from "../generated/UNI_V2/UNI_V2"


export function handleTransfer(event: Transfer): void {
    if(event.params.from==Bytes.fromHexString("0x31F8Cc382c9898b273eff4e0b7626a6987C846E8")){
      
      balanceAdded(event.params.value,false,event.block.timestamp,UNI_V2,"0x2dcE0dDa1C2f98e0F171DE8333c3c6Fe1BbF4877");
      
    }
    
    if(event.params.to== Bytes.fromHexString("0x31F8Cc382c9898b273eff4e0b7626a6987C846E8"))
    { 
  
      balanceAdded(event.params.value,true,event.block.timestamp,UNI_V2,"0x2dcE0dDa1C2f98e0F171DE8333c3c6Fe1BbF4877");
     
    }
  }