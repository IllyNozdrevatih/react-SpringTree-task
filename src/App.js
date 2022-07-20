import React, {useEffect, useState, useRef} from 'react'
import './App.css'
import CatCard from './components/cat-card/CatCard'
import Pagination from './components/pagination/Pagination'
import {http} from './plugins/http'
import {updateUrlQuery} from "./methods/updateUrlQuery";
import {getQueryProperty} from "./methods/getQueryProperty";

function App() {
  const mounted = useRef(false);
  const selectLimitRef = useRef()
  const selectOrderRef = useRef()

  const [catsList, setCatsList] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [listLimit, setListLimit] = useState(3);
  const [listOrder, setListOrder] = useState('Desc');

  // Fetch request on load page one time
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;

      (async function init() {
        const pageNumber = getQueryProperty('page', 0)
        const limit = getQueryProperty('limit', 3)
        const order = getQueryProperty('order', 'Desc')

        await fetchCats({pageNumber, limit, order}, false)

        setPageNumber(Number(pageNumber))
        setListLimit(Number(limit))
        setListOrder(String(order))

        initSelectLimitValue(limit)
        initSelectOrderValue(order)
      })();
    }
  }, []);
  return (
    <div className="App container">
      <h1>SpringTree task</h1>
      <form className="form-wrap">
        <select
          className="form-select"
          onChange={handlerLimitSelect}
          ref={selectLimitRef}
        >
          <option>3</option>
          <option>6</option>
          <option>9</option>
        </select>
        <select
            className="form-select"
            onChange={handlerOrderSelect}
            ref={selectOrderRef}
        >
          <option>Rand</option>
          <option>Desc</option>
          <option>Asc</option>
        </select>
      </form>
      <main>
        <div className="row center">
          {catsList.map(catItem => {
            return <CatCard key={catItem.id} catItem={catItem}/>
          })}
        </div>
        <div className="center">
          <Pagination handleChange={handleChangePagination} currentPage={pageNumber} />
        </div>
      </main>
    </div>
  );

  async function fetchCats({pageNumber, limit, order}, updateUrl = true) {
    try {
      const { data } = await http.get(
          `/search?limit=${limit}&page=${pageNumber}&order=${order}`
      );
      setCatsList(data)
      if (updateUrl === false) return
      updateUrlQuery({pageNumber, listLimit: limit, listOrder: order})
    } catch (e) {
      console.log(e);
    }
  }

  function initSelectLimitValue(limitValue){
    const {current} = selectLimitRef
    current.value = limitValue
  }

  function initSelectOrderValue(orderValue){
    const {current} = selectOrderRef
    current.value = orderValue
  }

  async function handleChangePagination(pageNumber){
    setPageNumber(pageNumber)
    await fetchCats({pageNumber, limit: listLimit, order: listOrder})
  }

  async function handlerOrderSelect(e){
    const selectValue = e.target.value
    setListOrder(selectValue)
    await fetchCats({pageNumber, limit: listLimit, order: selectValue})
  }

  async function handlerLimitSelect(e){
    const selectValue = e.target.value
    setListLimit(selectValue)
    await fetchCats({pageNumber, limit: selectValue, order: listOrder})
  }
}

export default App;
