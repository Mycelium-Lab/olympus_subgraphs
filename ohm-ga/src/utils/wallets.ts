import { Address, BigDecimal, BigInt, log, Bytes } from '@graphprotocol/graph-ts'
import { totalSupplyDaily, totalSupplyHourly, totalSupplyMinutely } from '../../generated/schema'
import {SOHM_ERC20_CONTRACT, OHM_ERC20_CONTRACT, SUSHI_OHMDAI_PAIR} from './Constants'
import {
  wOHM
} from "../../generated/wOHM/wOHM"

import { toDecimal, getNumberDayFromDate, getOHMUSDRate, minuteFromTimestamp, hourFromTimestamp, dayFromTimestamp} from './utils'

export function createTotalsDaily(timestamp: BigInt, blockNumber: BigInt): totalSupplyDaily {

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
  total.totalSupply = toDecimal(ohmContract.totalSupply(),9)
  total.daoBalance = toDecimal(ohmContract.balanceOf(Address.fromString("0x245cc372C84B3645Bf0Ffe6538620B04a217988B")),9)
  total.circulatingSupply = total.totalSupply - total.daoBalance

  //usd
  if(blockNumber.gt(BigInt.fromString('12112800'))){

    let usdRate = getOHMUSDRate()
    total.daoBalanceUsd = total.daoBalance.times(usdRate)
    total.totalSupplyUsd = total.totalSupply.times(usdRate)
    total.marketCap = total.circulatingSupply.times(usdRate)

  }

  total.timestamp = dayFromTimestamp(timestamp)
  total.save()

  createTotalsHourly(timestamp, blockNumber)

  return total as totalSupplyDaily

}

export function createTotalsHourly(timestamp: BigInt, blockNumber: BigInt): totalSupplyHourly {

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
  total.totalSupply = toDecimal(ohmContract.totalSupply(),9)
  total.daoBalance = toDecimal(ohmContract.balanceOf(Address.fromString("0x245cc372C84B3645Bf0Ffe6538620B04a217988B")),9)
  total.circulatingSupply = total.totalSupply - total.daoBalance

  //parent entity id
  total.totalSupplyDaily = `${date.getUTCFullYear()}-${getNumberDayFromDate(date)}`

  //usd
  if(blockNumber.gt(BigInt.fromString('12112800'))){

    let usdRate = getOHMUSDRate()
    total.daoBalanceUsd = total.daoBalance.times(usdRate)
    total.totalSupplyUsd = total.totalSupply.times(usdRate)
    total.marketCap = total.circulatingSupply.times(usdRate)

  }

  total.timestamp = hourFromTimestamp(timestamp)
  total.save()

  createTotalsMinutely(timestamp, blockNumber)

  return total as totalSupplyHourly

}

export function createTotalsMinutely(timestamp: BigInt, blockNumber: BigInt): totalSupplyMinutely {

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
  total.totalSupply = toDecimal(ohmContract.totalSupply(),9)
  total.daoBalance = toDecimal(ohmContract.balanceOf(Address.fromString("0x245cc372C84B3645Bf0Ffe6538620B04a217988B")),9)
  total.circulatingSupply = total.totalSupply - total.daoBalance

  //parent entity id
  total.totalSupplyHourly = `${date.getUTCFullYear()}-${getNumberDayFromDate(date)}-${date.getUTCHours()}`

  //usd
  if(blockNumber.gt(BigInt.fromString('12112800'))){

    let usdRate = getOHMUSDRate()
    total.daoBalanceUsd = total.daoBalance.times(usdRate)
    total.totalSupplyUsd = total.totalSupply.times(usdRate)
    total.marketCap = total.circulatingSupply.times(usdRate)

  }

  total.timestamp = minuteFromTimestamp(timestamp)
  total.save()

  return total as totalSupplyMinutely

}





