import React from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

class Modal extends React.Component {
    state = {
        isShowingModal: false,
    }
    handleClick = () => this.setState({isShowingModal: true})
    handleClose = () => this.setState({isShowingModal: false})

    render() {
        return <div onClick={this.handleClick}>
            {
                this.state.isShowingModal &&
                <ModalContainer onClose={this.handleClose}>
                    <ModalDialog onClose={this.handleClose}>
                        <h1>{this.props.title}</h1>
                        <p>{this.props.content}</p>
                    </ModalDialog>
                </ModalContainer>
            }
        </div>;
    }
}
export default Modal;