import React, { Component } from 'react';

class ShowIcon extends Component {
  handleClick = () => {
    const { itemId, onItemClicked } = this.props;
    onItemClicked(itemId);
    //<i className={`${!active && 'far fa-star'} icon-tv ${active && 'active fas fa-star'}` } onClick={this.handleClick}></i>
  };
  render() {
    const { active, itemId } = this.props;
    return (
      <i
        className={`fas fa-heart icon-tv ${active.includes(itemId) &&
          'active fas fa-heart'}`}
        onClick={this.handleClick}
      />
    );
  }
}

export default ShowIcon;
