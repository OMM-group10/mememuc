import React from "react";
import { Link } from "react-router-dom";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import './navbar.css';


class Overview extends React.Component{


  constructor(props) {
    super(props);

    //TODO: initialize state with first batch of memes
    this.state = {
      items: Array.from({ length: 10 }),
      hasMore: true
    };
  ;
  }

  
  //TODO: implement
  fetchMoreData = () => {
    if (this.state.items.length >= 500) {
      this.setState({ hasMore: false });
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(Array.from({ length: 10 }))
      });
    }, 500);
  };

render() {
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
            
            {this.state.items.map((i, index) => (

              //Meme elements
              <div class="Overview-meme" key={index}>
                 <img src="./images/doge.jpg" alt="Doge" width="500" height="500"/> 
                 <br/>
                Meme - #{index}
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}
  export default Overview;