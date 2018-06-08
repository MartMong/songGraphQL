import React,{Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {Link} from 'react-router';

class SongList extends Component{

    onSongDelete(id){
        console.log('ondelete')

        

        this.props.mutate({variables:{id}})
            .then(()=>this.props.data.refetch());
        
    }

    renderSong(){
        return this.props.data.songs.map(song=>{
            return (
                <Link to = {`/song/${song.id}`}>
                    <li key={song.id} className="collection-item" >
                        {song.title}

                        <i  className = "material-icons"
                            onClick = { () => this.onSongDelete(song.id)}
                        >delete</i>
                        {/*delete is name of icon */}
                    </li>
                </Link>
            );
        });
    }

    render(){
        if(this.props.data.loading){
            return (<div>
                        loading...
                    </div>    
            );
        }
        console.log('abcd');
        return(
            
            <div>
                <ul className="collection">
                    {this.renderSong()} 
                </ul>
                <Link 
                    to = "/song/new"
                    className = "btn-floating red right"
                >
                    <i className="material-icons">add</i>
                </Link>
            </div>
        );
    }
}

const query = gql`{
    songs{
        id
        title
    }
}`;

const mutation = gql`
    mutation DeleteSong($id:ID){
        deleteSong(id:$id){
            id
        }
    }
`;


export default graphql(mutation)(
    graphql(query)(SongList)
//use two graphql to make more function  
);