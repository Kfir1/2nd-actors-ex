import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import LiveSearchBox from '../components/LiveSearchBox';
import { Link } from 'react-router-dom';

class MoviePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchString: '',
            chosenMovie: [],
            results: [],

        }
    }
    searchTextChanged = (newText) => {                                                            // &query=   means what to search. in this case we search variable from user
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=1ee3645441ba4ed79b9da803ead5ce9a&query=${newText}`)

            .then( (stream) => stream.json())
            .then((res) => {
                if(res && res.results){
                    // if checks 2 conditions. if res recieved and  res.results recieved from promise.
                    const newResults = res.results.map((movie) => {
                        // will map only on results from user input.
                        console.log(res);
                        // (res) up to 20 search results from all the results in API.   
                        console.log(res.results);
                        // (res.results) gets only the results after getting input from the user   
                        return {name:  movie.title, id: movie.id, image: movie.poster_path}
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
    }  // pass index from
    addMovie = (index) => {
        const movie = this.state.results[index]
        const movies = this.state.chosenMovie.concat(movie);
        this.setState({
            chosenMovie: movies,
            results: [],
        })

    }
    render() {

        const actorCards = this.state.chosenMovie.map((movie) => {
            return (
            <Col lg={3} md={6} sm={12}>
                    {/* <Card>
                        <h1>{movie.name}</h1>
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.image}`}/>
                   
                        <Link to={`/movie/${movie.id}`}>Click Me</Link>
                    </Card> */}
                    <Card >
                        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${movie.image}`} />
                        <Card.Body>
                            <Card.Title><h1>{movie.name}</h1></Card.Title>
                            {/* <Card.Text>

                            </Card.Text> */}
                            <Link to={`/movie/${movie.id}`}>Click Me</Link>
                        </Card.Body>
                        </Card>
             </Col>
            )
        })
        return (
        <div className="p-actors-page">
            <LiveSearchBox 
                results={this.state.results}
                placeholder='Choose a movie'
                onSearchChanged={this.searchTextChanged}
                onResultSelected={this.addMovie}
                // same as add actor in ActorSPage
            />
            <Row>
                {actorCards}
            </Row>
        </div>)
    }
}

export default (MoviePage);


