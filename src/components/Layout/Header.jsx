import React from 'react'

// Import styles
import '../../assets/css/header.scss';

const Header = () => {


    return (
      <>
        <header>
            <div className="mu-sticky--wrapper">
                <span id='Mu'>Mu</span>
                <span id='Prod'>Production</span>
                <span id='Diff'><span id='and'>&</span><br></br>Diffusion des</span>
                <span id='Art'><br></br>Arts chorégraphiques</span>
            </div>
            <div className="menu-wrapper">
                <button>Menu</button>
            </div>
        </header>
      </>
    )
  }
  
  export default Header