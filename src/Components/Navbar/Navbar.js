import styles from "./Navbar.module.css"
import logo from "./../../image/logo.png"

function Navbar(){
    return (
      <div className={styles.navbar}>
        <div className={styles.SideCorner}>
          <img src={logo} alt="Logo" className={styles.logoImg}/>
          <span className={styles.span}><a className={styles.anchortext} href="http://localhost:3000/">PhotoFolio</a></span>
        </div>
      </div>
    );
  }
  
  export default Navbar;
  