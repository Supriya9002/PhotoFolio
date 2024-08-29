import styles from "./Imagess.module.css";
import { useState } from "react";
import edit from "./../../image/editImage.png"
import dltImg from "./../../image/deleteImage.png"

function Imagess({imgagee, index, openBox, deletePhotoFn, editPhotoFn, setToUpdate}){
    const [currentHoverIndex, setCurrentHoverIndex] = useState(null);
    console.log(currentHoverIndex);
    return(
        <>
        <div className={styles.ImageList} key={index+1}
          onMouseOver={()=> setCurrentHoverIndex(index)} onMouseLeave={()=>setCurrentHoverIndex(null)}>
            <div className={styles.ImageContainer} key={index+2}>
                <img src={imgagee.imgUrl} alt="your-Image" key={index+3} onClick={()=> openBox(index)}/>
            </div>
            <span className={styles.span} key={index+4}>{imgagee.imgName}</span>
            <div className={`${styles.BtnContainder} ${currentHoverIndex === index && styles.active}`}>
                <img src={edit} alt="Edit" className={styles.edit} onClick={()=> editPhotoFn(imgagee,index)}/>
                <img src={dltImg} alt="Delete" className={styles.edit} 
                onClick={()=> {
                    setToUpdate({imgObj: "", index: ""})
                    deletePhotoFn(imgagee,index)
                }}/>
            </div>
        </div>                                        
        </>
    )
}

export default Imagess;