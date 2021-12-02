 <h1>OHM (Wallet Analytics)</h1>

## API url

https://api.thegraph.com/subgraphs/name/deltax2016/olympus-wallets

## Tracks

- Transfers
- Mints/Burns
- Wallet activations

(OHM Stats for Wallet Analytics)


## Main Entities

### Wallets

Info about wallet balances:
- id - entity ID
- address - wallet address
- ohmBalance - ohm balance (now)
- dailyBalance - array of daily balances of this wallet
- birth - wallet activation timestamp

```graphql
type Wallet @entity {
  id: ID!
  address: Bytes
  ohmBalance: BigInt
  dailyBalance: [DailyBalance!]! @derivedFrom(field: "wallet")
  birth: BigInt
}
```

### Mints / Burns

Info about mints / burns:
- id - entity id
- address - address of the recipient
- value - how many tokens mined / burned
- timestamp - timestamp of Mint event

```graphql
type Mint @entity {

  id: ID!
  address: Bytes
  value: BigDecimal
  timestamp: BigInt

}

type Burn @entity {

  id: ID!
  value: BigInt

}
```

### Transfers

Info about transfers:
- id - entity id
- from - address of the recipient
- to - address of the sender
- amount - how many tokens transfered
- timestamp - timestamp of Transfer event

```graphql
type Transfer @entity {

  id: ID!
  from: Bytes
  to: Bytes
  amount: BigDecimal
  timestamp: BigInt

}
```

### Minter

Info about OHM minter role changes:
- id - entity id
- address - address of new miner 
- timestamp - timestamp of setVault call

```graphql
type Minter @entity {

  id: ID!
  address: Bytes
  timestamp: BigInt

}
```

## Query Example (python)

```python
from gql import gql, Client
from gql.transport.aiohttp import AIOHTTPTransport

# Select your transport with a defined url endpoint
transport = AIOHTTPTransport(url="https://api.thegraph.com/subgraphs/name/deltax2016/olympus-wallets")

# Create a GraphQL client using the defined transport
client = Client(transport=transport, fetch_schema_from_transport=True)

# Provide a GraphQL query
query = gql(
    """
    query getWallets {
      wallets(first: 5) {
	    id
	    address
	    ohmBalance
	    dailyBalance {
	      id
	    }
	  }
    }
"""
)

# Execute the query on the transport
result = client.execute(query)
print(result)
```


