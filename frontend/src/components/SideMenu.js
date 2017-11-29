/**
 * Created by diogomatoschaves on 29/11/2017.
 */

import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class SideMenu extends Component {

  state = { activeItem: 'All Categories' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu pointing vertical fluid>
        <Menu.Item name='All Categories' active={activeItem === 'All Categories'} onClick={this.handleItemClick} />
        <Menu.Item name='Choose a Category...' active={activeItem === 'Choose a Category...'} onClick={this.handleItemClick} />
      </Menu>
    )
  }
}
