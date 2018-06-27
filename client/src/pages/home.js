import React, {Component} from 'react';
import Navbar from './components/navbar';
import ShortenForm from './components/shortenform';
class Home extends Component{
    
    constructor() {
        super();
        this.state = { 
          error: null,
          url: '',
          message:''
          };
      }

    onChangeText = (e) => {
        const newState =this.state ;       
        newState[e.target.name] = e.target.value;
        this.setState({url: e.target.value});
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        const { url } = this.state;       
        if (!url){ 
            console.log('empty');
            return;
        }
       // console.log(url).json();

        fetch('api/shorten/'+ url)
        .then(shorturl => shorturl.json())
        .then((res) => {
          if (!res.success){
          this.setState({ message: res.error });
        }
          else {
              if(res.shorturl.length){
                console.log(res);  
                this.setState({ message: res.shorturl[0].shorturl });
              }
              else{
              var base = window.location.protocol+'//'+window.location.host;
              console.log(base);
                window.location.replace('http://www.google.com/');
            }
        }
        });    

    }
    
    
    
    render(){
        return(
            <div>
                <Navbar />
                <div className="container">
                    <h2>Bear</h2>
                    <p>Paste a link to be shortend</p>
                    <form className="form-inline mt-2 mt-md-0">
                    <input className="form-control mr-sm-2" type="text" placeholder="https://www.reddit..." aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Shorten</button>
                </form>
                </div>
                <div className="form">
                    <ShortenForm 
                    url = {this.state.url}                     
                    handleChangeText={this.onChangeText}
                    handleSubmit={this.onSubmit} />
                </div>
            </div>


        );
    }
}

export default Home;