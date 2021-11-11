import { Address, BigDecimal, BigInt, log, Bytes } from '@graphprotocol/graph-ts'
import {SOHM_ERC20_CONTRACT, OHM_ERC20_CONTRACT, SUSHI_OHMDAI_PAIR} from './Constants'
import { UniswapV2Pair } from '../../generated/wOHM/UniswapV2Pair';
let BIG_DECIMAL_1E9 = BigDecimal.fromString('1e9')
let BIG_DECIMAL_1E12 = BigDecimal.fromString('1e12')


export function toDecimal(
  value: BigInt,
  decimals: number = DEFAULT_DECIMALS,
): BigDecimal {
  let precision = BigInt.fromI32(10)
    .pow(<u8>decimals)
    .toBigDecimal();

  return value.divDecimal(precision);
}

export function getNumberDayFromDate(date:Date): i64 {

  const oneDay:number = 1000 * 60 * 60 * 24;
  let supported=new Date(0);
  supported.setUTCFullYear(date.getUTCFullYear());
  return  Math.floor( Number.parseInt((date.getTime() -  supported.getTime()).toString()) /( oneDay )) as i64;

}

export function getOHMUSDRate(): BigDecimal {

  let pair = UniswapV2Pair.bind(Address.fromString(SUSHI_OHMDAI_PAIR))

  let reserves = pair.getReserves()
  let reserve0 = reserves.value0.toBigDecimal()
  let reserve1 = reserves.value1.toBigDecimal()

  let ohmRate = reserve1.div(reserve0).div(BIG_DECIMAL_1E9)

  return ohmRate

}


export function minuteFromTimestamp(timestamp: BigInt): BigInt {
    let day_ts = timestamp.toI32() - (timestamp.toI32() % 60)
    return BigInt.fromI32(day_ts)
}

export function hourFromTimestamp(timestamp: BigInt): BigInt {
    let day_ts = timestamp.toI32() - (timestamp.toI32() % 3600)
    return BigInt.fromI32(day_ts)
}

export function dayFromTimestamp(timestamp: BigInt): BigInt {
    let day_ts = timestamp.toI32() - (timestamp.toI32() % 86400)
    return BigInt.fromI32(day_ts)
}