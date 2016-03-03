import {TITLE_CHANGED, PROFILE_CREATED, SHOW_FORM, SAVE_DRINKS} from '../constants/ActionTypes';

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

export {createProfile, showForm, changeTitle}
