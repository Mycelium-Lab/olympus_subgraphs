import { Address, BigDecimal, BigInt, log, Bytes } from '@graphprotocol/graph-ts'
import { Balance, Wallet, DailyBalance, HourBalance, MinuteBalance } from '../../generated/schema'
import {SOHM_ERC20_CONTRACT, OHM_ERC20_CONTRACT, SUSHI_OHMDAI_PAIR} from './Constants'
import {
  wOHM
} from "../../generated/wOHM/wOHM"

import { toDecimal, getNumberDayFromDate, getOHMUSDRate, minuteFromTimestamp, hourFromTimestamp, dayFromTimestamp} from './utils'
import { updateDailyOhmies } from './holders'


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

  entity.wallet = address.toHex()
  entity.ohmBalance = ohmContract.balanceOf(Address.fromString(address.toHex()))
  entity.timestamp = dayFromTimestamp(timestamp)
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
  entity.timestamp = hourFromTimestamp(timestamp)
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
  entity.timestamp = minuteFromTimestamp(timestamp)
  entity.address = address
  entity.minute = BigInt.fromI32(date.getUTCMinutes())
  entity.save()

  return entity as MinuteBalance

}


export function createWallet(address: Bytes, timestamp: BigInt, id: Bytes): void {

  let entity = Wallet.load(address.toHex())

  if (!entity) {
    entity = new Wallet(address.toHex())
    entity.birth = timestamp
    updateDailyOhmies(timestamp)
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



