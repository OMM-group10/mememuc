import React from "react";
import { Link } from "react-router-dom";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import './navbar.css';
import Filter from "../components/filter";
import SortSelector from "../components/sortSelector";
import Navbar from "../components/navbar";



class Overview extends React.Component{

  //Url to get memes
  baseUrl = new URL("http://localhost:3001/memes/page");
  //PAGESIZE = 10;
  initialLoad = 0;

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      hasMore: true,
      
      pageSize: 10,
      page: 0,    

    };

  }

/*   componentDidMount(){
    console.log("Did Mount!")
    console.log(this.state);
    //load first batch/page
    if (this.state.items.length == 0) this.fetchMoreData();

    }
 */


  reloadMemes = () => {
    this.initialLoad = 0;
    this.setState({items:[], page: 0, hasMore:true})
   }
  
  fetchMoreData = () => {

    console.log("Loading more Memes");

    //log state for debugging

    //create params object to send in request
    let paramObject = {
      paging: {page: this.state.page, pageSize: this.state.pageSize},
      sortBy: this.props.sortBy,
      filter: this.props.filterState
    }

    //send params object stringified
    this.baseUrl.search = new URLSearchParams({params: JSON.stringify(paramObject)}).toString();
    //console.log(this.baseUrl);

    //send GET request for next page of memes
    //TODO: Error handling
    fetch(this.baseUrl)
      .then(res => res.json())
      .then(docs => {

        //update memes array
        this.setState({
          items: this.state.items.concat(docs)
        });


        //if less than pageSize returned from server -> last page
        if(docs.length < this.state.pageSize){
          this.setState({ hasMore: false });
          };

        //increment page number
        this.setState(prev =>{
          return{...prev, page:(prev.page+1)}
        })
    
        //console.log("single meme", docs[2])
        console.log("Array", docs)
        console.log("State:", this.state);
      
      });

  }

render() {

  //componentDidMount() didn't work so this is a workaround
  if (!this.initialLoad){
    this.fetchMoreData();
    this.initialLoad = 1;
  }

    return (
      <div className="Overview">
      <Navbar/>
      <header className="Overview-header" >
          <h1>
           Hello Overview!!
          </h1>
        </header>
        
        <SortSelector sortBy={this.props.sortBy} setSortBy={this.props.setSortBy} onApply={this.reloadMemes} />
        <Filter filterState={this.props.filterState} setFilterState={this.props.setFilterState} onApply={this.reloadMemes} />

          <div>
          <InfiniteScroll
            dataLength={this.state.items.length}
            next={this.fetchMoreData}
            hasMore={this.state.hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            
            {this.state.items.map((meme, index) => (

              //Meme elements
              //TODO: Add rating and link to single view page
              <div className="Overview-meme" key={meme._id}>
                <Link to={"/meme/" + meme._id} state={this.state}>
                <img src={meme.image} alt="Meme" width="600"/>
                </Link>
                 <br/>
                {meme.title} - #{index} <br/>
                Rating: {meme.rating} Created on: {new Date(meme.creationDate).toDateString()}
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}
  export default Overview;