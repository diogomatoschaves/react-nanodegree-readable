/**
 * Created by diogomatoschaves on 29/11/2017.
 */

import React, { Component } from 'react'
import { Menu, Dropdown, Segment } from 'semantic-ui-react'

export default class SideMenu extends Component {

  state = {
    
  };
  
  render() {
    const { options } = this.state;
    const { 
      handleChangeSort, 
      valueSort, 
      handleChangeCategory,
      valueCategory,
      categoryOptions,
    } = this.props;

    const optionsSort = [
      { key: 1, text: 'Vote Score', value: 1 },
      { key: 2, text: 'Date', value: 2 }
    ];

    return (
      <div>
        <Menu pointing vertical fluid>
          <Menu.Item className='categories' name="Categories"/>

          <Dropdown scrolling
            pointing='left' className='link item dropdown-category'
            onChange={handleChangeCategory}
            options={categoryOptions}
            selection
            value={valueCategory}
          />
        </Menu>
        <Segment>
            <Dropdown
              text='Sort Posts'
              fluid
              options={optionsSort}
              floating
              button
              className='icon'
              onChange={handleChangeSort}
              value={valueSort}
            />

          </Segment>
      </div>
    )
  }
}

// <Dropdown
//           pointing='left' className='link item'
//           onChange={this.handleChangeSort}
//             options={optionsSort}
//             selection
//             value={valueSort}
//         />

// <Dropdown fluid floating labeled button className='icon'
//           onChange={(e) => handleChangeSort(e)} text='Sort Posts' icon='filter' >
//
//               {optionsSort.map(option => (
//                 <Dropdown.Item key={option.key} value={option.value}> {option.text} </Dropdown.Item>
//               ))}
//         </Dropdown>
