import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as HomeActions from '../actions/HomeActions';
import IconButton from 'material-ui/lib/icon-button';
import Paper from 'material-ui/lib/paper';
import Divider from 'material-ui/lib/divider';

import Drink from './Drink'


class DrinkSelection extends Component {

  render() {
    const {dispatch} = this.props;
    const actions = bindActionCreators(HomeActions, dispatch);
    const styles = {
      paper: {
        margin: '30px 0',
        padding: '10px 20px'
      },
      divider: {
        marginTop: '10px',
        marginBottom: '10px'
      }
    }

    const drinks = [
      {
        name: 'Beer',
        ac: 5,
        sizeOZ: 12,
        sizeML: 341
      },
      {
        name: 'Wine',
        ac: 13,
        sizeOZ: 5,
        sizeML: 148
      },
      {
        name: 'Liquor/Spirit',
        ac: 40,
        sizeOZ: 1.5,
        sizeML: 44
      }
    ]

    return (
      <Paper zDepth={1} style={ styles.paper }>
        { drinks.map((drink, index) => {
          if (index + 1 < drinks.length) {
            return [<Drink key={ drink.name } {...drink} />, <Divider style={ styles.divider } />]
          }
          return <Drink key={ drink.name } {...drink} />
        })}
      </Paper>
    );
  }
}

export default connect(state => state.Sample)(DrinkSelection)
