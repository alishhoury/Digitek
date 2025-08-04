import "./style.css";
import Prev from "../../assets/arrow-left.svg";
import Next from "../../assets/arrow-right.svg";
import api from "../../services/axios";
import { useEffect } from "react";
import { useSelector } from "react-redux"; 




const Pagination = ({ onPageChange, currentPage }) => {
  const paginationState = useSelector(state => state.pagination);

  const on = paginationState.hasNext

  const Prevpage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }
  
  const Nextpage = () => {
    onPageChange(currentPage + 1);
  }

  useEffect(() => {
    console.log(on);
  }, [paginationState]);

  return (
    <div className="pagination-container">
       <img src= {Prev} className={currentPage === 1 ? "off" : "prev"} onClick={Prevpage} />
          <div className="current-page">{currentPage}</div>
       <img src = {Next} className={on ? "next" : "off"} onClick={Nextpage}/>
        
    </div>
  );
};

export default Pagination;
