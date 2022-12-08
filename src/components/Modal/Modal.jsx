import React, { Component } from 'react';
// import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalStyle } from './Modal.styled';
import { Backdrop } from 'components/Loader/Loader.styled';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = evt => {
    console.log('object');
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return (
      (
        <Backdrop onClick={this.handleBackdropClick}>
          <ModalStyle>{this.props.children}</ModalStyle>
        </Backdrop>
      ),
      modalRoot
    );
  }
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
