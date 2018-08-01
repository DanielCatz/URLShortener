import React, {Component} from 'react';
import Navbar from './components/navbar';
import BijectiveHash from './business/utils';

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
        var id = BijectiveHash.decode(key);
        console.log('row ' +id);
       
        fetch('api/redirect/'+ id)
        .then(origurl => origurl.json())
        .then((res) => {
            if (!res.success){
                this.setState({ message: res.error });
            }
            else { //redirect to site            
                if(res.origurl){
                window.location.replace('http://'+res.origurl.origurl);
                }
                else{//reirect to 404
                window.location.replace('expired');
                }
            }
        });    
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