import './App.css';
import ActorsPage from './pages/ActorsPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Row } from 'react-bootstrap';
import MoviePage from './pages/moviePage';
import SingleMovie from './pages/singleMovie';
import { HashRouter, Link, Route } from 'react-router-dom';

function App() {
  return (
   
    <HashRouter>
      <div>
      <Container>
        <ul>
          <Row>
             <li> <Link to="/#/">Home Page </Link></li>
              {/* <a href="/#/">Home Page </a> */}
              {/* <a href="/#/movie/120">Movie </a> */}
              {/* <li> <Link to="/movie/120">Movie </Link></li> */}
              {/* <a href="/#/movie/22">Movie </a> */}
              <li>  <Link to="/movie/22">Movie</Link></li>
              {/* <a href="/#/actors">All Actors </a> */}
              <li>  <Link to="/actors">All Actors</Link></li>
              {/* <a href="/#//movies">All movies</a> */}
              <li> <Link to="/movies">All movies</Link></li>
            </Row>
        </ul>
        </Container>
      </div>
      <Container>
      {/* <ActorsPage></ActorsPage>
      <MoviePage></MoviePage> */}
        {/* movieId dynamic id */}
       <Route exact path= "/movie/:movieId">
      <SingleMovie></SingleMovie>
      </Route>
      </Container>
      <Container>
      {/* <ActorsPage></ActorsPage>
      <MoviePage></MoviePage> */}
       <Route exact path= "/actors">
      <ActorsPage></ActorsPage>
      </Route>
      <Route exact path= "/movies">
      <MoviePage> </MoviePage>
      </Route>
      <Route exact path= "/">
      <h1>Home Page</h1>
      </Route>
      </Container>
    </HashRouter>
  
  );
}

export default App;
// movieId gives new movie