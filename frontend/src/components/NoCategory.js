/**
 * Created by diogomatoschaves on 04/12/2017.
 */

import React, { Component } from 'react';
import { Grid, Header, Segment, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { updateCategory } from '../actions/actions.js'
import { withRouter } from 'react-router-dom'


class NoCategory extends Component {

  componentDidMount() {

    const { updateCategory } = this.props;

    updateCategory({}, { value: 'allposts' })

  }

  render() {
    return (
      <Segment>
        <Header as="h3">No Posts to show in chosen category</Header>
      </Segment>
    )
  }
}

function mapStateToProps ({}) {
  return {

  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateCategory: (e, { value }) => dispatch(updateCategory(e, { value }))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NoCategory))
