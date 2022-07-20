import './Pagination.css'
import {getQueryProperty} from '../../methods/getQueryProperty'

function Pagination(props) {
  return (
    <div className="pagination row">
      <div onClick={handlerButtonPrevPage} className="pagination-prev-page col">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"/>
        </svg>
      </div>
      <div className="pagination-current-page col">{props.currentPage}</div>
      <div onClick={handlerButtonNextPage} className="pagination-next-page col">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"/>
        </svg>
      </div>
    </div>
  )

  function moveToPage(pageNumber){
    props.handleChange(pageNumber)
    const listLimit = getQueryProperty('limit', 3)
    window.history.pushState({}, "", `?page=${pageNumber}&limit=${listLimit}`)
  }

  function handlerButtonPrevPage(){
    moveToPage(props.currentPage - 1)
  }

  function handlerButtonNextPage(){
    moveToPage(props.currentPage + 1)
  }
}

export default Pagination
