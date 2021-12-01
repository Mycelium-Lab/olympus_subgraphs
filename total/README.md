 <h1>OHM Wallets</h1>

## API url

https://api.thegraph.com/subgraphs/name/deltax2016/olympus-wallets

## Tracks

- Total supply changes


## Main Entities



### totalSupplyDaily

Info about amount of supply and number of OHM holders:
- id - entity id
- totalWallets - number of holders
- totalSupply - total ohm balance
- totalSupplyUsd - total supply in usd
- circulatingSupply - total supply without dao balance
- marketCap - circulating supply in usd
- daoBalance - ohm balance of dao
- daoBalanceUsd - usd balance of dao
- timestamp - timestamp last mint / burn event

```graphql
type totalSupply @entity {

	id: ID!
	totalWallets: BigInt!
	totalSupply: BigDecimal!
	totalSupplyUsd: BigDecimal!
	circulatingSupply: BigDecimal!
	marketCap: BigDecimal!
	daoBalance: BigDecimal!
	daoBalanceUsd: BigDecimal!
	timestamp: BigInt
	hours: [totalSupplyHourly!]

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

