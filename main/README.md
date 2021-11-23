# Main

This subgraph dynamically tracks:

- stakes,
- deposits,
- rebases

## Deployment

1. Run the `yarn build` command to build the subgraph, and check compilation errors before deploying.

2. Run `graph auth --product hosted-service <ACCESS_TOKEN>`

3. Deploy via `graph deploy --product hosted-service <GITHUB_USER>/<SUBGRAPH NAME>`. 

## Key Entity Overviews

#### Entity nesting
We use nesting of entities, since this allows us to bypass the limitation of the `first` command by 1000 elements and this allows us to get all the necessary data from the subgaph in one request.

#### DepositYearEntity, DepositDayEntity, DepositMinuteEntity

This entities tracks deposits and redeems for const list of tokens.

#### StakeYearEntity, DepositDayEntity, DepositMinuteEntity

This entities tracks stakes and unstakes.

#### RebaseYear, RebaseDay

This entities tracks rebases for APY calculation.
