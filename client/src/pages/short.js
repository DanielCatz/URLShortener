import React, {Component} from 'react';
import Navbar from './components/navbar';
class Short extends Component{
    
    constructor() {
        super();
        this.state = { 
          error: null,
          url: '',
          message:''
          };
      }

      componentDidMount() {
        var key = window.location.href.split('/')[3];
        console.log(key);
        
       
      }
    
    
    
    render(){
        return(
            <div>
                <Navbar />
                <div className="container">
                <h2>Redirecting</h2>
                </div>
            </div>


        );
    }
}

export default Short;