import React, { Component } from 'react'
import TextField from 'material-ui/lib/text-field';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import ClearFix from 'material-ui/lib/clearfix';
import { createProfile, updateProfile, changeTitle, selectProfile } from '../actions/HomeActions';
import IconButton from 'material-ui/lib/icon-button';
import Colors from 'material-ui/lib/styles/colors';

class Profile extends Component {

  state = {
    gender: undefined,
    bacLimit: 3
  };

  handleGenderChange = (event, index, gender) => this.setState({gender});
  handleBACChange = (event, index, bacLimit) => this.setState({bacLimit});
  handleHoursChange = () => this.props.dispatch(updateProfile({ name: this.props.profile.name, hours: this.refs.hours.getValue() }));
  createProfile = () => {
    let name = this.refs.name.getValue()
    let weight = parseInt(this.refs.weight.getValue())
    let hours = parseInt(this.refs.hours.getValue())
    let gender = this.state.gender
    let bacLimit = this.state.bacLimit
    let drinks = {
      beer: 0,
      wine: 0,
      spirit: 0
    }

    this.props.dispatch(createProfile({
      name, weight, gender, bacLimit, drinks, hours
    }))
  };

  renderForm = () => {
    return (
      <div>
        <TextField ref="name" hintText="Name" fullWidth={true} />
        <TextField ref="weight" hintText="Weight in pounds" fullWidth={true} />
        <TextField ref="hours" hintText="Amount of hours you've been drinking for" fullWidth={true} />
        <SelectField value={ this.state.gender } onChange={this.handleGenderChange}
          floatingLabelText="Select gender" fullWidth={true}>
          <MenuItem value={1} primaryText="Female"/>
          <MenuItem value={2} primaryText="Male"/>
        </SelectField>
        <SelectField value={ this.state.bacLimit } onChange={this.handleBACChange}
          floatingLabelText="Select BAC limit in your region" fullWidth={true}>
          <MenuItem value={1} primaryText="0.02%"/>
          <MenuItem value={2} primaryText="0.05%"/>
          <MenuItem value={3} primaryText="0.08%"/>
        </SelectField>

        <ClearFix>
          <RaisedButton style={{ float: 'right' }} label="Save" secondary={true}
            onClick={this.createProfile}/>
        </ClearFix>
      </div>
    )
  };

  renderProfile = () => {
    const { name, weight, gender, bacLimit, hours } = this.props.profile
    const { dispatch } = this.props
    const genders = ['female', 'male']
    const bacLimits = ['0.02%', '0.05%', '0.08%']
    const currentBAC = this.calculateBAC()

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

    return (
      <div style={ styles.flexContainer }>
        <div>
          <div style={ styles.name }>{ name }</div>
          <div style={ styles.text }>{ `${weight} lbs, ${genders[gender - 1]}` }</div>
          <div style={ styles.text }>{ `${bacLimits[bacLimit - 1]} legal limit` }</div>
          <TextField ref="hours" defaultValue={ hours } floatingLabelText="hours drinking" hintText="# of hours of drinking"
            onChange={ this.handleHoursChange } />
        </div>
        <div style={{ paddingTop: '10px' }}>
          <div style={{
            display: 'inline-block',
            verticalAlign: 'middle',
            color: Colors[this.getBACStyle(currentBAC)]
          }}>{ currentBAC + '%' }</div>
          <IconButton
            style={{ display: 'inline-block', verticalAlign: 'middle' }}
            iconClassName="material-icons"
            onClick={ () => {dispatch(selectProfile(this.props.profile)); dispatch(changeTitle(`${name}'s Drinks`)) }}>keyboard_arrow_right</IconButton>
        </div>
      </div>
    )
  };

  getBACStyle(bac) {
    if (!bac || bac < 0.05) return 'green500'
    if (bac < 0.08) return 'yellow500'
    return 'red500'
  }

  calculateBAC() {
    const { gender, weight, drinks, hours } = this.props.profile
    const genders = ['female', 'male']
    const numStandard = drinks.beer + drinks.wine + drinks.spirit
    const GRAMS_IN_POUND = 453.592
    const STANDARD_DRINK_GRAMS = 13.5
    const gramWeight = weight * GRAMS_IN_POUND
    const gramDrink = numStandard * STANDARD_DRINK_GRAMS

    const GENDER_CONSTANT = {
      male: 0.68,
      female: 0.55
    }

    const bac = (gramDrink / (gramWeight * GENDER_CONSTANT[genders[gender-1]])) * 100 - (hours * 0.015)
    if (bac < 0) return (0).toFixed(2)

    return bac.toFixed(2)
  }

  render() {
    if (!this.props.profile) return this.renderForm()
    return this.renderProfile()
  }
}

export default Profile
