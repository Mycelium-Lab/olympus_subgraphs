import { Address, BigDecimal, BigInt, log, Bytes } from '@graphprotocol/graph-ts'
import {
  Transfer,
  LogRebase
} from "../generated/sOHM2/sOHM2"
//import { ExampleEntity } from "../generated/schema"
import { LogRebase as LogRebaseEvent, Transfer as TransferOHM } from '../generated/schema'
import { LogRebaseDaily, LogRebaseHourly, LogRebaseMinute } from '../generated/schema'
import { createWallet, createTotals } from './utils/wallets'


export function handleTransfer(event: Transfer): void {

  let entity = TransferOHM.load(event.transaction.hash.toHex())
  createWallet(event.params.to, event.block.timestamp, event.transaction.hash,event.block.number)
  createWallet(event.params.from, event.block.timestamp, event.transaction.hash, event.block.number)

  if (!entity) {
    entity = new TransferOHM(event.transaction.hash.toHex())
  }

  entity.from = event.params.from
  entity.to = event.params.to
  entity.amount = toDecimal(event.params.value, 9)
  entity.timestamp = event.block.timestamp
  entity.save()

}

export function handleLogRebase(event: LogRebase): void {

  let entity = LogRebaseEvent.load(event.block.timestamp.toString())

  if (!entity) {
    entity = new LogRebaseEvent(event.block.timestamp.toString())
  }

  entity.timestamp = event.block.timestamp
  entity.epoch = event.params.epoch
  entity.rebase = event.params.rebase
  entity.index = event.params.index
  entity.save()

  rebaseDaily(event)
}


function rebaseDaily(event: LogRebase): void {

  let thisTimestamp = dayFromTimestamp(event.block.timestamp)

  let entity = LogRebaseDaily.load(thisTimestamp.toString())

  if (!entity) {
    entity = new LogRebaseDaily(thisTimestamp.toString())
  }

  entity.timestamp = thisTimestamp
  entity.epoch = event.params.epoch
  entity.rebase = event.params.rebase
  entity.index = event.params.index
  entity.save()

  rebaseHourly(event, thisTimestamp)

}


function rebaseHourly(event: LogRebase, day_ts: String): void {

  let thisTimestamp = hourFromTimestamp(event.block.timestamp)

  let entity = LogRebaseHourly.load(`${day_ts}-${thisTimestamp}`)

  if (!entity) {
    entity = new LogRebaseHourly(`${day_ts}-${thisTimestamp}`)
  }

  
  entity.timestamp = thisTimestamp
  entity.epoch = event.params.epoch
  entity.rebase = event.params.rebase
  entity.index = event.params.index
  entity.logRebaseDaily = day_ts
  entity.save()

  rebaseMinutely(event, day_ts, thisTimestamp)

}

function rebaseMinutely(event: LogRebase, day_ts: String, minute_ts: String): void {

  let entity = LogRebaseMinute.load(`${day_ts}-${minute_ts}-${event.block.timestamp}`)

  if (!entity) {
    entity = new LogRebaseMinute(`${day_ts}-${minute_ts}-${event.block.timestamp}`)
  }

  entity.timestamp = minuteFromTimestamp(event.block.timestamp)
  entity.epoch = event.params.epoch
  entity.rebase = event.params.rebase
  entity.index = event.params.index
  entity.logRebaseHourly = `${day_ts}-${minute_ts}`
  entity.save()

}


export function minuteFromTimestamp(timestamp: BigInt): string {
    let day_ts = timestamp.toI32() - (timestamp.toI32() % 60)
    return day_ts.toString()
}

export function hourFromTimestamp(timestamp: BigInt): string {
    let day_ts = timestamp.toI32() - (timestamp.toI32() % 3600)
    return day_ts.toString()
}

export function dayFromTimestamp(timestamp: BigInt): string {
    let day_ts = timestamp.toI32() - (timestamp.toI32() % 86400)
    return day_ts.toString()
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
