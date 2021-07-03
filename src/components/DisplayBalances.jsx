import React from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import DisplayBalance from './DisplayBalance';

function DisplayBalances({ incomeTotal, expenseTotal }) {
  return (
    <Segment textAlign='center'>
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <DisplayBalance
              title='Income'
              value={incomeTotal}
              color='green'
              size='tiny'
            />
          </Grid.Column>
          <Grid.Column>
            <DisplayBalance
              title='Expenses'
              value={expenseTotal}
              color='red'
              size='tiny'
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}

export default DisplayBalances;
