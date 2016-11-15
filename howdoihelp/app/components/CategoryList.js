import React from 'react'
import { Link } from 'react-router'
import SubCategoryList from 'components/SubCategoryList'

class CategoryList extends React.Component {
  render () {
    const data = this.props.categoryList || {}
    const categoryList = Object.keys(data).map((site,idx) => (
      <div key={idx} >
      <h4 className='category-header'>{site}</h4>
      {data[site].map((item,idx) => (
        <a key={idx} href={item.action_link} target="_blank">
          <div className='category-div'>
            <h4>{item.entity}</h4>
            <h5 className='category-description'>{item.description}</h5>
            <div className='category-links'>
              <span className='action' id={item.action}></span>
              <h6 id={item.action}>{item.action}</h6>
            </div>
          </div>
        </a>
      ))}
      </div>
    ))
    return (
      <div className='landing-side-grid'>
        <SubCategoryList />
        <div id='category-list'>
          {categoryList}
        </div>
      </div>
    )
  }
}

export default CategoryList
