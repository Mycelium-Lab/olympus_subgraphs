import { BigDecimal, BigInt, Bytes } from '@graphprotocol/graph-ts';
import {getNumberDayFromDate} from './Dates'
import {Balance,BalanceMinute,BalanceHour,BalanceDay , BalanceYear} from "../../generated/schema"

/**
 * add total reserve  to Subgraph
 * @param totalReserves 
 * @param audited 
 * @param timeStamp 
 */
export function balanceAdded(value: BigDecimal,to:boolean,timeStamp:BigInt,SUFFIX:string,token:string):void{

    let number:i64 =Number.parseInt(timeStamp.toString(),10) as i64;
    number*=1000;
    const date: Date = new Date( number);

    let year = BalanceYear.load(date.getUTCFullYear().toString()+SUFFIX);

    if(year==null){
        year= new BalanceYear(date.getUTCFullYear().toString()+SUFFIX);
        year.timestamp=timeStamp;
        year.token=token;
        if(to){
            year.value=value;
        }else{
            year.value=BigDecimal.zero().minus(value);
        }
        year.save();
    }else {
        if(to){
            year.value=year.value.plus(value);
        }else{
            year.value=year.value.minus(value);
        }
        year.save();
    }
    
    
    let days = year.day;
    
    let day=BalanceDay.load(date.getUTCFullYear().toString()+"-"+getNumberDayFromDate(date).toString()+SUFFIX);
    
    if(day==null){
        day = new BalanceDay(date.getUTCFullYear().toString()+"-"+getNumberDayFromDate(date).toString()+SUFFIX);
        day.timestamp=timeStamp;
        day.value=year.value;
        day.token=token;
        day.save();
        days.push(day.id);
        year.day=days;
        year.save();
    }else {
        day.value=year.value;
        day.save();
    }
    
    let hours = day.hour;
    let hour =BalanceHour.load(date.getUTCFullYear().toString()+"-"+getNumberDayFromDate(date).toString()+"-"+date.getUTCHours().toString()+SUFFIX);
    if(hour==null) {
        hour = new BalanceHour(date.getUTCFullYear().toString()+"-"+getNumberDayFromDate(date).toString()+"-"+date.getUTCHours().toString()+SUFFIX);
        hour.timestamp=timeStamp;
        hour.value=year.value;
        hour.token=token;
        hour.save();
        hours.push(hour.id);
        day.hour=hours;
        day.save();
    }else {
        hour.value=year.value;
        hour.save();
    }
    
    let minutes= hour.minute;
    let minute =BalanceMinute.load(date.getUTCFullYear().toString()+"-"+getNumberDayFromDate(date).toString()+"-"+date.getUTCHours().toString()+"-"+date.getUTCMinutes().toString()+SUFFIX);
    if(minute==null) {
        minute = new BalanceMinute(date.getUTCFullYear().toString()+"-"+getNumberDayFromDate(date).toString()+"-"+date.getUTCHours().toString()+"-"+date.getUTCMinutes().toString()+SUFFIX);
        minute.timestamp=timeStamp;
        minute.value=year.value;
        minute.token=token;

        minute.save();
        minutes.push(minute.id);
        hour.minute=minutes;
        hour.save();
    }else {
        minute.value=year.value;

        minute.save();
    }

    let seconds = minute.second;
    let second =Balance.load(date.getUTCFullYear().toString()+"-"+getNumberDayFromDate(date).toString()+"-"+date.getUTCHours().toString()+"-"+date.getUTCMinutes().toString()+"-"+date.getUTCSeconds().toString()+SUFFIX);//getUTCSeconds
    if(second==null) {
        second = new Balance(date.getUTCFullYear().toString()+"-"+getNumberDayFromDate(date).toString()+"-"+date.getUTCHours().toString()+"-"+date.getUTCMinutes().toString()+"-"+date.getUTCSeconds().toString()+SUFFIX);
        second.timestamp=timeStamp;
        second.value=year.value;
        second.token=token;

        second.save();
        seconds.push(second.id);
        minute.second=seconds;
        minute.save();
    }else {
       
        second.value=year.value;
        second.save();
    }
    

}