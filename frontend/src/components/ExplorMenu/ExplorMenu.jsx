import React from 'react'
import "./ExplorMenu.css"
import { menu_list } from '../../assets/assets'
const ExplorMenu = ({category , setCategory}) => {
  return (
    <div className='explormenu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>Find the meal you’re craving from our wide variety of dishes. Choose from Pizza, Burgers, Biryani, Desserts, and more—each crafted to delight your taste buds. 🍔🍜</p>
       <div className="explore-menu-list">
        {menu_list.map((item,index)=>{
          return(
            <div>
              <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="explore-menu-list-item">
                <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                <p>{item.menu_name}</p>
              </div>
            </div>
          )
        })}
       </div>
       <hr />
    </div>
  )
}

export default ExplorMenu




