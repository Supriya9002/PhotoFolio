import styles from "./AlbumForm.module.css"
import { useEffect, useRef} from "react";

//For Notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AlbumForm({album, setAlbum, addFolder, findByID}){
    const inputText = useRef()
    useEffect(()=>{
        inputText.current.focus();
    },[]);

    const clearData = async ()=>{
        inputText.current.value = "";
    }

    const clearInput = ()=>{
        inputText.current.value = "";
        inputText.current.focus();
    }

    const onSubmitHandler = async (e)=>{
        e.preventDefault()
        const newFolder = {
            name: inputText.current.value,
            imageArr: []
        };
        await addFolder(newFolder)
        clearInput();
        toast.success('Album added Successfully!');
    }
    return (
        <>
        <ToastContainer/>
      <div className={styles.albumForm}>
        <div className={styles.haaderContainer}>
            <h1 className={styles.header}>Create an album</h1>
        </div>
        <div className={styles.mainContainer}>
            <form onSubmit={onSubmitHandler}>
                <div className={styles.inputContainer}>
                    <input type="text" id="name" name="name" placeholder="Write Album Name..."
                    required ref={inputText} className={styles.input}/>
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.clear}  onClick={()=>clearData()}>Clear</button>
                    <button className={styles.create} type="submit">Create</button>
                </div>
            </form>
        </div>
      </div>
      </>
    );
  }
  
  export default AlbumForm;