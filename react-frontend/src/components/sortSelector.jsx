import { useState, useEffect } from "react";

//onApply runs after the Filter Changes are applied
function SortSelector({sortBy, setSortBy, onApply = (()=>{})}){

    //internal State for SortSelector component
    //const [state, setState] = useState(filterState);

    const handleAttrChange = (e) => {
            e.preventDefault();
            setSortBy((prev)=>{
            //console.log("Previous State:", prev);
            return {...prev, attr: e.target.value}
            })
            onApply();
          }
        
    const handleOrderChange = (e) => {
            e.preventDefault();
            setSortBy(prev => {
              return {...prev, order: parseInt(e.target.value)}
            })
            onApply();
          }

    
    return(
      
        <div>
            <form>
              <label>
                Sort by:
                <select name="attr" value={sortBy.attr} onChange={handleAttrChange}>
                  <option value="creationDate">Creation Date</option>
                  <option value="rating">Rating</option>
                </select>
                <select name="order" value={sortBy.order} onChange={handleOrderChange}>
                  <option value="1" >ascending</option>
                  <option value="-1" >descending</option>
                </select>
              </label>

            </form>
        </div>

    )

}

export default SortSelector;