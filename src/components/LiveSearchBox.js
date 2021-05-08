import React from 'react';
import { Form, ListGroup } from 'react-bootstrap';
// This component is a generic searchox that shows results immediatly when the user starts typing
// props
    // placeholder - string - Will be shown in the input
    // results - array of strings - the names of the actors to show
// data-flow props
    // onSearchChanged - function - will be invoked when the user enters text
    // onResultSelected - function - will be invoked once a user chooses an actor
class LiveSearchBox extends React.Component{
    constructor(props){
        // 1) add key to state 
        // 2) map state to value
        // 3) update state using onChange
        super(props);
        this.state = {
            searchText: '',
        }
    }
    updateText = (event) =>{
        const val = event.target.value;
        // Update the internal state
        
        this.setState({
            searchText: val
        });
        // update the parent component by running 
        this.props.onSearchChanged(val);
    }
    resultSelected = (index) => {
        this.props.onResultSelected(index);
        this.setState({
            searchText: ''
        });
        this.props.onSearchChanged('');
    }
    render() {
        const listItems = this.props.results.map( (res, index) => {
            return   <ListGroup.Item action key={index} onClick={()=> this.resultSelected(index)}>{res.name}</ListGroup.Item>
        })
        return (
        <div className="c-live-search-box">
            <Form.Control onChange={this.updateText} value={this.state.searchText} placeholder={this.props.placeholder}/>
            <ListGroup>
                {listItems}
            </ListGroup>
        </div>)
    }
}

export default LiveSearchBox;