import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import LiveSearchBox from '../components/LiveSearchBox';

class ActorsPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchString: '',
            chosenActors: [],
            results: [],

        }
    }// newText comes from user input
    searchTextChanged = (newText) => {
        fetch(`https://api.themoviedb.org/3/search/person?api_key=1ee3645441ba4ed79b9da803ead5ce9a&query=${newText}`)
                                                                        //1ee3645441ba4ed79b9da803ead5ce9a my key
            .then( (stream) => stream.json())
            .then((res) => {
                if(res && res.results){
                    // if checks 2 conditions. if res recieved and  res.results recieved from promise.
                    const newResults = res.results.map((person) => {
                        // will map only on results from user input.
                        console.log(res);
                        // (res) up to 20 search results from all the results in API.   
                        console.log(res.results);
                        // (res.results) gets only the results after getting input from the user   
                        return {name: person.name, image: person.profile_path}
                        //will return only the (person.name) actor name and ( person.profile_path) actor image from (res.results). 
                    })
                    this.setState({
                        results: newResults,
                    })
                }
            })
        this.setState( {
            searchString: newText,

        } )
    }
    addActor = (index) => {
        const actor = this.state.results[index]
        const actors = this.state.chosenActors.concat(actor);
        this.setState({
            chosenActors: actors,
            results: [],
        })

    }
    render() {

        const actorCards = this.state.chosenActors.map((actor) => {
            return (
            <Col lg={3} md={6} sm={12}>
                    <Card><h1>{actor.name}</h1><img src={`https://image.tmdb.org/t/p/w500/${actor.image}`}/></Card>
             </Col>
            )
        })
        return (
        <div className="p-actors-page">
            <LiveSearchBox 
                results={this.state.results}
                placeholder='Choose an Actor'
                onSearchChanged={this.searchTextChanged}
                onResultSelected={this.addActor}

            />
            <Row>
                {actorCards}
            </Row>
        </div>)
    }
}

export default ActorsPage;