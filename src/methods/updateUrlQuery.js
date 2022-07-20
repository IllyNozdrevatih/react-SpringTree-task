export function updateUrlQuery({pageNumber, listLimit, listOrder}){
  window.history.pushState(
    {},
    "",
    `?page=${pageNumber}&limit=${listLimit}&order=${listOrder}`
  )
}
