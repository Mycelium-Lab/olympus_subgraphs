import { Address, BigDecimal, BigInt, log, Bytes } from '@graphprotocol/graph-ts'
import { OhmiesDaily, OhmiesHourly, OhmiesMinutely } from '../../generated/schema'

import { minuteFromTimestamp, hourFromTimestamp, dayFromTimestamp, getNumberDayFromDate } from './utils'


export function updateDailyOhmies(timestamp: BigInt): void {

	let number:i64 =Number.parseInt(timestamp.toString(),10) as i64;
  	number*=1000;
  	const date: Date = new Date( number );

	let entity = OhmiesDaily.load(`${date.getUTCFullYear()}-${getNumberDayFromDate(date)}`)

	if (!entity) {

		entity = new OhmiesDaily(`${date.getUTCFullYear()}-${getNumberDayFromDate(date)}`)
		entity.holders = BigInt.fromI32(0)

	}

	entity.holders = entity.holders + BigInt.fromI32(1)
	entity.timestamp = dayFromTimestamp(timestamp)
	entity.save()

	updateHourlyOhmies(timestamp)

}

export function updateHourlyOhmies(timestamp: BigInt): void {

	let number:i64 =Number.parseInt(timestamp.toString(),10) as i64;
  	number*=1000;
  	const date: Date = new Date( number );

	let entity = OhmiesHourly.load(`${date.getUTCFullYear()}-${getNumberDayFromDate(date)}-${date.getUTCHours()}`)

	if (!entity) {

		entity = new OhmiesHourly(`${date.getUTCFullYear()}-${getNumberDayFromDate(date)}-${date.getUTCHours()}`)
		entity.holders = BigInt.fromI32(0)

	}

	entity.ohmiesDaily = `${date.getUTCFullYear()}-${getNumberDayFromDate(date)}`
	entity.holders = entity.holders + BigInt.fromI32(1)
	entity.timestamp = hourFromTimestamp(timestamp)
	entity.save()

	updateMinutelyOhmies(timestamp)

}

export function updateMinutelyOhmies(timestamp: BigInt): void {

	let number:i64 =Number.parseInt(timestamp.toString(),10) as i64;
  	number*=1000;
  	const date: Date = new Date( number );

	let entity = OhmiesMinutely.load(`${date.getUTCFullYear()}-${getNumberDayFromDate(date)}-${date.getUTCHours()}-${date.getUTCMinutes()}`)

	if (!entity) {

		entity = new OhmiesMinutely(`${date.getUTCFullYear()}-${getNumberDayFromDate(date)}-${date.getUTCHours()}-${date.getUTCMinutes()}`)
		entity.holders = BigInt.fromI32(0)

	}

	entity.ohmiesHourly = `${date.getUTCFullYear()}-${getNumberDayFromDate(date)}-${date.getUTCHours()}`
	entity.holders = entity.holders + BigInt.fromI32(1)
	entity.timestamp = hourFromTimestamp(timestamp)
	entity.save()

}
