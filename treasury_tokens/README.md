# Subgraph for Tracking Major Tokens Owned by OlympusDAO Treasury Contract 

## Tracks
Track Treasury balances for the following token
1. WETH
2. DAI
3. LUSD
4.  FRAX
## Deployment

1. Run the `yarn build` command to build the subgraph, and check compilation errors before deploying.

2. Run `graph auth --product hosted-service <ACCESS_TOKEN>`

3. Deploy via `graph deploy --product hosted-service <GITHUB_USER>/<SUBGRAPH NAME>`. 

## Entity nesting
We use nesting of entities, since this allows us to bypass the limitation of the `first` command by 1000 elements and this allows us to get all the necessary data from the subgaph in one request.

## hosted 
`https://api.thegraph.com/subgraphs/id/QmYLp4WZKRnoLKy38xZodn1WNRaZVBoMJwWA6mZ34w4eQo`
