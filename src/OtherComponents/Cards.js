import React, { Component } from 'react';
import './Cards.css';
//import Modal from './Modal';
//import { Icon } from 'antd';
//import Editform from './EditForm';
//const user = (props) => {
class Cards extends Component {
    render() {
        return (
            <article className="Cards">
                <div className="grid">
                    <div className="item"><img src={this.props.imageUrl} alt="Image"></img></div>
                    <div className="item">{this.props.title}</div>
                    <div className="item">{this.props.description}</div>
                    <div className="item"> {this.props.publishedDate}</div>
                    <div className="item">{this.props.cost}</div>
                </div>
                {/* <div className="Icons">    
                    <Icon onClick={this.iconLike} type="heart" style={{ color: "red" }} theme={this.state.isLiked === true ? "filled" : "outlined"} />
                    <Icon onClick={() => this.iconEditHandler(this.props.id)} type="edit" />
                    <Icon onClick={() => { this.iconDeleteHandler(this.props.id) }} type="delete" />        
                </div> */}
                {/* {this.state.showModal === true ? <Modal backgroundFix={this.backgroundFix}> <Editform updateUser={this.updateUser}
                    id={this.props.id}
                    name={this.props.name}
                    email={this.props.email}
                    phone={this.props.phone}
                    website={this.props.website} /> </Modal> : null} */}
            </article>
        )
    };
}

export default Cards;