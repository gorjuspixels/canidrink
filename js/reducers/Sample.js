import * as ActionTypes from '../constants/ActionTypes';

const defaultTitle = 'Can I drive yet?'
let defaultState = {
  title: defaultTitle,
  bac: 0,
  profiles: [],
  showForm: true,
  selectedProfile: undefined
};

export default function(state = defaultState, action) {
  let profiles = []
  let foundIndex = undefined
  let cachedProfile = undefined

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
      state.profiles.forEach( (profile, index) => foundIndex = profile.name === action.profile.name ? index : undefined )
      profiles = [...state.profiles]

      if (foundIndex == undefined) return state

      cachedProfile = profiles[foundIndex]
      for (let prop in action.drinks) {
        if (!action.drinks.hasOwnProperty(prop)) continue
        cachedProfile.drinks[prop] = action.drinks[prop]
      }

      profiles[foundIndex] = cachedProfile

      return {...state, profiles}
    case ActionTypes.PROFILE_UPDATED:
      state.profiles.forEach( (profile, index) => foundIndex = profile.name === action.profile.name ? index : undefined )
      if (foundIndex == undefined) return state

      profiles = [...state.profiles]
      cachedProfile = profiles[foundIndex]

      for (let prop in action.profile) {
        if (!action.profile.hasOwnProperty(prop)) continue
        cachedProfile[prop] = action.profile[prop]
      }
      profiles[foundIndex] = cachedProfile
      return {...state, profiles}
    case ActionTypes.SELECTED_PROFILE:
      if (!action.profile) return {...state, selectedProfile: undefined}

      state.profiles.forEach( (profile, index) => foundIndex = profile.name === action.profile.name ? index : undefined )
      return {...state, selectedProfile: foundIndex};
    default:
      return state;
  }
}
