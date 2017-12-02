/**
 * Created by diogomatoschaves on 29/11/2017.
 */

import React, { Component } from 'react';
import { Menu, Dropdown, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { updateCategory } from '../actions/actions.js'
import { capitalize } from '../helpers/helpers'


const SideMenu = props => {
  
    const { 
      handleChangeSort, 
      valueSort, 
      updateCategory,
      valueCategory,
      categoryOptions,
    } = props;

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
            onChange={(e, { value }) => updateCategory(e, { value })}
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
};

function mapStateToProps ({ valueCategory, posts }) {
  return {
    valueCategory: valueCategory,
    categoryOptions: posts.reduce((optionsObj, post) => {
      if (!(optionsObj.optionsArr.includes(post.category))) {
        const key = optionsObj.options.length + 1;
        optionsObj.options.push({key: key, text: capitalize(post.category), value: key});
        optionsObj.optionsArr.push(post.category);
        return optionsObj
      } else {
        return optionsObj;
      }
    }, {options: [{ key: 1, text: 'All Posts', value: 1 }], optionsArr: []}).options
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateCategory: (e, { value }) => dispatch(updateCategory(e, { value }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)