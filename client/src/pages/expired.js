import React, {Component} from 'react';
import Navbar from './components/navbar';
class Expired extends Component{
    
    constructor() {
        super();
        this.state = { 
          error: null,
          url: '',
          message:''
          };
      }
    
    render(){
        return(
            <div>
                <Navbar />
                <div className="container">
                <h2>I'm afraid I don't know that one</h2>
                </div>
            </div>


        );
    }
}

export default Expired;