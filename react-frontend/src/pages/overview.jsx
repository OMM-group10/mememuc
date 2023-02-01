import React from "react";
import { Link } from "react-router-dom";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import './navbar.css';



class Overview extends React.Component{

  //Url to get memes
  baseUrl = new URL("http://localhost:3001/memes/list");
  PAGESIZE = 10;
  initialLoad = 0;

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      hasMore: true,

      options: {
        sort: {creationDate: 1},
        page: 0
      }
    };

  }

/*   componentDidMount(){
    console.log("Did Mount!")
    console.log(this.state);
    //load first batch/page
    if (this.state.items.length == 0) this.fetchMoreData();

    }
 */


  
  fetchMoreData = () => {

    console.log("Loading more Memes");

    //log state for debugging
    console.log("State:", this.state);

    //send options object stringified
    this.baseUrl.search = new URLSearchParams({options: JSON.stringify(this.state.options)}).toString();
    console.log(this.baseUrl);

    //send GET request for next page of memes
    //TODO: Error handling
    fetch(this.baseUrl)
      .then(res => res.json())
      .then(docs => {

        //update memes array
        this.setState({
          items: this.state.items.concat(docs)
        });


        //if less than 10 returned from server -> last page
        if(docs.length < this.PAGESIZE){
          this.setState({ hasMore: false });
          };

        //increment page number
        this.setState(state =>{
          let options = Object.assign({}, state.options);
          options.page = options.page +1;
          return { options };
        } )
    
        //console.log("single meme", docs[2])
        console.log("Array", docs)});


  };

render() {

  //componentDidMount() didn't work so this is a workaround
  if (!this.initialLoad){
    this.fetchMoreData();
    this.initialLoad = 1;
  }

    return (
      <div className="Overview">
        <ul>
        <li>
          <Link to="/" className="link">Home </Link>
        </li>
        <li>
          <Link to="/editor" className="link">Editor </Link>
        </li>
        <li>
          <Link to="/account" className="link">Account </Link>
        </li>
        <li>
          <Link to="/overview" className="link">Overview </Link>
        </li>
        <li>
          <Link to="/documentation" className="link">Documentation</Link>
        </li>
      </ul>
      <header className="Overview-header" >
          <h1>
           Hello Overview!!
          </h1>
        </header>
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
                <Link to={"/meme/" + meme._id}>
                <img src={meme.image} alt="Meme" width="600"/>
                </Link>
                 <br/>
                {meme.title} - #{index}
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}
  export default Overview;