import {toDecimal}from "./Decimals"
import {STAKE_SUFFIX} from "./Suffix"
import {getNumberDayFromDate} from './DatesSecond'
import { BigDecimal, BigInt, Bytes, Address } from '@graphprotocol/graph-ts';
import {Stake, StakeMinute, StakeHour, StakeDay, StakeYear, Token, Transaction, Unstake} from "../../generated/schema"
import { OHM_ERC20_CONTRACT, STAKING_CONTRACT_V2, SUSHI_OHMDAI_PAIR } from './Constants'
import { UniswapV2Pair } from '../../generated/DAIBondV3/UniswapV2Pair';

let BIG_DECIMAL_1E9 = BigDecimal.fromString('1e9')

/**

     * @dev : Add stakes / unstakes to graph
     * @param type - Type of transaction (stake or unstake)
     * @param token - OHM
     * @param amount - Amount of OHM tokens to stake / unstake
     * @param timeStamp - Timestamp of transaction block
     * @param ohm_balance - Balance of contract in OHM
*/
export function StakeAdd(type:string, token:string, amount:BigDecimal, timeStamp:BigInt, ohm_balance: BigDecimal):void {

    let number:i64 =Number.parseInt(timeStamp.toString(),10) as i64;
    number*=1000;
    const date: Date = new Date( number);
    let usdRate = getOHMUSDRate()
    let year = StakeYear.load(token+date.getUTCFullYear().toString()+STAKE_SUFFIX);
    let lastYear =  StakeYear.load(token+(date.getUTCFullYear()-1).toString()+STAKE_SUFFIX);
    if(year==null){
        year= new StakeYear(token+date.getUTCFullYear().toString()+STAKE_SUFFIX);
        year.timestamp=timeStamp;
        if(type == 'stake')
        {
            year.amountStaked=amount;
            year.stakeCount = BigInt.fromString('1')
            year.stakeMax = amount
            
        }
        else
        {
            year.amountUnstaked = amount;
            year.unstakeCount = BigInt.fromString('1')
            year.unstakeMax = amount
        }
        year.currentStaked = ohm_balance
        year.usdRate = usdRate
        year.token=token;
        year.save();
        
    }else {
        year.timestamp=timeStamp;
        
        if(type == 'stake')
        {
            
            year.amountStaked=year.amountStaked.plus(amount);
            year.stakeCount = year.stakeCount.plus(BigInt.fromString('1'))
            if(year.stakeMax < amount)
            {
                year.stakeMax = amount
            }
        }
        else
        {
            year.amountUnstaked=year.amountUnstaked.plus(amount);
            year.unstakeCount = year.unstakeCount.plus(BigInt.fromString('1'))
            if(year.unstakeMax < amount)
            {
                year.unstakeMax = amount
            }
        }

        year.currentStaked = ohm_balance
        year.usdRate = usdRate
        year.token=token

        year.save();
    }
    
    
    let days = year.dayStake;
    
    let day=StakeDay.load(token+date.getUTCFullYear().toString()+"-"+getNumberDayFromDate(date).toString()+STAKE_SUFFIX);
    
    if(day==null){
        day = new StakeDay(token+date.getUTCFullYear().toString()+"-"+getNumberDayFromDate(date).toString()+STAKE_SUFFIX);
        day.timestamp=timeStamp;
        
        if(type == "stake")
        {
            day.amountStaked=amount;
            day.stakeCount = BigInt.fromString('1')
            day.stakeMax = amount
        }
        else{
            day.amountUnstaked=amount;
            day.unstakeCount = BigInt.fromString('1')
            day.unstakeMax = amount
        }
        day.currentStaked = ohm_balance
        day.usdRate = usdRate
        day.token=token
        day.save();

        days.push(day.id)
        year.dayStake = days
        year.save()
    }else {
        day.timestamp=timeStamp;
        if(type == "stake")
        {
            day.amountStaked=day.amountStaked.plus(amount);
            day.stakeCount = day.stakeCount.plus(BigInt.fromString('1'))
            if(day.stakeMax < amount)
            {
                day.stakeMax = amount
            }
        }
        else{
            day.amountUnstaked=day.amountUnstaked.plus(amount);
            day.unstakeCount = day.unstakeCount.plus(BigInt.fromString('1'))
            if(day.unstakeMax < amount)
            {
                day.unstakeMax = amount
            }
        }
        day.currentStaked = ohm_balance
        day.usdRate = usdRate
        day.token=token;      

        day.save();
    }
    
    let hours = day.hourStake;
    let hour = StakeHour.load(token+date.getUTCFullYear().toString()+"-"+getNumberDayFromDate(date).toString()+"-"+date.getUTCHours().toString()+STAKE_SUFFIX);
    if(hour==null) {
        hour = new StakeHour(token+date.getUTCFullYear().toString()+"-"+getNumberDayFromDate(date).toString()+"-"+date.getUTCHours().toString()+STAKE_SUFFIX);
        hour.timestamp=timeStamp;
        
        if(type == "stake")
        {
            hour.amountStaked=amount;
            hour.stakeCount = BigInt.fromString('1')
            hour.stakeMax = amount
        }
        else{
            hour.amountUnstaked=amount;
            hour.unstakeCount = BigInt.fromString('1')
            hour.unstakeMax = amount
        }
        hour.currentStaked = ohm_balance
        hour.usdRate = usdRate
        hour.token=token;   

        hour.save();

        hours.push(hour.id);
        day.hourStake=hours;

        day.save();
    }else {
        if(type == "stake")
        {
            hour.amountStaked=hour.amountStaked.plus(amount);
            hour.stakeCount = hour.stakeCount.plus(BigInt.fromString('1'))
            if(hour.stakeMax < amount)
            {
                hour.stakeMax = amount
            }
        }
        else{
            hour.amountUnstaked=hour.amountUnstaked.plus(amount);
            hour.unstakeCount = hour.unstakeCount.plus(BigInt.fromString('1'))
            if(hour.unstakeMax < amount)
            {
                hour.unstakeMax = amount
            }
        }
        hour.currentStaked = ohm_balance
        hour.usdRate = usdRate
        hour.timestamp=timeStamp;
        hour.token=token;        
        hour.save();
    }
    
    let minutes= hour.minuteStake;
    let minute =StakeMinute.load(token+date.getUTCFullYear().toString()+"-"+getNumberDayFromDate(date).toString()+"-"+date.getUTCHours().toString()+"-"+date.getUTCMinutes().toString()+STAKE_SUFFIX);
    if(minute==null) {
        minute = new StakeMinute(token+date.getUTCFullYear().toString()+"-"+getNumberDayFromDate(date).toString()+"-"+date.getUTCHours().toString()+"-"+date.getUTCMinutes().toString()+STAKE_SUFFIX);
        minute.timestamp=timeStamp;

        if(type == "stake")
        {
            minute.amountStaked=amount;
            minute.stakeCount = BigInt.fromString('1')
            minute.stakeMax = amount
        }
        else{
            minute.amountUnstaked=amount;
            minute.unstakeCount = BigInt.fromString('1')
            minute.unstakeMax = amount
        }
        minute.currentStaked = ohm_balance
        minute.usdRate = usdRate
        minute.token=token;        
        minute.save();
        minutes.push(minute.id);
        hour.minuteStake=minutes;
        hour.save();
    }else {
        
        if(type == "stake")
        {
            minute.amountStaked=minute.amountStaked.plus(amount);
            minute.stakeCount = minute.stakeCount.plus(BigInt.fromString('1'))
            if(minute.stakeMax < amount)
            {
                minute.stakeMax = amount
            }
        }
        else{
            minute.amountUnstaked=minute.amountUnstaked.plus(amount);
            minute.unstakeCount = minute.unstakeCount.plus(BigInt.fromString('1'))
            if(minute.unstakeMax < amount)
            {
                minute.unstakeMax = amount
            }
        }
        minute.currentStaked = ohm_balance
        minute.usdRate = usdRate
        minute.timestamp=timeStamp;
        minute.token=token;        
        minute.save();

    }
}

export function getOHMUSDRate(): BigDecimal {

  let pair = UniswapV2Pair.bind(Address.fromString(SUSHI_OHMDAI_PAIR))

  let reserves = pair.getReserves()
  let reserve0 = reserves.value0.toBigDecimal()
  let reserve1 = reserves.value1.toBigDecimal()

  let ohmRate = reserve1.div(reserve0).div(BIG_DECIMAL_1E9)

  return ohmRate

}
