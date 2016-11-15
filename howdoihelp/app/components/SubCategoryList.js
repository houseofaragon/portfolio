import React from 'react'

class SubCategoryList extends React.Component {
  render () {
    return (
      <div id='sub-category-list'>
        <h6> Filter: </h6>
        <button id='money-based-action' data-id="money-based-action"> <span className='action' id='money-based-action'></span>Donate</button>
        <button id='virtual-action' data-id="virtual-action"> <span className='action' id='virtual-action'></span> Online</button>
        <button id='physical-action' data-id="physical-action"> <span className='action' id='physical-action'></span> In Person</button>
      </div>
    )
  }
}

export default SubCategoryList
