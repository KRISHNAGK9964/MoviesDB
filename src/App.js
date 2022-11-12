import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import Banner from './components/Banner/Banner';
import List from './components/List/List';
import Favourites from './components/favourites';

import { BrowserRouter ,  Route , Routes, Switch} from 'react-router-dom';
function App() {

  const [MoviePageId, setMoviePageId] = useState("");

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<> <Banner /><List setMoviePageId={setMoviePageId}/></>}></Route>
        <Route path='/fav' element={<Favourites setMoviePageId={setMoviePageId}/>}></Route>
      </Routes>
      {/* <Banner /> */}
    </BrowserRouter>
  );
}

export default App;
