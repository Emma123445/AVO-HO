import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'
const Item = (props) => {
  return (
    <div className='item'>
      <Link to={`/product/${props.id}`}><img onClick={() => window.scrollTo(0, 0)} src={props.image} alt="-product-" /></Link>
      <p>{props.name}</p> 
      <div className="item-prices">
        <div className="item-price-new">
            {props.new_price}FCFA
        </div> 
        <div className="item-price-old"> 
            {props.old_price}FCFA
        </div>
      </div>
    </div>
  )
}

export default Item
