 // eslint-disable-next-line 
 import React, { Component } from 'react';

 class SearchResult extends Component {
     
     // Complete render method below
     render() {
         return (
             <tr className="userComp">
                 {/* get user's data from the database */}
                {this.props.state.searchResults}
 
                 <td>
                     <button id="deleteButton" data-db-id={this.props.user._id} onClick={this.props.deleteUser}>
                         Delete
                     </button>
                 </td>
             </tr>
         );
     }
 }
 
 export default SearchResult;