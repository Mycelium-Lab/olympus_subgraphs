import { Bytes } from "@graphprotocol/graph-ts"
import { balanceAdded} from "./utils/YersToken" 
import { LUSD_SUFFIX} from "./utils/Suffix"




import {
    Transfer
  } from "../generated/LUSD/LUSD"


export function handleTransfer(event: Transfer): void {
    if(event.params.from==Bytes.fromHexString("0x31F8Cc382c9898b273eff4e0b7626a6987C846E8")){
      
      balanceAdded(event.params.value,false,event.block.timestamp,LUSD_SUFFIX,"0x5f98805A4E8be255a32880FDeC7F6728C6568bA0");
      
    }
    
    if(event.params.to== Bytes.fromHexString("0x31F8Cc382c9898b273eff4e0b7626a6987C846E8"))
    { 
  
      balanceAdded(event.params.value,true,event.block.timestamp,LUSD_SUFFIX,"0x5f98805A4E8be255a32880FDeC7F6728C6568bA0");
     
    }
  }