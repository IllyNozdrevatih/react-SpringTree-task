import qs from "qs";

export function getQueryObj(){
  const url = new URL(window.location)
  const queryObj = qs.parse(url.search.substring(1))

  return queryObj
}
