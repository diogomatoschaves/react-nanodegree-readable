/**
 * Created by diogomatoschaves on 29/11/2017.
 */

import React, { Component } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { updateCategoryPosts, fetchCategories } from '../actions/actions.js'


class SideMenu extends Component {

  componentDidMount() {

    const { fetchCategories } = this.props;

    fetchCategories()
  }

  render() {

    const {
      updateCategoryPosts, valueCategory, categoryOptions } = this.props;

    return (
      <div>
        <Menu pointing vertical fluid>
          <Menu.Item className='categories' name="Categories"/>

          <Dropdown scrolling
                    className='link item dropdown-category'
                    onChange={(e, { value }) => updateCategoryPosts(e, { value }, categoryOptions)}
                    options={categoryOptions}
                    selection
                    value={valueCategory}
          />
        </Menu>
      </div>
    )
  }
}

function mapStateToProps ({ valueCategory, categoryOptions }) {
  return {
    valueCategory: valueCategory,
    categoryOptions: categoryOptions
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateCategoryPosts: (e, { value }, categoryOptions) => dispatch(updateCategoryPosts(e, { value }, categoryOptions)),
    fetchCategories: () => dispatch(fetchCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)