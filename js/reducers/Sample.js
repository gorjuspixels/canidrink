import * as ActionTypes from '../constants/ActionTypes';

const defaultTitle = 'Can I drive yet?'
let defaultState = {
  title: defaultTitle,
  bac: 0,
  profiles: [],
  showForm: true
};

export default function(state = defaultState, action) {
  let profiles = []
  switch (action.type) {
    case ActionTypes.TITLE_CHANGED:
      return {...state, title: action.text};
    case ActionTypes.PROFILE_CREATED:
      profiles = [...state.profiles, action.profile];
      state = {...state, profiles};
      return {...state, showForm: false};
    case ActionTypes.SHOW_FORM:
      return {...state, showForm: true};
    case ActionTypes.SAVE_DRINKS:
      action.profile.drinks = action.drinks
      let foundIndex
      state.profiles.forEach( (profile, index) => foundIndex = profile.name === action.profile.name ? index : undefined )
      profiles = [...state.profiles]

      if (foundIndex != undefined) {
        profiles[foundIndex] = action.profile
      } else {
        profiles = [...profiles, action.profile]
      }
      return {...state, profiles}
    default:
      return state;
  }
}
