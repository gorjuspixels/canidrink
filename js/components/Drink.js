import React, {Component} from 'react';
import IconButton from 'material-ui/lib/icon-button';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import { saveDrinks } from '../actions/HomeActions'

class Drink extends Component {

  handleChange = (event, drinkCount) => {
    const { dispatch, profile, name } = this.props
    let drinks = {}
    drinks[this.props.name.toLowerCase().replace('liquor/', '')] = drinkCount

    dispatch(saveDrinks(this.props.profile, drinks));
  }

  render() {
    const styles = {
      name: {
        fontSize: '18px',
        marginBottom: '5px',
        fontWeight: 'bold'
      },
      text: {
        color: '#9A9A9A'
      },
      flexContainer: {
        display: 'flex',
        justifyContent: 'space-between'
      }
    }

    const { name, ac, sizeOZ, sizeML } = this.props
    const { drinks } = this.props.profile
    const numbers = []
    for (let i=0; i<21; i++) {
      numbers.push(<MenuItem value={i} primaryText={ i }/>)
    }

    return (
      <div style={ styles.flexContainer }>
        <div>
          <div style={ styles.name }>{ name }</div>
          <div style={ styles.text }>{ `${ac}% alcohol concentraction` }</div>
          <div style={ styles.text }>{ `${sizeOZ}oz / ${sizeML}ml` }</div>
        </div>

        <SelectField value={ drinks[name.toLowerCase().replace('liquor/', '')] } onChange={this.handleChange}
          floatingLabelText="# of drinks">
          { numbers }
        </SelectField>
      </div>
    );
  }
}

export default Drink
