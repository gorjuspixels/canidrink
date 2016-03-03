import {TITLE_CHANGED, PROFILE_CREATED, SHOW_FORM, SAVE_DRINKS, PROFILE_UPDATED, SELECTED_PROFILE,GOT_USER_COUNT} from '../constants/ActionTypes';

import engine from 'engine.io-client'
const websocket = engine('ws://localhost:5000');
websocket.on('open', function(socket){
  websocket.on('message', function(data){
    var json = JSON.parse(data)
    switch(json.method) {
      case 'gotUserCount': return _dispatch(gotUserCount(json.data))
    }
  });
  websocket.on('close', function(){});
});

let _dispatch

const changeTitle = text => ({
  type: TITLE_CHANGED,
  text
})

const createProfile = profile => {
  // TODO: server side to create profile

  return {
    type: PROFILE_CREATED,
    profile
  }
}

const updateProfile = profile => {
  // TODO: server side to update profile

  return {
    type: PROFILE_UPDATED,
    profile
  }
}

const saveDrinks = (profile, drinks) => {
  // TODO: server side to save drinks

  return {
    type: SAVE_DRINKS,
    profile,
    drinks
  }
}

const showForm = () => ({
  type: SHOW_FORM
})

const selectProfile = profile => ({
  type: SELECTED_PROFILE,
  profile
})

const getUserCount = () => {
  return dispatch => {
    _dispatch = dispatch
    websocket.send(JSON.stringify({
      method: 'getUserCount'
    }))
  }
}

const gotUserCount = count => {
  return {
    type: GOT_USER_COUNT,
    count
  }
}

export {createProfile, showForm, changeTitle, updateProfile, selectProfile, saveDrinks, getUserCount}
