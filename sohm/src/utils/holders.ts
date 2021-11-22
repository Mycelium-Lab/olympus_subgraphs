import { Address, BigDecimal, BigInt, log, Bytes } from '@graphprotocol/graph-ts'
import { SohmiesDaily, SohmiesHourly, SohmiesMinutely } from '../../generated/schema'

import { minuteFromTimestamp, hourFromTimestamp, dayFromTimestamp, getNumberDayFromDate } from './utils'


export function updateDailySohmies(timestamp: BigInt): void {

	let number:i64 =Number.parseInt(timestamp.toString(),10) as i64;
  	number*=1000;
  	const date: Date = new Date( number );

	let entity = SohmiesDaily.load(`${date.getUTCFullYear()}-${getNumberDayFromDate(date)}`)

	if (!entity) {

		entity = new SohmiesDaily(`${date.getUTCFullYear()}-${getNumberDayFromDate(date)}`)
		entity.holders = BigInt.fromI32(0)

	}

	entity.holders = entity.holders + BigInt.fromI32(1)
	entity.timestamp = dayFromTimestamp(timestamp)
	entity.save()

	updateHourlySohmies(timestamp)

}

export function updateHourlySohmies(timestamp: BigInt): void {

	let number:i64 =Number.parseInt(timestamp.toString(),10) as i64;
  	number*=1000;
  	const date: Date = new Date( number );

	let entity = SohmiesHourly.load(`${date.getUTCFullYear()}-${getNumberDayFromDate(date)}-${date.getUTCHours()}`)

	if (!entity) {

		entity = new SohmiesHourly(`${date.getUTCFullYear()}-${getNumberDayFromDate(date)}-${date.getUTCHours()}`)
		entity.holders = BigInt.fromI32(0)

	}

	entity.sohmiesDaily = `${date.getUTCFullYear()}-${getNumberDayFromDate(date)}`
	entity.holders = entity.holders + BigInt.fromI32(1)
	entity.timestamp = hourFromTimestamp(timestamp)
	entity.save()

	updateMinutelySohmies(timestamp)

}

export function updateMinutelySohmies(timestamp: BigInt): void {

	let number:i64 =Number.parseInt(timestamp.toString(),10) as i64;
  	number*=1000;
  	const date: Date = new Date( number );

	let entity = SohmiesMinutely.load(`${date.getUTCFullYear()}-${getNumberDayFromDate(date)}-${date.getUTCHours()}-${date.getUTCMinutes()}`)

	if (!entity) {

		entity = new SohmiesMinutely(`${date.getUTCFullYear()}-${getNumberDayFromDate(date)}-${date.getUTCHours()}-${date.getUTCMinutes()}`)
		entity.holders = BigInt.fromI32(0)

	}

	entity.sohmiesHourly = `${date.getUTCFullYear()}-${getNumberDayFromDate(date)}-${date.getUTCHours()}`
	entity.holders = entity.holders + BigInt.fromI32(1)
	entity.timestamp = hourFromTimestamp(timestamp)
	entity.save()

}
