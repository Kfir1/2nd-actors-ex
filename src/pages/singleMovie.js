
// https://developers.themoviedb.org/3/movies/get-movie-credits   api for movies. not the only api we used?  https://developers.themoviedb.org/3/getting-started/json-and-jsonp      https://developers.themoviedb.org/3/movies/get-movie-credits

import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import LiveSearchBox from '../components/LiveSearchBox';
import { withRouter } from 'react-router'
// https://reactrouter.com/web/guides/quick-start    insturctions for react router

class SingleMovie extends React.Component{
    constructor(props){
        super(props);
        this.movieId = this.props.match.params.movieId // set dynamic id to be sent 
        this.state = {

                movie: undefined
        }
    }
    componentDidMount = () => {               
        //https://developers.themoviedb.org/3/movies/get-movie-details  api info TMDB.
        // example :  https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US  original address to be changed
        fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.movieId}?api_key=1ee3645441ba4ed79b9da803ead5ce9a&language=en-US`)
            .then( (stream) => stream.json())
            .then((res) => {
                if(res){  // check if results (res) is received
                    console.log(res);
                    const movieObject = { //create new object and fill it with keys
                        nameOfMovie: res.original_title,
                        movieLength: res.runtime,
                        //movie length from api runtime. (res.runtime) key from info recieved.
                        moviePoster: res.poster_path,
                    }
                   
                    fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.movieId}/credits?api_key=1ee3645441ba4ed79b9da803ead5ce9a&language=en-US`)
                        .then(secondStream => secondStream.json())// second info. different api??
                        .then((Secondres) => {
                            if(Secondres) {   //   check if Secondres received
                                console.log(Secondres);
                                movieObject.stars = Secondres.cast[0].original_name   // get from all data (Secondres), from  the cast[0] in first object? the value of key (original_name)
                                movieObject.director = Secondres.crew.find( (director) => director.known_for_department === "Directing" ).original_name //get from all data (Secondres), from  the crew object? find() if has key (known_for_department) the value of key (original_name) ???? check what is written
                                this.setState({
                                    movie: movieObject // use the new object as new state to change it
                                   
                                })
                            } 
                        })
                    }    


})
}
  
render(){
    // console.log(this.props.match.params.movieId);
    // start a variable to hold the template card info.  check if state is changed and not undefined anymore, if not, make template variable to hold JSX code instead of empty strings
    let template = '';
    if(this.state.movie === undefined ){
        template = <div>loading</div>
    }
    else{
        template = (
        <div> 
            <Col>
             <Card>  
                <h1>{this.state.movie.nameOfMovie}</h1>
                <img src={`https://image.tmdb.org/t/p/w500${this.state.movie.moviePoster}`} alt=""/>
                <p>Director: {this.state.movie.director}</p>
                <p>Stars: {this.state.movie.stars}</p>
                <p>Movie Length (mintues): {this.state.movie.movieLength}</p>
            </Card>
            </Col> 
        </div>
        )
    }


        return (
        <div >
            {template}
        </div>
        )
    }
}

export default withRouter(SingleMovie);

// when using  this.props.match.params.movieId  in component we need to use withRouter(component name) in order to pass the info to parent
