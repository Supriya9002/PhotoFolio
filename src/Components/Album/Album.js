
import styles from "./Album.module.css"
import albumLogo from "./../../image/AlbumLogo.png"

function Album({album, index, albumOpen, setAlbumOpen, findByID}){
    const handleClick = (album)=>{
        setAlbumOpen({albumID: album.id, open: true})
    }
    // console.log("In Album.js albumOpen", albumOpen)
    return(
                    <div className={styles.folderContainer} key={album.id + index}>
                        <div className={styles.folderImg} key={album.id +2} onClick={()=>handleClick(album)}>
                            <img src={albumLogo} alt="Folder Img" key={album.id +3}/>
                            </div>
                        <div className={styles.folderNameContainer} key={album.id +4}>
                            <span key={album.id}>{album.name}</span>
                        </div>
                    </div>
    )
}
export default Album;