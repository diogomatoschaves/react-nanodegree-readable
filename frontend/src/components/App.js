import React, { Component } from 'react';
import { Grid, Segment, Header, Label, Sticky } from 'semantic-ui-react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import ListPosts from './ListPosts.js'
import SideMenu from './SideMenu.js'
import Error404 from './Error404.js'
import NoMatch from './NoMatch.js'
import ViewHeader from './ViewHeader.js'
import { fetchCategory, getItems } from '../actions/actions.js'
import 'typeface-roboto'
import './../App.css';
import PropTypes from 'prop-types';


class App extends Component {
  
  static propTypes = {
    categories: PropTypes.array,
    categoryOptions: PropTypes.array
  };
  
  state = {
    contextRef: {contextRef: true}
  };

  handleContextRef = contextRef => this.setState({ contextRef });
  
  render() {

    const { contextRef } = this.state;
    const { categories } = this.props;

    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={({ location, history }) => (
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
                    <ViewHeader history={history} />
                    <ListPosts
                      location={location}
                      category="allposts"
                    />
                  </div>
                </Grid.Column>
                <Grid.Column width={2}>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            )}/>
          <Route path="/:category" render={({ match, location, history }) => (
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
                    <ViewHeader history={history} />
                    {categories && categories.includes(match.params.category) ? (
                      <ListPosts
                        location={location}
                        category={match.params.category}
                      />
                      ) : (
                      <NoMatch noMatchType="category"/>
                     )}
                  </div>
                </Grid.Column>
                <Grid.Column width={2}>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          )}/>
          <Route component={Error404} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ categoryOptions }) => {
  return {
    categoryOptions: categoryOptions.categoryOptions,
    categories: categoryOptions.categories,
  }
};

const mapDispatchToProps = (dispatch) => {
    return {
      fetchCategory: ({ category }) => dispatch(fetchCategory({ category })),
      fetchPosts: (url, info) => dispatch(getItems(url, info))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));