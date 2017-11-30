import React, { Component } from 'react';
import { Grid, Segment, Header, Label, Sticky } from 'semantic-ui-react'
import ListPosts from './ListPosts.js'
import SideMenu from './SideMenu.js'
import { capitalize } from '../helpers/helpers'
import 'typeface-roboto'
import './../App.css';

class App extends Component {
  
  state = {
    posts: [],
    filteredPosts: [],
    comments: {},
    contextRef: true,
    valueSort: 1,
    valueCategory: 1,
    categoryOptions: [
      { key: 1, text: 'All Posts', value: 1 },
      { key: 2, text: 'Redux', value: 2 },
      { key: 3, text: 'React', value: 3 }
    ]
  };
  
  componentDidMount() {

    const category = 'react';

    const { valueCategory, categoryOptions } = this.state;

    let url = `http://localhost:3001/posts`;
    let headers = {headers: { 'Authorization': 'Diogo\'s readable project' }};

    fetch(url, headers)
    .then((res) => res.json()).then((posts) => {

      // let comments = {};
      posts.map((post) => {
      let url = `http://localhost:3001/posts/${post.id}/comments`;
      fetch(url, headers)
        .then((response) => response.json())
        .then((response) => {
          // comments[post.id] = response;
          this.setState((prevState) => {
            return {
              ...prevState,
              ['comments']: {
                ...prevState['comments'],
                [post.id]: response
              }
            }
          })
        })
      });

      let filteredPosts;

      valueCategory !== 1 ? filteredPosts = posts.filter((post) => (
      capitalize(post.category) === categoryOptions[valueCategory-1].text))
      : filteredPosts = posts;

      this.setState({ posts, filteredPosts: filteredPosts });
    });
  }

  handleContextRef = contextRef => this.setState({ contextRef });

  handleChangeSort = (e, { value }) => {
    this.setState({ valueSort: value })
  };

  handleChangeCategory = (e, { value }) => {
    const { posts, categoryOptions } = this.state;

    let filteredPosts;
    
    value !== 1 ? filteredPosts = posts.filter((post) => (
      capitalize(post.category) === categoryOptions[value-1].text))
      : filteredPosts = posts;

    this.setState({ valueCategory: value, filteredPosts: filteredPosts });
  };
  
  render() {

    const { contextRef, valueSort, valueCategory, categoryOptions } = this.state;

    return (
      <div className="App">
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
                  handleChangeCategory={this.handleChangeCategory}
                  valueSort={valueSort}
                  valueCategory={valueCategory}
                  categoryOptions={categoryOptions}
                />
              </Sticky>
            </Grid.Column>

            <Grid.Column  width={10}>
              <div ref={this.handleContextRef}>
              <ListPosts
                posts={this.state.filteredPosts}
                comments={this.state.comments}
                valueSort={valueSort}
                valueCategory={valueCategory}
              />
              </div>
            </Grid.Column>

            <Grid.Column width={2}>
            </Grid.Column>


          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
