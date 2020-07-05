  
import React from 'react';
import ListShow from '../app-listshow';
import Converter from '../app-converter';

class App extends React.Component{
    constructor(props){
        super(props);
       let d=JSON.parse(localStorage.getItem('data'));
       if(d)
       {
           this.state = {
               data: d,
               expense: '',
               price: '',
               total: '',
               date:'',
                text:''
           };
       }else{
           this.state = {
               data:[],
               expense: '',
               price: '',
               total:'',
               date:'',
                text:''
           };
       }
       this.onAdd=this.onAdd.bind(this);
       this.onUpdate=this.onUpdate.bind(this);
       this.onDelete = this.onDelete.bind(this);
       this.onTotal = this.onTotal.bind(this);
       this.onCheck = this.onCheck.bind(this);
      this.onClear = this.onClear.bind(this);
    }
    onCheck(e){
        this.setState({ text : e.target.value });
    }
       onAdd(e){
        e.preventDefault();
        let data=this.state.data;
        let date=this.state.date;
        let expense=this.state.expense;
        let price = this.state.price;
        if (price && expense ){
            data.push({ expense: expense, price: price, date: date, delete: false });
            data.sort(function (a, b) { return new Date(b.date) - new Date(a.date)});
            this.setState({ data: data, expense: '', price: '', date:'' });
            localStorage.setItem('data', JSON.stringify(data));
            this.onTotal();
        } 
    }
    onUpdate(event){
        switch (event.target.id) {
            case 'expense':
                this.setState({ expense : event.target.value });
              break;
            case 'price':
                this.setState({ price : event.target.value});
              break;
              case 'date':
                this.setState({ date : event.target.value });
                break;
            default:
          }
    }
    onDelete(index){
        let data=this.state.data;
        data.splice(index,1);
        this.setState({data});
        localStorage.setItem('data', JSON.stringify(data));
        this.onTotal();
    }
    
    onClear(){
        let data=this.state.data;
        data = data.filter(elem=>{return elem.date !== this.state.text});
        this.setState({data});
        localStorage.setItem('data', JSON.stringify(data));
        this.onTotal();
    }
    
    onTotal(){
        let data=this.state.data;
        if(data)
        {
            let result = 0;
            data.forEach(element => {
                result += parseFloat(element.price);
            });
            this.setState({ total: result });
        }
    }
    componentDidMount(){
        this.onTotal();
    }
render() {
  return (
    <div className="container-fluid">
        <div className="row">
        <div className="col-xl">
  <h1 className="app-title">expenses manager</h1>
  <p className="app-subtitle">add your expenses</p>
  <form>
                <input type="date" className="form-control" value={this.state.value} id="date" placeholder="Date:" onChange={this.onUpdate}/> 
                <input type="text" className="form-control" id="expense" value={this.state.expense} placeholder="Expense:" onChange={this.onUpdate}/>
                <div className="input-group mb-3">
  <div className="input-group-prepend">
    <span className="input-group-text">$</span>
  </div>
  <input type="number" className="form-control" id="price" placeholder="Price" value={this.state.price} onChange={this.onUpdate}/>
</div>
                <button type="submit" className="btn btn-outline-dark" onClick={this.onAdd}><i className="fa fa-plus"></i></button>
    </form>
    <br/>
    <br/>
            <div className="row">
  <div className="col-sm-6">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Do you want to convert the total price to another currency?</h5>
        <p className="card-text">Please, use the selector below to find the appropriate currency and "convert" button to convert the total price to another currency.</p>
        <Converter data={this.state.total}/>
      </div>
    </div>
  </div>
  <div className="col-sm-6">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Do you want to delete some items from the list?</h5>
        <p className="card-text">Delete the list items by date. Please, enter the date in the input below and click "delete" button.</p>
        <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="yyyy-mm-dd" aria-label="yyyy-mm-dd" aria-describedby="basic-addon2" onChange={this.onCheck}></input>
        <div className="input-group-append">
    <button data-toggle="modal" data-target="#deleteModal" className="btn btn-primary">delete</button>
    <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Are you sure you want to delete the items?</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      the action is not reversible
      </div>
      <div className="modal-footer">
      <button type="button" className="btn btn-dark" data-dismiss="modal" onClick={this.onClear}>yes</button>
        <button type="button" className="btn btn-dark" data-dismiss="modal">no</button>
      </div>
    </div>
  </div>
</div>
  </div>
  </div>
      </div>
    </div>
  </div>
</div>
    </div>
    <div className="col-xl">
<h3 className="list-title">List</h3>        
        <div className="ListShow">
        <ul className="list-group list-group-flus">
            {this.state.data.map((data,index)=>{
                       return <ListShow data={data} index={index} key={index} delete={this.onDelete}/>
            })}
        </ul>
        </div>    
        <div className="total badge badge-dark">
        Total: $ {this.state.total}
        </div>
        </div>    
    </div>
    </div>
  );
  }
}
export default App;