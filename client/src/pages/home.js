import React, { Component } from "react";
import Navbar from "./components/navbar";
import ShortenForm from "./components/shortenform";
import BijectiveHash from "./business/utils";
import API from "./business/api";
class Home extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      url: "",
      message: ""
    };
  }

  onChangeText = e => {
    const newState = this.state;
    newState[e.target.name] = e.target.value;
    this.setState({ url: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    var { url } = this.state;
    if (!url) {
      console.log("empty");
      return;
    }
    url = url.replace(/^https?:\/\//, ""); //strip protocol

    API.InsertIncompleteUrlEntry(url).then(res => {
      if (!res.data.success)
        //failed
        this.setState({ error: res.error.message || res.error });
      else {
        var id = res.data.insertId;
        var urlHash = BijectiveHash.encode(id);
        API.UpdateShortenedUrl(id, urlHash).then(res => {
          if (!res.data.success)
            this.setState({ error: res.error.message || res.error });
          else {
            this.setState({
              message:
                window.location.protocol +
                "//" +
                window.location.host +
                "/" +
                urlHash
            });
          }
        });
      }
    });
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <h2>URL Shortener</h2>
          <p>Paste a link to be shortened</p>

          <p>{this.state.message} </p>
          <div className="form">
            <ShortenForm
              url={this.state.url}
              handleChangeText={this.onChangeText}
              handleSubmit={this.onSubmit}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
