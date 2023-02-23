import { useState, useEffect } from "react";

//onApply runs after the Filter Changes are applied
function Filter({filterState, setFilterState, onApply = (()=>{})}){

    const defaultFilter = {
        use: 0,
        attr: "none",
        value: 0,
        comparison: "$lt",
        query: {}
      }

    //internal State for filter component
    const [state, setState] = useState(filterState);

    //update state 
    const handleFilterChange = (e) => {
                setState((prev)=>{
                console.log("Previous State:", prev);
                return {...prev, [e.target.name]: e.target.value, use: 1}
                })
            }

    //reset state to default
    const resetFilter = (e) =>{
        e.preventDefault();
        setState(defaultFilter);
    }

    //update global Filter state
    const submitFilter = (e) =>{
        e.preventDefault();
        let applyState = state;
        if(state.attr=='none') applyState.use=0;
        setFilterState(applyState);
        onApply();
    }


    let valueInput;
    if(state.attr != "creationDate"){
      valueInput =
      <label>
      
      <select name="comparison" value={state.comparison} onChange={handleFilterChange}>
      <option value="$lt">Less than</option>
      <option value="$gt">More than</option>
      </select>

      <input name="value" value={state.value} type="number" onChange={handleFilterChange}></input>
      </label>
    }
    else{
      valueInput =
      <label>
      
      <select name="comparison" value={state.comparison} onChange={handleFilterChange}>
      <option value="$lt">Before</option>
      <option value="$gt">After</option>
      </select>

      <input name="value" type="date" onChange={handleFilterChange}></input>
      </label>
    }

    if(state.attr == "none"){
      valueInput = null
    }

    
    return(
      
        <div>
            <form onSubmit={submitFilter} onReset={resetFilter}>
              <label>
                Filter:
                <select name="attr" value={state.attr} onChange={handleFilterChange}>
                  <option value="rating">Rating</option>
{/*                   <option value="creationDate">Creation Date</option>
 */}                  <option value="none">None</option>
                </select>
              </label>

              {valueInput}

              <input type="reset" value="Reset" />
              <input type="submit" value="Apply" />
            </form>
        </div>

    )


}

export default Filter;