import './App.css';
import Navbar from "./Components/Navbar/Navbar"
import AlbumList from "./Components/AlbumList/AlbumList"


function App(){
  return (
    <div className="App">

      {/* This is Navbar */}
      <Navbar/>

      {/* This is AlbumList */}
      <AlbumList/>
    </div>
  );
}

export default App;
