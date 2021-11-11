import { Address, BigDecimal, BigInt, log, Bytes } from '@graphprotocol/graph-ts'
import { Balance, Wallet, totalSupplyDaily, totalSupplyHourly, totalSupplyMinutely ,DailyBalance, HourBalance, MinuteBalance } from '../../generated/schema'
import {SOHM_ERC20_CONTRACT, OHM_ERC20_CONTRACT, SUSHI_OHMDAI_PAIR} from './Constants'
import {
  wOHM
} from "../../generated/wOHM/wOHM"

import { UniswapV2Pair } from '../../generated/wOHM/UniswapV2Pair';

let BIG_DECIMAL_1E9 = BigDecimal.fromString('1e9')
let BIG_DECIMAL_1E12 = BigDecimal.fromString('1e12')


export function createBalance(address: Bytes, timestamp: BigInt, id: Bytes): Balance {

  let entity = Balance.load(id.toHex())

  if (!entity) {
    entity = new Balance(id.toHex())
  }

  let ohmContract = wOHM.bind(Address.fromString(OHM_ERC20_CONTRACT))
  let sohmContract = wOHM.bind(Address.fromString(SOHM_ERC20_CONTRACT))

  entity.wallet = address.toHex()
  entity.ohmBalance = ohmContract.balanceOf(Address.fromString(address.toHex()))
  entity.sohmBalance = sohmContract.balanceOf(Address.fromString(address.toHex()))
  entity.timestamp = timestamp
  entity.address = address.toHex()
  entity.transfer = id.toHex()
  entity.save()

  return entity as Balance

}

export function createDailyBalance(address: Bytes, timestamp: BigInt): DailyBalance {

  let number:i64 =Number.parseInt(timestamp.toString(),10) as i64;
  number*=1000;
  const date: Date = new Date(number);

  let entity = DailyBalance.load(`${address.toHex()}-${date.getUTCFullYear()}-${getNumberDayFromDate(date)}`)

  if (!entity) {
    entity = new DailyBalance(`${address.toHex()}-${date.getUTCFullYear()}-${getNumberDayFromDate(date)}`)
  }

  let ohmContract = wOHM.bind(Address.fromString(OHM_ERC20_CONTRACT))
  //let sohmContract = wOHM.bind(Address.fromString(SOHM_ERC20_CONTRACT))

  entity.wallet = address.toHex()
  entity.ohmBalance = ohmContract.balanceOf(Address.fromString(address.toHex()))
  //entity.sohmBalance = sohmContract.balanceOf(Address.fromString(address.toHex()))
  entity.timestamp = timestamp
  entity.address = address
  entity.day = BigInt.fromString(getNumberDayFromDate(date).toString())
  entity.save()
  let hourBalance = createHourBalance(address, timestamp)
  return entity as DailyBalance


}

export function createHourBalance(address: Bytes, timestamp: BigInt): HourBalance {

  let number:i64 =Number.parseInt(timestamp.toString(),10) as i64;
  number*=1000;
  const date: Date = new Date( number);

  let entity = HourBalance.load(`${address.toHex()}-${date.getUTCFullYear()}-${getNumberDayFromDate(date).toString()}-${date.getUTCHours().toString()}`)

  if (!entity) {
    entity = new HourBalance(`${address.toHex()}-${date.getUTCFullYear()}-${getNumberDayFromDate(date).toString()}-${date.getUTCHours().toString()}`)
  }

  let ohmContract = wOHM.bind(Address.fromString(OHM_ERC20_CONTRACT))

  entity.dailyBalance = `${address.toHex()}-${date.getUTCFullYear()}-${getNumberDayFromDate(date).toString()}`
  entity.ohmBalance = ohmContract.balanceOf(Address.fromString(address.toHex()))
  entity.timestamp = timestamp
  entity.address = address
  entity.hour = BigInt.fromI32(date.getUTCHours())
  entity.save()
  let minuteBalance = createMinuteBalance(address, timestamp)

  return entity as HourBalance

}

export function createMinuteBalance(address: Bytes, timestamp: BigInt): MinuteBalance {

  let number:i64 =Number.parseInt(timestamp.toString(),10) as i64;
  number*=1000;
  const date: Date = new Date(number);

  let entity = MinuteBalance.load(`${address.toHex()}-${date.getUTCFullYear()}-${getNumberDayFromDate(date).toString()}-${date.getUTCHours().toString()}-${date.getUTCMinutes().toString()}`)

  if (!entity) {
    entity = new MinuteBalance(`${address.toHex()}-${date.getUTCFullYear()}-${getNumberDayFromDate(date).toString()}-${date.getUTCHours().toString()}-${date.getUTCMinutes().toString()}`)
  }

  let ohmContract = wOHM.bind(Address.fromString(OHM_ERC20_CONTRACT))

  entity.hourBalance = `${address.toHex()}-${date.getUTCFullYear()}-${getNumberDayFromDate(date).toString()}-${date.getUTCHours().toString()}`
  entity.ohmBalance = ohmContract.balanceOf(Address.fromString(address.toHex()))
  entity.timestamp = timestamp
  entity.address = address
  entity.minute = BigInt.fromI32(date.getUTCMinutes())
  entity.save()

  return entity as MinuteBalance

}

export function createTotalsDaily(timestamp: BigInt, blockNumber: BigInt): void {

  let number:i64 =Number.parseInt(timestamp.toString(),10) as i64;
  number*=1000;
  const date: Date = new Date( number );

  let total = totalSupplyDaily.load(`${date.getUTCFullYear()}-${getNumberDayFromDate(date)}`)
  if (!total) {
    total = new totalSupplyDaily(`${date.getUTCFullYear()}-${getNumberDayFromDate(date)}`)
    total.totalWallets = BigInt.fromI32(0)
  }
  let currentTotal = total.totalWallets

  // ohm 
  let ohmContract = wOHM.bind(Address.fromString(OHM_ERC20_CONTRACT))
  total.ohmBalance = toDecimal(ohmContract.totalSupply(),9)
  total.daoOhmBalance = toDecimal(ohmContract.balanceOf(Address.fromString("0x245cc372C84B3645Bf0Ffe6538620B04a217988B")),9)
  total.circulatingSupply = total.ohmBalance - total.daoOhmBalance

  //usd
  if(blockNumber.gt(BigInt.fromString('12112800'))){

    let usdRate = getOHMUSDRate()
    total.daoDollarBalance = total.daoOhmBalance.times(usdRate)
    total.dollarBalance = total.ohmBalance.times(usdRate)
    total.marketCapacity = total.circulatingSupply.times(usdRate)

  }

  total.timestamp = timestamp
  //total.totalWallets = currentTotal + BigInt.fromI32(1)
  total.save()

  createTotalsHourly(timestamp, blockNumber)

}

export function createTotalsHourly(timestamp: BigInt, blockNumber: BigInt): void {

  let number:i64 =Number.parseInt(timestamp.toString(),10) as i64;
  number*=1000;
  const date: Date = new Date( number );

  let total = totalSupplyHourly.load(`${date.getUTCFullYear()}-${getNumberDayFromDate(date)}-${date.getUTCHours()}`)
  if (!total) {
    total = new totalSupplyHourly(`${date.getUTCFullYear()}-${getNumberDayFromDate(date)}-${date.getUTCHours()}`)
    total.totalWallets = BigInt.fromI32(0)
  }
  let currentTotal = total.totalWallets

  // ohm 
  let ohmContract = wOHM.bind(Address.fromString(OHM_ERC20_CONTRACT))
  total.ohmBalance = toDecimal(ohmContract.totalSupply(),9)
  total.daoOhmBalance = toDecimal(ohmContract.balanceOf(Address.fromString("0x245cc372C84B3645Bf0Ffe6538620B04a217988B")),9)
  total.circulatingSupply = total.ohmBalance - total.daoOhmBalance

  total.totalSupplyDaily = `${date.getUTCFullYear()}-${getNumberDayFromDate(date)}`

  //usd
  if(blockNumber.gt(BigInt.fromString('12112800'))){

    let usdRate = getOHMUSDRate()
    total.daoDollarBalance = total.daoOhmBalance.times(usdRate)
    total.dollarBalance = total.ohmBalance.times(usdRate)
    total.marketCapacity = total.circulatingSupply.times(usdRate)

  }

  total.timestamp = timestamp
  //total.totalWallets = currentTotal + BigInt.fromI32(1)
  total.save()

  createTotalsMinutely(timestamp, blockNumber)

}

export function createTotalsMinutely(timestamp: BigInt, blockNumber: BigInt): void {

  let number:i64 =Number.parseInt(timestamp.toString(),10) as i64;
  number*=1000;
  const date: Date = new Date( number );

  let total = totalSupplyMinutely.load(`${date.getUTCFullYear()}-${getNumberDayFromDate(date)}-${date.getUTCHours()}-${date.getUTCMinutes()}`)
  if (!total) {
    total = new totalSupplyMinutely(`${date.getUTCFullYear()}-${getNumberDayFromDate(date)}-${date.getUTCHours()}-${date.getUTCMinutes()}`)
    total.totalWallets = BigInt.fromI32(0)
  }
  let currentTotal = total.totalWallets

  // ohm 
  let ohmContract = wOHM.bind(Address.fromString(OHM_ERC20_CONTRACT))
  total.ohmBalance = toDecimal(ohmContract.totalSupply(),9)
  total.daoOhmBalance = toDecimal(ohmContract.balanceOf(Address.fromString("0x245cc372C84B3645Bf0Ffe6538620B04a217988B")),9)
  total.circulatingSupply = total.ohmBalance - total.daoOhmBalance

  //parent entity id
  total.totalSupplyHourly = `${date.getUTCFullYear()}-${getNumberDayFromDate(date)}-${date.getUTCHours()}`

  //usd
  if(blockNumber.gt(BigInt.fromString('12112800'))){

    let usdRate = getOHMUSDRate()
    total.daoDollarBalance = total.daoOhmBalance.times(usdRate)
    total.dollarBalance = total.ohmBalance.times(usdRate)
    total.marketCapacity = total.circulatingSupply.times(usdRate)

  }

  total.timestamp = timestamp
  //total.totalWallets = currentTotal + BigInt.fromI32(1)
  total.save()

}


export function createWallet(address: Bytes, timestamp: BigInt, id: Bytes): void {

  let entity = Wallet.load(address.toHex())

  if (!entity) {
    entity = new Wallet(address.toHex())
    entity.birth = timestamp
  }

  let ohmContract = wOHM.bind(Address.fromString(OHM_ERC20_CONTRACT))
  let sohmContract = wOHM.bind(Address.fromString(SOHM_ERC20_CONTRACT))
  entity.ohmBalance = ohmContract.balanceOf(Address.fromString(address.toHex()))
  entity.sohmBalance = sohmContract.balanceOf(Address.fromString(address.toHex()))
  entity.address = address
  entity.save()

  //let balance = createBalance(address, timestamp, id)
  let DailyBalance = createDailyBalance(address, timestamp)

}

function toDecimal(
  value: BigInt,
  decimals: number = DEFAULT_DECIMALS,
): BigDecimal {
  let precision = BigInt.fromI32(10)
    .pow(<u8>decimals)
    .toBigDecimal();

  return value.divDecimal(precision);
}

function getNumberDayFromDate(date:Date): i64 {

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
