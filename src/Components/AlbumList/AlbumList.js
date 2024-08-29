import AlbumForm from "../AlbumForm/AlbumForm";
import styles from "./AlbumList.module.css"
import { useState , useEffect} from "react";
import Album from "../Album/Album";
import db from "../../FireBase/FireBaseInit";
import { addDoc, collection, onSnapshot} from "firebase/firestore";
import ImageList from "../ImageList/ImageList";


function AlbumList(){
  const [album, setAlbum] = useState([]);
  const [createAlbum, setCreateAlbum] = useState(false);
  const [albumOpen, setAlbumOpen]= useState({albumID:"", open: false});

  useEffect(()=>{
    onSnapshot(collection(db, "PhotoFolio"),(snap)=>{
      const folder = snap.docs.map((doc)=>{
        return{
          id: doc.id,
          ...doc.data()
        }
      })
      setAlbum(folder)
    })
  },[])

  //! Add Folder In fireBase and Update State (album)
  const addFolder = async (newFolder)=>{
    await addDoc(collection(db, "PhotoFolio"), newFolder);
  }
  //! Find By ID in Album(state)
  const findByID = async (id)=>{
    //its return  specific array find() by ID
    const specificAlbumObj = album.find((alb)=> alb.id === id)
    return specificAlbumObj;
  }
  // console.log("Refresh")
      return (
      <>
      
      {!albumOpen.open ? (
          <div className={styles.albumList}>
          {createAlbum ? <AlbumForm album={album} setAlbum={setAlbum} addFolder={addFolder} findByID={findByID}/> : null}
          
          {/* yourAlbumContainer */}
          <div className={styles.yourAlbumContainer}>
            <div className={styles.yourAlbum}>
              <h1>Your albums</h1>
            </div>
            <div className={styles.addcancleButton}>
              <button  className={`${createAlbum ? styles.cancle : styles.create}`} onClick={()=>{setCreateAlbum(!createAlbum)}}>
                {createAlbum ? "Cancle" : "Add album"}</button> 
            </div>
          </div>

          {/* imageAlbumContainer */}
          <div className={styles.imageAlbumContainer}>
            {album.map((album, index)=>(
              <Album album={album} index={index} key={album.id + index+ index} albumOpen={albumOpen} setAlbumOpen={setAlbumOpen}
              findByID={findByID}/>
            ))}
        
          </div>
        </div>
      ) : (<ImageList albumOpen={albumOpen} setAlbumOpen={setAlbumOpen} album={album} findByID={findByID}/>)}
      </>
    );
  }
  
  export default AlbumList;
  