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
    
    encode(num){
        var alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
        var  base = alphabet.length;
        var encoded = '';
        while (num){
          var remainder = num % base;
          num = Math.floor(num / base);
          encoded = alphabet[remainder].toString() + encoded;
        }
        return encoded;
    }  

    

    onSubmit = (e) => {
        e.preventDefault();
        var { url } = this.state;       
        if (!url){ 
            console.log('empty');
            return;
        }
        url = url.replace(/^https?:\/\//, ''); //strip protocol
       // console.log(url).json();
        var generated='';
       
        fetch('shorten/'+ url, {//add link seed
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }).then(res => res.json()).then((res) => {
            if (!res.success) this.setState({ error: res.error.message || res.error });
            else{
                var urlHash = this.encode(res.origurl.insertId);
                var id =res.origurl.insertId;
                fetch('shorten/', {//finalize shorten
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id, urlHash }),                    
                }).then(res => res.json()).then((res) => {
                    if (!res.success) this.setState({ error: res.error.message || res.error });
                    else{
                        console.log(urlHash+' at '+ id);

                        this.setState({message : window.location.protocol+'//'+window.location.host+'/'+urlHash }); 
    
                        
                    } 
                });
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
                    <p>{this.state.message} </p>
                    <div className="form">
                        <ShortenForm 
                        url = {this.state.url}                     
                        handleChangeText={this.onChangeText}
                        handleSubmit={this.onSubmit} />
                    </div>                    
                </div>
            </div>


        );
    }
}

export default Home;