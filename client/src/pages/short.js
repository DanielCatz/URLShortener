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

      decode(str){
        var alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
        var  base = alphabet.length;
        var decoded = 0;
        while (str){
          var index = alphabet.indexOf(str[0]);
          var power = str.length - 1;
          decoded += index * (Math.pow(base, power));
          str = str.substring(1);
        }
        return decoded;
      }

      componentDidMount() {
        var key = window.location.href.split('/')[3];
        var id = this.decode(key);
        console.log('row ' +id);
       
        fetch('redirect/'+ id)
        .then(origurl => origurl.json())
        .then((res) => {
            if (!res.success){
                this.setState({ message: res.error });
            }
            else { //redirect to site
                console.log(res);
                console.log(res.origurl.origurl.length);
                if(res.origurl.origurl.length){
                    console.log(res.origurl.origurl);
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