import React, { Component } from 'react'
import {connect} from 'react-redux';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import Paper from 'material-ui/lib/paper';
import Profile from './Profile';
import * as HomeActions from '../actions/HomeActions';
import {bindActionCreators} from 'redux';
import Divider from 'material-ui/lib/divider';

class Main extends Component {

  renderPlaceholder() {
    return(
      <div>
        <div style={{ textAlign: 'center', fontSize: '18px', margin: '10px 0 20px' }}>Start by creating a profile</div>
        <Profile dispatch={ this.props.dispatch } />
      </div>
    )
  }

  render() {
    const styles = {
      floatingButton: {
        position: 'absolute',
        bottom: '5%',
        right: '25%'
      },
      paper: {
        margin: '30px 0',
        padding: '10px 20px'
      }
    }

    let profiles = []
    const {showForm, dispatch} = this.props;
    const actions = bindActionCreators(HomeActions, dispatch);

    this.props.profiles.forEach(
      (profile, index) => {
        profiles.push(<Profile key={ index } dispatch={ dispatch } profile={ profile } />)

        if (this.props.profiles.length > index + 1)
          profiles.push(<Divider style={{ marginTop: '10px', marginBottom: '10px' }} />)
      }
    )

    return(
      <div>
        { profiles.length > 0 &&
          <Paper zDepth={1} style={ styles.paper }>
            { profiles }
          </Paper>
        }

        { (this.props.profiles.length === 0 || showForm) &&
          <Paper zDepth={1} style={ styles.paper }>
            { this.renderPlaceholder() }
          </Paper>
        }

        <FloatingActionButton style={ styles.floatingButton } onClick={ () => actions.showForm() }>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}

export default connect(state => state.Sample)(Main)
