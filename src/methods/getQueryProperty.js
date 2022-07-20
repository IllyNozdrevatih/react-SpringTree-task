import {getQueryObj} from './getQueryObj'

export function getQueryProperty(property, defaultLimit){
  const queryObj = getQueryObj()
  if (queryObj.hasOwnProperty(property) === false) return defaultLimit
  return queryObj[property]
}
