import React, { Component } from 'react';
import { Grid, Segment, Header, Label, Sticky } from 'semantic-ui-react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import ListPosts from './ListPosts.js'
import SideMenu from './SideMenu.js'
import NoMatch from './NoMatch.js'
import NoCategory from './NoCategory.js'
import ViewHeader from './ViewHeader.js'
import { withRouter } from 'react-router-dom'
import { fetchCategory, getItems } from '../actions/actions.js'
import 'typeface-roboto'
import './../App.css';

class App extends Component {
  
  state = {
    contextRef: true
  };
  
  // componentDidMount() {
  //  
  //   const { valueCategory, fetchCategory, fetchPosts } = this.props;
  //
  //   console.log({ valueCategory });
  //  
  //   if (valueCategory === 'allposts') {
  //
  //     let url = `http://localhost:3001/posts`;
  //
  //     fetchPosts(url, {type: 'posts'});
  //   } else {
  //     fetchCategory({ valueCategory });
  //   }
  // }

  handleContextRef = contextRef => this.setState({ contextRef });
  
  render() {

    const { contextRef } = this.state;
    const { categories } = this.props;
    
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
                    />
                  </Sticky>
                </Grid.Column>
                <Grid.Column  width={10}>
                  <div ref={this.handleContextRef}>
                    <ViewHeader/>
                    <ListPosts
                      category="allposts"
                    />
                  </div>
                </Grid.Column>
                <Grid.Column width={2}>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            )}/>
          <Route path="/:category" render={({ match }) => (
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
                    />
                  </Sticky>
                </Grid.Column>
                <Grid.Column  width={10}>
                  <div ref={this.handleContextRef}>
                    <ViewHeader/>
                      {categories && categories.includes(match.params.category) ? (
                        <ListPosts
                          category={match.params.category}
                        />
                        ) : (
                        <NoCategory/>
                       )}
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

const mapStateToProps = ({ categoryOptions, valueCategory }) => {
  return {
    categoryOptions: categoryOptions.categoryOptions,
    categories: categoryOptions.categories,
    valueCategory
  }
};

const mapDispatchToProps = (dispatch) => {
    return {
      fetchCategory: ({ category }) => dispatch(fetchCategory({ category })),
      fetchPosts: (url, info) => dispatch(getItems(url, info))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));