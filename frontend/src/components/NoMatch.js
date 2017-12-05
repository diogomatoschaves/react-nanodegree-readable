/**
 * Created by diogomatoschaves on 04/12/2017.
 */

import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { updateCategory } from '../actions/actions.js'
import PropTypes from 'prop-types';


class NoMatch extends Component {
  
  static propTypes = {
    updateCategory: PropTypes.func.isRequired,
    noMatchType: PropTypes.string.isRequired
  };

  componentDidMount() {

    const { updateCategory } = this.props;

    updateCategory({}, { value: 'allposts' })

  }

  render() {
    
    const { noMatchType } = this.props;
    
    return (
      <Segment>
        {noMatchType === 'id' ? (
          <Header as="h3">No posts match the requested id</Header>
        ) : (
          <Header as="h3">No categories match the requested category</Header>
        )}
        
      </Segment>
    )
  }
}

function mapStateToProps () {
  return {

  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateCategory: (e, { value }) => dispatch(updateCategory(e, { value }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoMatch)
