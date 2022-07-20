import './CatCard.css'

function CatCard(props){
  return (
    <div className="col d-flex">
      <div className="cat-card">
        <img
          src={props.catItem.url}
          width={props.catItem.width}
          height={props.catItem.height}
          className="cat-card__img"
        />
      </div>
    </div>
  )
}

export default CatCard
