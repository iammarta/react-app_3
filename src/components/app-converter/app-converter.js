import React from 'react';
import axios from 'axios';


class Converter extends React.Component {
    constructor(props){
        super(props);
           this.state = {
            result: null,
            fromCurrency: "USD",
            amount: 1,
            currencies: ["USD","PLN","EUR","UAH"],
           }
    }


    convertHandler = () => {
        switch (this.state.fromCurrency) {
            case 'PLN':
            case 'EUR':
            case 'UAH':
                axios
                .get(`http://data.fixer.io/api/latest?access_key=b82f617f89d1629ca9ce8b020617161e&format=1`)
                .then(response => {
                    const result = (this.props.data * (response.data.rates[this.state.fromCurrency])).toFixed(2)
                    this.setState({ result: result })
                })
                .catch(err => {
                    console.log("Opps", err.message);
                });
              break;
              default:
                this.setState({ result: this.props.data })
            }
    };

    selectHandler = (event) => {
        if (event.target.name === "from") {
            this.setState({ fromCurrency: event.target.value })
        }
    }

    render() {
        return (
            <div className="Converter">           
                    <select
                        name="from"
                        onChange={(event) => this.selectHandler(event)}
                        value={this.state.fromCurrency}
                    >
                        {this.state.currencies.map(cur => (
                            <option key={cur}>{cur}</option>
                        ))}
                    </select>
                    <button data-toggle="modal" className="btn btn-primary" data-target="#priceModal" onClick={this.convertHandler}>Convert</button>
                    <div className="modal fade" id="priceModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">total price in USD to {this.state.fromCurrency}</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
                        {this.state.result}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-dark" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
            </div>
        );
    }
}

export default Converter;
