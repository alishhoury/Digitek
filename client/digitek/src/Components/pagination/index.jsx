import "./style.css";
import Prev from "../../assets/arrow-left.svg";
import Next from "../../assets/arrow-right.svg";
import api from "../../services/axios";
import { useEffect, useState ,createContext} from "react";




const Pagination = (page) => {
  const [Currentpage, setCurrentpage] = useState(1)
  const Prevpage = () => {
    Currentpage > 1 ? setCurrentpage(Currentpage-1) :Currentpage
  }
  const Nextpage = () => {
    setCurrentpage(Currentpage+1)
  }

   useEffect(() =>{
    console.log("page:",{Currentpage})
    page = Currentpage
   })

  return (
    <div className="pagination-container">
       <img src= {Prev} className="prev" onClick={Prevpage} />
          <div className="current-page">{Currentpage}</div>
       <img src = {Next} className="next" onClick={Nextpage}/>
        
    </div>
  );
};

export default Pagination;
