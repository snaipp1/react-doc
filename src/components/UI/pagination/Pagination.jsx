import React from "react";
import {getPagesArray} from '../../../utils/pages';

const Pagination = ({totalPages, page, changePage}) => {
    let pagesArray = getPagesArray(totalPages);
    return (
        <div className="page__wrapper">
        {pagesArray.map((p, id) =>
          <span 
            className={page === p ? "page page_current" : "page"}
            onClick = {() => changePage(p)} 
            key={id}
          >{p}</span> 
          )}
       </div>
    );
};

export default Pagination;