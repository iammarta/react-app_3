import React from 'react';

class ListShow extends React.Component{
    render(){
        return(
            
            <li className="list-group-item"><p className="date">{this.props.data.date}</p><p className="expenses">{this.props.data.expense}</p><p className="price">$ {this.props.data.price}</p><button className="btn btn-outline-dark" onClick={(e)=>{
                e.stopPropagation();  
                this.props.delete(this.props.index)}}> <i className="fa fa-trash"></i></button></li>
    
        )
    }
}

export default ListShow;