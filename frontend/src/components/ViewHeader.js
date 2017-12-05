/**
 * Created by diogomatoschaves on 04/12/2017.
 */

import React from 'react';
import PostModal from './PostModal.js'
import { Grid, Header, Segment, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { changeSort } from '../actions/actions.js'


const ViewHeader = (props) => {
  
  const { valueSort, changeSort, optionsSort } = props;
  
  return (
      <Segment>
          <Grid columns={3} divided stackable>
            <Grid.Row>
              <Grid.Column width={3} verticalAlign='middle' textAlign='center'>
                <Header as='h3'>Category</Header>
              </Grid.Column>
              <Grid.Column width={9} verticalAlign='middle'>
                <Header as='h3'>Posts</Header>
              </Grid.Column>
              <Grid.Column width={4} textAlign='center'>
                <Dropdown
                  text='Sort Posts'
                  options={optionsSort}
                  button
                  compact
                  size={'tiny'}
                  onChange={changeSort}
                  value={valueSort}
                />
                <PostModal
                  method={'Add'}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
    )
};

function mapStateToProps ({ valueSort, optionsSort }) {
  return {
    valueSort,
    optionsSort
  }
}

function mapDispatchToProps (dispatch) {
  return {
    changeSort: (e, {value}) => dispatch(changeSort(e, {value}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewHeader)
