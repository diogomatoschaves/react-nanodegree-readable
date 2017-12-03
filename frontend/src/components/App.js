import React, { Component } from 'react';
import { Grid, Segment, Header, Label, Sticky } from 'semantic-ui-react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { getItems } from '../actions/actions.js'
import ListPosts from './ListPosts.js'
import SideMenu from './SideMenu.js'
import NoMatch from './NoMatch.js'
import 'typeface-roboto'
import './../App.css';

class App extends Component {
  
  state = {
    contextRef: true
  };
  
  componentDidMount() {
    const { fetchPosts, valueCategory } = this.props;
    
    if (valueCategory === 1) {

      let url = `http://localhost:3001/posts`;

      fetchPosts(url, {type: 'posts'});
    }
  }

  handleContextRef = contextRef => this.setState({ contextRef });
  
  render() {

    const { contextRef } = this.state;
    const { valueSort } = this.props;
    let { posts } = this.props;

    const optionsSort = [
      {key: 'voteScore', text: 'Vote Score', value: 1},
      {key: 'timestamp', text: 'Date', value: 2}];

    const sortProp = optionsSort.filter((option) => option.value === valueSort)[0].key;

    posts = posts.sort((a, b) => {
      return b[sortProp] - a[sortProp]
    });

    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => (
            <Grid divided={true} stackable>
              <Grid.Row>
                <Grid.Column width={16} verticalAlign={'middle'}>
                  <Segment className="title">
                    <Label basic color="blue" size="large">
                      <Header style={{'paddingLeft': '10px', 'paddingRight': '10px'}} color="blue" as="h2">Readable</Header>
                    </Label>
                  </Segment>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={3}>
                <Grid.Column width={4}>
                  <Sticky context={contextRef}>
                    <SideMenu
                      handleChangeSort={this.handleChangeSort}
                    />
                  </Sticky>
                </Grid.Column>
                <Grid.Column  width={10}>
                  <div ref={this.handleContextRef}>
                  <ListPosts
                    posts={posts}
                    optionsSort={optionsSort}
                  />
                  </div>
                </Grid.Column>
                <Grid.Column width={2}>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          )}/>
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ posts, valueCategory, categoryOptions, valueSort, optionsSort }) => {
  return {
    posts,
    valueCategory,
    categoryOptions,
    valueSort,
    optionsSort
  }
};

const mapDispatchToProps = (dispatch) => {
    return {
      fetchPosts: (url, info) => dispatch(getItems(url, info)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);