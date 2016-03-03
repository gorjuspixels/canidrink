import React, {Component} from 'react';
import IconButton from 'material-ui/lib/icon-button';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';


class Drink extends Component {

  handleChange = () => {};

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
    const numbers = []
    for (let i=0; i<21; i++) {
      numbers.push(<MenuItem value={i+1} primaryText={ i }/>)
    }

    return (
      <div style={ styles.flexContainer }>
        <div>
          <div style={ styles.name }>{ name }</div>
          <div style={ styles.text }>{ `${ac}% alcohol concentraction` }</div>
          <div style={ styles.text }>{ `${sizeOZ}oz / ${sizeML}ml` }</div>
        </div>

        <SelectField value={1} onChange={this.handleChange}
          floatingLabelText="# of drinks">
          { numbers }
        </SelectField>
      </div>
    );
  }
}

export default Drink
