
import styles from "./ImageList.module.css"
import back from "./../../image/back.png"
import Imagess from "../Imagess/Imagess";
import { useEffect, useState , useRef} from "react";
import db from "../../FireBase/FireBaseInit";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import searchImg from "./../../image/search.png"
import clear from "./../../image/clear.png"

//! For Notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ImageList({albumOpen, setAlbumOpen ,album, findByID}){
    const [fromOpen, setFromOpen] = useState(false);
    const [currentFolderData, setCurrentFolderData] = useState(null);
    const [ImageArray, setImageArray] = useState([]);
    const [search, setSearch] = useState(false);
    const [searchText, setSearchText] = useState("");

    //! this is for update
    const [toUpdate, setToUpdate] = useState({imgObj: "", index: ""});

    //! Image Open 
    const [currentImage, setcurrentImage] = useState({url:"", open:false});
    const [Back, setBack] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);


    const inputName = useRef();
    const inputUrl = useRef();
    const inputSearch = useRef(); 
    
    useEffect(()=>{
        //! It is very Iprotance
        //!snapshot immediately with the current contents of the single document. Then, 
        //!each time the contents change, another call updates the document snapshot.
        onSnapshot(doc(db, "PhotoFolio", albumOpen.albumID), (doc) => {
            const data = doc.data()  
            setCurrentFolderData({id: doc.id, ...data});
            setImageArray(data.imageArr);
        });
    },[albumOpen.albumID])
    useEffect(()=>{
        if(search === true && inputSearch.current){
            inputSearch.current.focus();
        }
        if(fromOpen === true && inputName.current){
            inputName.current.focus();
        }
    });
    useEffect(()=>{
        if(toUpdate.imgObj.imgName !==null && toUpdate.imgObj.imgUrl !==null && fromOpen === true && inputName.current){
            if(toUpdate.imgObj.imgName !==undefined && toUpdate.imgObj.imgUrl !==undefined){
                inputName.current.value = toUpdate.imgObj.imgName;
                inputUrl.current.value = toUpdate.imgObj.imgUrl;
            }
        }else{
            return;
        }
    },[toUpdate,fromOpen])
    function clearInput(){
        inputName.current.value = '';
        inputUrl.current.value = '';
        inputName.current.focus();
    }
    const onSubmitHandler =async (e)=>{
        e.preventDefault();

        const newImageData = {
            imgName: inputName.current.value,
            imgUrl: inputUrl.current.value,
        }
        // console.log(newImageData);
        //! VVIP
        // it is for add Image
        if(toUpdate.index === ""){
            const specificAlbumObj = await findByID(albumOpen.albumID); 
            const docRef = doc(db, "PhotoFolio", currentFolderData.id)
            await updateDoc(docRef,{
            imageArr: [newImageData,...specificAlbumObj.imageArr]
            });
            clearInput();
            toast.success('Image added Successfully!');
        }else{ // it is for Update Image
            const updateImageArray = [...ImageArray]
            console.log(updateImageArray);
            updateImageArray[toUpdate.index] = newImageData;
            const docRef = doc(db, "PhotoFolio", currentFolderData.id);
            await updateDoc(docRef,{
                imageArr: updateImageArray,
            })
            clearInput();
            resetUpdate();
            setFromOpen(false);
            toast.success('Image updated Successfully!');
        }
    }
    //! Image Open Funtionality
    //! if you want to see Image and click it
    const openBox = (index)=>{
        setcurrentImage({url: ImageArray[index].imgUrl, open: !currentImage.open})
        setBack(true);
        setCurrentIndex(index)
    }
    //! it y click croxMar(X)
    const croxMarkClick = ()=>{
        setcurrentImage({url:"", open: !currentImage.open})
    }
    //! BackWord Image
    const backWordImg = (currentIndex)=>{
        if(ImageArray.length!==0){
            let newIndex = currentIndex === 0 ? ImageArray.length-1 : currentIndex - 1;
            setCurrentIndex(newIndex);
            setcurrentImage({url: ImageArray[newIndex].imgUrl, open:true});
        }
    }
    //! Forward Image
    const forwardImg = (currentIndex)=>{
        if(ImageArray.length!==0){
            let newIndex = currentIndex === ImageArray.length-1 ? 0 : currentIndex + 1;
            setCurrentIndex(newIndex);
            setcurrentImage({url: ImageArray[newIndex].imgUrl, open:true});
        }
    }
    // ! Delete Photo
    const deletePhotoFn =async (imgagee,index)=>{
        // console.log("Delete Photo",imgagee, index)
        // console.log(ImageArray);
        //delete from ImageArray and firebase
        const updateImageArray = ImageArray.filter((arr, i)=> i!==index)
        setImageArray(updateImageArray);
        const docRef = doc(db, "PhotoFolio", currentFolderData.id);
        await updateDoc(docRef, {
            name: currentFolderData.name,
            imageArr: updateImageArray
        })
        
        toast.success('Image deleted Successfully!');
    }
    //! search Function
    const searchFn = async()=>{
        setSearchText(inputSearch.current.value);
    }
    const toggleSearch = ()=>{
        setSearch(!search);
    }
    const toggleCrosMark = ()=>{
        setSearch(!search);
        setSearchText("");
    }
    //! Update Photo
    // const [toUpdate, setToUpdate] = useState(null); //main id pabo currentFolderData theke
    const editPhotoFn = (imgagee, index)=>{
        setToUpdate({imgObj: imgagee, index: index});
        setFromOpen(true);
    }
    //! reset toUpdate state
    const resetUpdate = ()=>{
        setToUpdate(({imgObj: "", index: ""}));
    }
    //! Clear Data
    const clearData = ()=>{
        inputName.current.value = "";
        inputUrl.current.value = ""
    }
    //! Test
    // console.log("MSD ",ImageArray)
    // console.log(currentImage)
    // console.log(currentFolderData)
    // console.log("Rohit",currentIndex)
    // console.log("searchText",searchText)
    // console.log("toUpdate",toUpdate)
    return(
        <>
        <ToastContainer/>
        {/* ! HARE MAIN LOGIC START */}
        {ImageArray.length!==0 ? (
            <>
             
            {/* ImageList Form */}
            {!fromOpen ? null : (
            <>
                <div className={styles.formContainer}>
                    <form className={styles.form} onSubmit={onSubmitHandler}>
                            <h1>Add image to {currentFolderData.name}</h1>
                            <div className={styles.inputContainer}>
                               <input type="text" placeholder="Title..." ref={inputName} required/>
                               <input type="url" placeholder="Image URL..." ref={inputUrl} required/>
                            </div>
                            <div className={styles.buttonContainer}>
                               <button className={styles.clear} onClick={()=>clearData()}>Clear</button>
                               <button type="submit" className={styles.add}>Add</button> 
                            </div>
                    </form>
                </div>
                </>
            )}
            {/* Header of ImageList */}
            <div className={styles.header}>
            
            {ImageArray.length === 0 ? (
                <>
                <div className={styles.backContainer}>
                    <img src={back} alt="backImg" onClick={()=>setAlbumOpen({albumID:"", open: !albumOpen.open})}/>
                </div>
                <div className={styles.textContainer}>
                    <span>No images found in the album.</span>
                </div>
                </>
                
            ) : 
            (
                <>
                    <div className={styles.backContainer}>
                        <img src={back} alt="backImg" onClick={()=>setAlbumOpen({albumID:"", open: !albumOpen.open})}/>
                    </div>
                   <div className={styles.textContainer2}>
                         <span>Images in {currentFolderData.name}</span>
                    </div>
                    <div className={styles.searchContainer}>
                        {!search ? (
                            <>
                            <img src={searchImg} className={styles.imageSearch} alt="search" onClick={toggleSearch}/>
                            </>
                        ) : (
                            <>
                             <input type="text" placeholder="Search..." ref={inputSearch} 
                             onChange={()=>searchFn()} />
                             <img src={clear} className={styles.imageclear} alt="clear" onClick={toggleCrosMark}/>
                            </>
                        )}
                    </div>
                </>
            )}
            
            <div className={styles.canAddbtn}>
                <button className={fromOpen ? styles.cancle : styles.create} 
                onClick={()=>{
                    setToUpdate({imgObj: "", index: ""})
                    setFromOpen(!fromOpen)
                }}>
                    {fromOpen? "Cancle": "Add Image"}
                </button>
            </div>
            </div>
            {/* Image Print */}
            <div className={styles.ImageListContainer}>
                {ImageArray.filter((imgagee)=>{
                    return searchText.toLocaleLowerCase() === "" 
                    ? imgagee 
                    : imgagee.imgName.toLocaleLowerCase().includes(searchText)
                }).map((imgagee, index)=>(
                <Imagess  imgagee={imgagee} index={index} currentImage={currentImage} 
                setcurrentImage={setcurrentImage} Back={Back} setBack={setBack} currentIndex={currentIndex} 
                setCurrentIndex={setCurrentIndex} openBox={openBox} deletePhotoFn={deletePhotoFn}
                setToUpdate={setToUpdate} editPhotoFn={editPhotoFn}/>
            ))}
            </div>
            </>
        ) :
        <>
            {/* Header of ImageList */}
            <div className={styles.header}>
            
            {ImageArray.length === 0 ? (
                <>
                <div className={styles.backContainer}>
                    <img src={back} alt="backImg" onClick={()=>setAlbumOpen({albumID:"", open: !albumOpen.open})}/>
                </div>
                <div className={styles.textContainer}>
                    <span>No images found in the album.</span>
                </div>
                </>
                
            ) : 
            (
                <>
                    <div className={styles.backContainer}>
                        <img src={back} alt="backImg" onClick={()=>setAlbumOpen({albumID:"", open: !albumOpen.open})}/>
                    </div>
                   <div className={styles.textContainer2}>
                         <span>Images in {currentFolderData.name}</span>
                    </div>
                    <div className={styles.searchContainer}>
                        {!search ? (
                            <>
                            <img src={searchImg} className={styles.imageSearch} alt="search" onClick={toggleSearch}/>
                            </>
                        ) : (
                            <>
                             <input type="text" placeholder="Search..." ref={inputSearch} 
                             onChange={()=>searchFn()} />
                             <img src={clear} className={styles.imageclear} alt="clear" onClick={toggleCrosMark}/>
                            </>
                        )}
                    </div>
                </>
            )}
            
            <div className={styles.canAddbtn}>
                <button className={fromOpen ? styles.cancle : styles.create} 
                onClick={()=>{
                    setToUpdate({imgObj: "", index: ""})
                    setFromOpen(!fromOpen)
                }}>
                    {fromOpen? "Cancle": "Add Image"}
                    </button>
            </div>
            </div>
            {/* ImageList Form */}
            {!fromOpen ? null : (
            <>
                <div className={styles.formContainer}>
                    <form className={styles.form} onSubmit={onSubmitHandler}>
                            <h1>Add image to {currentFolderData.name}</h1>
                            <div className={styles.inputContainer}>
                               <input type="text" placeholder="Title..." ref={inputName} required/>
                               <input type="url" placeholder="Image URL..." ref={inputUrl} required/>
                            </div>
                            <div className={styles.buttonContainer}>
                               <button className={styles.clear}>Clear</button>
                               <button className={styles.add}>Add</button> 
                            </div>
                    </form>
                </div>
                </>
            )}
        </>
        }

        {/* Image Open */}
        {currentImage.open ? 
        (
        <>
        <div className={styles.ImgOpenContainer}>
            <button className={styles.backword} onClick={()=>backWordImg(currentIndex)}>&#10094;</button>
            <img src={currentImage.url} alt="ImageShow" className={styles.showImage}/>
            <button className={styles.backword} onClick={()=>forwardImg(currentIndex)}>&#10095;</button>
            <button className={styles.croxMark} onClick={()=>croxMarkClick()}>&times;</button>
        </div>
        </>
        ) : 
        (null)}

        </>
        
    )
}

export default ImageList;