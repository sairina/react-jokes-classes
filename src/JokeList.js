import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";
import { render } from "@testing-library/react";

//{ numJokesToGet = 10 }
class JokeList extends React.Component {
  static defaultProps = { numJokesToGet: 10 };
  
  constructor(props) {
    super(props);
    this.state = { jokes: [], seenJokes: [] }
  }

  // const [jokes, setJokes] = useState([]);

  /* get jokes if there are no jokes */

  async componentDidMount() {
    try {
      // Alissa note: a good way to keep your code clean is by abstracting
      // out chunks of code that accomplish a certain task (ie, call API)
      const apiJokes = await this._getJokes(this.props.numJokesToGet);
      const jokes = apiJokes.map(joke => { return { ...joke, votes: 0 } });
      this.setState({ jokes });
    } catch (err) {
      console.log(err);
    }
    
    /// YOUR STUFF ~~~~
    
    // let j = [...this.state.jokes];
    // let seenJokes = new Set();
    // console.log();
    
    // try {
    //   while (this.state.jokes.length < this.props.numJokesToGet) {
    //     let res = await axios.get("https://icanhazdadjoke.com", {
    //       headers: { Accept: "application/json" }
    //     });
    //     let { status, ...jokeObj } = res.data;
        
    //     if (!seenJokes.has(jokeObj.id)) {
    //       // console.log(seenJokes)
    //       seenJokes.add(jokeObj.id);
    //       // j.push({ ...jokeObj, votes: 0 });
    //     } else {
    //       console.error("duplicate found!");
    //     }
    //   }
    //   // this.setState({ jokes: j })
    // } catch (e) {
    //   console.log(e);
    // }
  }

  // Alissa note: preceding a function with '_' indicates that it's a private method
  // and tells other developers (and you) that it shouldn't be accessed externally
  async _getJokes(numJokes) {
    const headers = { Accept: "application/json" };
    // Alissa note: using the API as the documentation specifies, you circumvent 
    // the need to accommodate the case of duplicates all together
    const path = `https://icanhazdadjoke.com/search?limit=${numJokes}`;
    const { data } = await axios.get(path, { headers });
    return data.results;
  }

  // async componentDidUpdate() {
  //   let j = [...this.state.jokes];
  //   let seenJokes = new Set();
  //   try {
  //     while (this.state.jokes.length < this.props.numJokesToGet) {
  //       let res = await axios.get("https://icanhazdadjoke.com", {
  //         headers: { Accept: "application/json" }
  //       });
  //       let { status, ...jokeObj } = res.data;

  //       if (!seenJokes.has(jokeObj.id)) {
  //         seenJokes.add(jokeObj.id);
  //         j.push({ ...jokeObj, votes: 0 });
  //       } else {
  //         console.error("duplicate found!");
  //       }
  //     }
  //     this.setState({ jokes: j })
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  // useEffect(function() {
  //   async function getJokes() {
  //     let j = [...jokes];
  //     let seenJokes = new Set();
  //     try {
  //       while (j.length < numJokesToGet) {
  //         let res = await axios.get("https://icanhazdadjoke.com", {
  //           headers: { Accept: "application/json" }
  //         });
  //         let { status, ...jokeObj } = res.data;

  //         if (!seenJokes.has(jokeObj.id)) {
  //           seenJokes.add(jokeObj.id);
  //           j.push({ ...jokeObj, votes: 0 });
  //         } else {
  //           console.error("duplicate found!");
  //         }
  //       }
  //       setJokes(j);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }

  //   if (jokes.length === 0) getJokes();
  // }, [jokes, numJokesToGet]);

  /* empty joke list and then call getJokes */

  // generateNewJokes() {
  //   this.componentDidUpdate()
  // }
  // function generateNewJokes() {
  //   setJokes([]);
  // }

  /* change vote for this id by delta (+1 or -1) */

  vote(id, delta) {
    this.setState({
      jokes: allJokes => allJokes.map(j =>
        j.id === id ? { ...j, votes: j.votes + delta } : j)
    })
  }
  // function vote(id, delta) {
  // setJokes(allJokes =>
  //   allJokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
  // );

  /* render: either loading spinner or list of sorted jokes. */
  
  render() {
  if (this.state.jokes.length) {
    let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);
      return (
        <div className="JokeList">
          <button className="JokeList-getmore" onClick={this.generateNewJokes}>
            Get New Jokes
          </button>

          {sortedJokes.map(j => (
            <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={this.vote} />
          ))}
        </div>
      );

    }
    return null;
  }
};




export default JokeList;