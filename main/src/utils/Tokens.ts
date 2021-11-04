import {Token} from "../../generated/schema"
import { BigInt, Bytes } from "@graphprotocol/graph-ts"

export function loadOrCreateToken(name: string): Token{
    let token = Token.load(name)
    if (token == null) {
        token = new Token(name)
        token.save()
    }
    return token as Token
}
