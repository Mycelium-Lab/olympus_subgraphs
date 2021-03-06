// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Transfer extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Transfer entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Transfer entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Transfer", id.toString(), this);
    }
  }

  static load(id: string): Transfer | null {
    return changetype<Transfer | null>(store.get("Transfer", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get from(): Bytes | null {
    let value = this.get("from");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set from(value: Bytes | null) {
    if (!value) {
      this.unset("from");
    } else {
      this.set("from", Value.fromBytes(<Bytes>value));
    }
  }

  get to(): Bytes | null {
    let value = this.get("to");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set to(value: Bytes | null) {
    if (!value) {
      this.unset("to");
    } else {
      this.set("to", Value.fromBytes(<Bytes>value));
    }
  }

  get amount(): BigDecimal | null {
    let value = this.get("amount");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigDecimal();
    }
  }

  set amount(value: BigDecimal | null) {
    if (!value) {
      this.unset("amount");
    } else {
      this.set("amount", Value.fromBigDecimal(<BigDecimal>value));
    }
  }

  get timestamp(): BigInt | null {
    let value = this.get("timestamp");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set timestamp(value: BigInt | null) {
    if (!value) {
      this.unset("timestamp");
    } else {
      this.set("timestamp", Value.fromBigInt(<BigInt>value));
    }
  }
}

export class Wallet extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Wallet entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Wallet entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Wallet", id.toString(), this);
    }
  }

  static load(id: string): Wallet | null {
    return changetype<Wallet | null>(store.get("Wallet", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): Bytes | null {
    let value = this.get("address");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set address(value: Bytes | null) {
    if (!value) {
      this.unset("address");
    } else {
      this.set("address", Value.fromBytes(<Bytes>value));
    }
  }

  get ohmBalance(): BigInt | null {
    let value = this.get("ohmBalance");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set ohmBalance(value: BigInt | null) {
    if (!value) {
      this.unset("ohmBalance");
    } else {
      this.set("ohmBalance", Value.fromBigInt(<BigInt>value));
    }
  }

  get sohmBalance(): BigInt | null {
    let value = this.get("sohmBalance");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set sohmBalance(value: BigInt | null) {
    if (!value) {
      this.unset("sohmBalance");
    } else {
      this.set("sohmBalance", Value.fromBigInt(<BigInt>value));
    }
  }

  get dailyBalance(): Array<string> {
    let value = this.get("dailyBalance");
    return value!.toStringArray();
  }

  set dailyBalance(value: Array<string>) {
    this.set("dailyBalance", Value.fromStringArray(value));
  }

  get birth(): BigInt | null {
    let value = this.get("birth");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set birth(value: BigInt | null) {
    if (!value) {
      this.unset("birth");
    } else {
      this.set("birth", Value.fromBigInt(<BigInt>value));
    }
  }
}

export class Balance extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("wallet", Value.fromString(""));
    this.set("transfer", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Balance entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Balance entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Balance", id.toString(), this);
    }
  }

  static load(id: string): Balance | null {
    return changetype<Balance | null>(store.get("Balance", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): string | null {
    let value = this.get("address");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set address(value: string | null) {
    if (!value) {
      this.unset("address");
    } else {
      this.set("address", Value.fromString(<string>value));
    }
  }

  get ohmBalance(): BigInt | null {
    let value = this.get("ohmBalance");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set ohmBalance(value: BigInt | null) {
    if (!value) {
      this.unset("ohmBalance");
    } else {
      this.set("ohmBalance", Value.fromBigInt(<BigInt>value));
    }
  }

  get sohmBalance(): BigInt | null {
    let value = this.get("sohmBalance");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set sohmBalance(value: BigInt | null) {
    if (!value) {
      this.unset("sohmBalance");
    } else {
      this.set("sohmBalance", Value.fromBigInt(<BigInt>value));
    }
  }

  get timestamp(): BigInt | null {
    let value = this.get("timestamp");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set timestamp(value: BigInt | null) {
    if (!value) {
      this.unset("timestamp");
    } else {
      this.set("timestamp", Value.fromBigInt(<BigInt>value));
    }
  }

  get wallet(): string {
    let value = this.get("wallet");
    return value!.toString();
  }

  set wallet(value: string) {
    this.set("wallet", Value.fromString(value));
  }

  get transfer(): string {
    let value = this.get("transfer");
    return value!.toString();
  }

  set transfer(value: string) {
    this.set("transfer", Value.fromString(value));
  }
}

export class Mint extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Mint entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Mint entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Mint", id.toString(), this);
    }
  }

  static load(id: string): Mint | null {
    return changetype<Mint | null>(store.get("Mint", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): Bytes | null {
    let value = this.get("address");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set address(value: Bytes | null) {
    if (!value) {
      this.unset("address");
    } else {
      this.set("address", Value.fromBytes(<Bytes>value));
    }
  }

  get value(): BigDecimal | null {
    let value = this.get("value");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigDecimal();
    }
  }

  set value(value: BigDecimal | null) {
    if (!value) {
      this.unset("value");
    } else {
      this.set("value", Value.fromBigDecimal(<BigDecimal>value));
    }
  }

  get timestamp(): BigInt | null {
    let value = this.get("timestamp");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set timestamp(value: BigInt | null) {
    if (!value) {
      this.unset("timestamp");
    } else {
      this.set("timestamp", Value.fromBigInt(<BigInt>value));
    }
  }
}

export class Burn extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Burn entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Burn entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Burn", id.toString(), this);
    }
  }

  static load(id: string): Burn | null {
    return changetype<Burn | null>(store.get("Burn", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get value(): BigInt | null {
    let value = this.get("value");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set value(value: BigInt | null) {
    if (!value) {
      this.unset("value");
    } else {
      this.set("value", Value.fromBigInt(<BigInt>value));
    }
  }
}

export class Minter extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Minter entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Minter entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Minter", id.toString(), this);
    }
  }

  static load(id: string): Minter | null {
    return changetype<Minter | null>(store.get("Minter", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): Bytes | null {
    let value = this.get("address");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set address(value: Bytes | null) {
    if (!value) {
      this.unset("address");
    } else {
      this.set("address", Value.fromBytes(<Bytes>value));
    }
  }

  get timestamp(): BigInt | null {
    let value = this.get("timestamp");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set timestamp(value: BigInt | null) {
    if (!value) {
      this.unset("timestamp");
    } else {
      this.set("timestamp", Value.fromBigInt(<BigInt>value));
    }
  }
}

export class OhmiesDaily extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("holders", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save OhmiesDaily entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save OhmiesDaily entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("OhmiesDaily", id.toString(), this);
    }
  }

  static load(id: string): OhmiesDaily | null {
    return changetype<OhmiesDaily | null>(store.get("OhmiesDaily", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get holders(): BigInt {
    let value = this.get("holders");
    return value!.toBigInt();
  }

  set holders(value: BigInt) {
    this.set("holders", Value.fromBigInt(value));
  }

  get hours(): Array<string> | null {
    let value = this.get("hours");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set hours(value: Array<string> | null) {
    if (!value) {
      this.unset("hours");
    } else {
      this.set("hours", Value.fromStringArray(<Array<string>>value));
    }
  }
}

export class OhmiesHourly extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("holders", Value.fromBigInt(BigInt.zero()));
    this.set("ohmiesDaily", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save OhmiesHourly entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save OhmiesHourly entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("OhmiesHourly", id.toString(), this);
    }
  }

  static load(id: string): OhmiesHourly | null {
    return changetype<OhmiesHourly | null>(store.get("OhmiesHourly", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get holders(): BigInt {
    let value = this.get("holders");
    return value!.toBigInt();
  }

  set holders(value: BigInt) {
    this.set("holders", Value.fromBigInt(value));
  }

  get ohmiesDaily(): string {
    let value = this.get("ohmiesDaily");
    return value!.toString();
  }

  set ohmiesDaily(value: string) {
    this.set("ohmiesDaily", Value.fromString(value));
  }

  get minutes(): Array<string> | null {
    let value = this.get("minutes");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set minutes(value: Array<string> | null) {
    if (!value) {
      this.unset("minutes");
    } else {
      this.set("minutes", Value.fromStringArray(<Array<string>>value));
    }
  }
}

export class OhmiesMinutely extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("holders", Value.fromBigInt(BigInt.zero()));
    this.set("ohmiesHourly", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save OhmiesMinutely entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save OhmiesMinutely entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("OhmiesMinutely", id.toString(), this);
    }
  }

  static load(id: string): OhmiesMinutely | null {
    return changetype<OhmiesMinutely | null>(store.get("OhmiesMinutely", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get holders(): BigInt {
    let value = this.get("holders");
    return value!.toBigInt();
  }

  set holders(value: BigInt) {
    this.set("holders", Value.fromBigInt(value));
  }

  get ohmiesHourly(): string {
    let value = this.get("ohmiesHourly");
    return value!.toString();
  }

  set ohmiesHourly(value: string) {
    this.set("ohmiesHourly", Value.fromString(value));
  }
}

export class MinuteBalance extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("ohmBalance", Value.fromBigInt(BigInt.zero()));
    this.set("hourBalance", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save MinuteBalance entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save MinuteBalance entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("MinuteBalance", id.toString(), this);
    }
  }

  static load(id: string): MinuteBalance | null {
    return changetype<MinuteBalance | null>(store.get("MinuteBalance", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get ohmBalance(): BigInt {
    let value = this.get("ohmBalance");
    return value!.toBigInt();
  }

  set ohmBalance(value: BigInt) {
    this.set("ohmBalance", Value.fromBigInt(value));
  }

  get hourBalance(): string {
    let value = this.get("hourBalance");
    return value!.toString();
  }

  set hourBalance(value: string) {
    this.set("hourBalance", Value.fromString(value));
  }

  get timestamp(): BigInt | null {
    let value = this.get("timestamp");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set timestamp(value: BigInt | null) {
    if (!value) {
      this.unset("timestamp");
    } else {
      this.set("timestamp", Value.fromBigInt(<BigInt>value));
    }
  }

  get address(): Bytes | null {
    let value = this.get("address");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set address(value: Bytes | null) {
    if (!value) {
      this.unset("address");
    } else {
      this.set("address", Value.fromBytes(<Bytes>value));
    }
  }

  get minute(): BigInt | null {
    let value = this.get("minute");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set minute(value: BigInt | null) {
    if (!value) {
      this.unset("minute");
    } else {
      this.set("minute", Value.fromBigInt(<BigInt>value));
    }
  }
}

export class HourBalance extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("dailyBalance", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save HourBalance entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save HourBalance entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("HourBalance", id.toString(), this);
    }
  }

  static load(id: string): HourBalance | null {
    return changetype<HourBalance | null>(store.get("HourBalance", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get ohmBalance(): BigInt | null {
    let value = this.get("ohmBalance");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set ohmBalance(value: BigInt | null) {
    if (!value) {
      this.unset("ohmBalance");
    } else {
      this.set("ohmBalance", Value.fromBigInt(<BigInt>value));
    }
  }

  get minuteBalance(): Array<string> | null {
    let value = this.get("minuteBalance");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set minuteBalance(value: Array<string> | null) {
    if (!value) {
      this.unset("minuteBalance");
    } else {
      this.set("minuteBalance", Value.fromStringArray(<Array<string>>value));
    }
  }

  get dailyBalance(): string {
    let value = this.get("dailyBalance");
    return value!.toString();
  }

  set dailyBalance(value: string) {
    this.set("dailyBalance", Value.fromString(value));
  }

  get timestamp(): BigInt | null {
    let value = this.get("timestamp");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set timestamp(value: BigInt | null) {
    if (!value) {
      this.unset("timestamp");
    } else {
      this.set("timestamp", Value.fromBigInt(<BigInt>value));
    }
  }

  get address(): Bytes | null {
    let value = this.get("address");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set address(value: Bytes | null) {
    if (!value) {
      this.unset("address");
    } else {
      this.set("address", Value.fromBytes(<Bytes>value));
    }
  }

  get hour(): BigInt | null {
    let value = this.get("hour");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set hour(value: BigInt | null) {
    if (!value) {
      this.unset("hour");
    } else {
      this.set("hour", Value.fromBigInt(<BigInt>value));
    }
  }
}

export class DailyBalance extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("wallet", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save DailyBalance entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save DailyBalance entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("DailyBalance", id.toString(), this);
    }
  }

  static load(id: string): DailyBalance | null {
    return changetype<DailyBalance | null>(store.get("DailyBalance", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get ohmBalance(): BigInt | null {
    let value = this.get("ohmBalance");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set ohmBalance(value: BigInt | null) {
    if (!value) {
      this.unset("ohmBalance");
    } else {
      this.set("ohmBalance", Value.fromBigInt(<BigInt>value));
    }
  }

  get hourBalance(): Array<string> | null {
    let value = this.get("hourBalance");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set hourBalance(value: Array<string> | null) {
    if (!value) {
      this.unset("hourBalance");
    } else {
      this.set("hourBalance", Value.fromStringArray(<Array<string>>value));
    }
  }

  get wallet(): string {
    let value = this.get("wallet");
    return value!.toString();
  }

  set wallet(value: string) {
    this.set("wallet", Value.fromString(value));
  }

  get timestamp(): BigInt | null {
    let value = this.get("timestamp");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set timestamp(value: BigInt | null) {
    if (!value) {
      this.unset("timestamp");
    } else {
      this.set("timestamp", Value.fromBigInt(<BigInt>value));
    }
  }

  get address(): Bytes | null {
    let value = this.get("address");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set address(value: Bytes | null) {
    if (!value) {
      this.unset("address");
    } else {
      this.set("address", Value.fromBytes(<Bytes>value));
    }
  }

  get day(): BigInt | null {
    let value = this.get("day");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set day(value: BigInt | null) {
    if (!value) {
      this.unset("day");
    } else {
      this.set("day", Value.fromBigInt(<BigInt>value));
    }
  }
}
