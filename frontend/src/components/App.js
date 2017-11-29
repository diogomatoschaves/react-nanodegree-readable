import React, { Component } from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react'
import ListPosts from './ListPosts.js'
import SideMenu from './SideMenu.js'
import 'typeface-roboto'
import './../App.css';

class App extends Component {
  
  state = {
    posts: [],
    comments: {}
  };
  
  componentDidMount() {

    const category = 'react';

    let url = `http://localhost:3001/${category}/posts`;
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
      this.setState({posts: posts});
    });
  }
  
  render() {
    return (
      <div className="App">
        <Grid divided={true} stackable>

          <Grid.Row>
            <Grid.Column width={16} verticalAlign={'middle'}>
              <Segment>
                <Header as="h2"> Readable </Header>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column width={4}>
              <SideMenu />
            </Grid.Column>
            <Grid.Column width={12}>
              <ListPosts posts={this.state.posts} comments={this.state.comments}/>
            </Grid.Column>
          </Grid.Row>

        </Grid>
      </div>
    );
  }
}

export default App;
