import {toDecimal}from "./Decimals"
import {STAKE_SUFFIX} from "./Suffix"
import {getNumberDayFromDate} from './DatesSecond'
import { BigDecimal, BigInt, Bytes } from '@graphprotocol/graph-ts';
import {Rebase, RebaseDay, RebaseYear, RebaseHour, RebaseMinute, Token, Transaction} from "../../generated/schema"
import { OHM_ERC20_CONTRACT, STAKING_CONTRACT_V2 } from './Constants'


export function RebaseAdd(timeStamp:BigInt, ohmStaked: BigDecimal, amount: BigDecimal, amountUSD: BigDecimal):void {
    const token = "RBS"

    let number:i64 =Number.parseInt(timeStamp.toString(),10) as i64;
    number*=1000;
    const date: Date = new Date( number);

    let year = RebaseYear.load(token+date.getUTCFullYear().toString()  );
    if(year==null){
        year= new RebaseYear(token+date.getUTCFullYear().toString()  );
        year.timestamp=timeStamp;
        
        year.amount = amount;
        year.amountUSD = amountUSD
        year.percentage = amount.div(ohmStaked)
        year.stakedOhms = ohmStaked
        year.save();
        
    }else {
        year.timestamp=timeStamp;      
        year.amount = year.profit.plus(amount);
        year.amountUSD = year.profit.plus(amountUSD)
        year.stakedOhms = year.profit.plus(ohmStaked)
        year.percentage = year.amount.div(year.stakedOhms)

        year.save();
    }
    
    
    let days = year.dayRebase;
    
    let day=RebaseDay.load(token+date.getUTCFullYear().toString()+"-"+getNumberDayFromDate(date).toString()  );
    
    if(day==null){
        day = new RebaseDay(token+date.getUTCFullYear().toString()+"-"+getNumberDayFromDate(date).toString()  );
        day.timestamp=timeStamp;
            
        day.amount = amount;
        day.amountUSD = amountUSD
        day.percentage = amount.div(ohmStaked)
        day.stakedOhms = ohmStaked
        day.save();

        days.push(day.id)
        year.dayRebase = days
        year.save()
    }else {
        day.timestamp=timeStamp;      
        day.amount = day.amount.plus(amount);
        day.amountUSD = day.amountUSD.plus(amountUSD)
        day.stakedOhms = day.stakedOhms.plus(ohmStaked)
        day.percentage = day.amount.div(day.stakedOhms)

        day.save();
    }    

    let hours = day.hourRebase;
    let hour = RebaseHour.load(token+date.getUTCFullYear().toString()+"-"+getNumberDayFromDate(date).toString()+"-"+date.getUTCHours().toString());
    if(hour==null) {
        hour = new RebaseHour(token+date.getUTCFullYear().toString()+"-"+getNumberDayFromDate(date).toString()+"-"+date.getUTCHours().toString());
        hour.timestamp=timeStamp
            
        hour.amount = amount
        hour.amountUSD = amountUSD
        hour.percentage = amount.div(ohmStaked)
        hour.stakedOhms = ohmStaked
        hour.save();

        hours.push(hour.id)
        day.hourRebase=hours

        day.save();
    }else {
        hour.timestamp=timeStamp
            
        hour.amount = amount
        hour.amountUSD = amountUSD
        hour.percentage = amount.div(ohmStaked)
        hour.stakedOhms = ohmStaked
        hour.save()
    }
    let minutes= hour.minuteRebase;
    let minute = RebaseMinute.load(token+date.getUTCFullYear().toString()+"-"+getNumberDayFromDate(date).toString()+"-"+date.getUTCHours().toString()+"-"+date.getUTCMinutes().toString()+STAKE_SUFFIX);
    if(minute==null) {
        minute = new RebaseMinute(token+date.getUTCFullYear().toString()+"-"+getNumberDayFromDate(date).toString()+"-"+date.getUTCHours().toString());
        minute.timestamp=timeStamp
            
        minute.amount = amount
        minute.amountUSD = amountUSD
        minute.percentage = amount.div(ohmStaked)
        minute.stakedOhms = ohmStaked
        minute.save();
        minutes.push(minute.id)

        hour.minuteRebase=minutes
        hour.save();
    }else {
        minute.timestamp=timeStamp
            
        minute.amount = amount
        minute.amountUSD = amountUSD
        minute.percentage = amount.div(ohmStaked)
        minute.stakedOhms = ohmStaked
        minute.save();
    }
}
