import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Services1 from './components/Services1';
import Services2 from './components/Services2';
import Services3 from './components/Services3';
import Place from './components/Place';
import CheckOut from './components/CheckOut';
import AddReviewsOnPlaces from './components/AddReviewsOnPlaces';
import UpdateReviewOnPlaces from './components/UpdateReviewOnPlaces';
import PlaceDetail from './components/PlaceDetail';
import Blogdetails from './components/Blogdetails';
import PostMonument from './components/PostMonument'

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' component={Place} />
          <Route exact path='/placedetails/:monument_id' component={Services1} />
          <Route exact path='/checkout' component={CheckOut} />
          <Route path="/reviewOnPlaces" component={Services2} />
          <Route path="/reviewOnPlaces/add" component={AddReviewsOnPlaces} />
          <Route path="/reviewOnPlaces/update/:id" component={UpdateReviewOnPlaces} />
          <Route path="/blog" component={Services3} />
          <Route path="/placeDetail" component={PlaceDetail} />
          <Route path="/blogdetails" component={Blogdetails} />
          <Route path="/addplace" component={PostMonument} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
