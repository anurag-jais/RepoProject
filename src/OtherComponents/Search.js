import React,{ Component } from 'react';
import './Search.css';

class Search extends Component{
    search_title_description = (event)=>{
        event.preventDefault();
        console.log(event.target.elements.search_bar.value);
        this.props.search(event.target.elements.search_bar.value); 
    }
    render(){
        return(
            <div >
                <form onSubmit={()=>{this.search_title_description(event)}}>
                    <input id="search_bar"  type="text" name="search" 
                    placeholder="Search Title and Description"></input>
                    <button>Search</button>
                </form>
            </div>
        );
    }
}



export default Search;