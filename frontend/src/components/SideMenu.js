/**
 * Created by diogomatoschaves on 29/11/2017.
 */

import React, { Component } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions/actions.js'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';


class SideMenu extends Component {
  
  static propTypes = {
    fetchCategories: PropTypes.func.isRequired,
    valueCategory: PropTypes.string,
    categoryOptions: PropTypes.array
  };

  componentDidMount() {
  
    const { fetchCategories } = this.props;
  
    fetchCategories()
  }

  render() {

    const { valueCategory, categoryOptions } = this.props;
    
    return (
      <div>
        <Menu pointing vertical fluid>
          <Menu.Item className='categories' name="Categories"/>
          <Dropdown
            options={categoryOptions}
            className='link item dropdown-category'
            value={valueCategory}
            />
        </Menu>
      </div>
    )
  }
}

function mapStateToProps ({ valueCategory, categoryOptions }) {
  return {
    valueCategory,
    categoryOptions: categoryOptions.categoryOptions
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideMenu))