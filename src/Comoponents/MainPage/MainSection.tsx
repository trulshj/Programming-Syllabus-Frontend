import React from 'react'
import './MainSection.css'
import {Link} from 'react-router-dom'

type Props = {
  start: any
}

const  MainSection: React.FC<Props> =({start}) => {
    return (
 <div className="home">
      <div className="overlay">
        <div className="home-content">
          <h1 className="home-title">Gi ditt bidrag for en bedre undervisningsopplegg</h1>
          <div className="home-text">
          Inspirer deg av andres undervisningsopplegg
          </div>
          <Link to='/articlelist'>
          <button className="btn hover-opacity" onClick={start}>Utforsk</button>
          </Link>
        </div>
      </div>
    </div>
        
       
        
    )
}

export default MainSection;
