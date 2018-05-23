import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import { setDetails } from '../../redux/actions'
import axios from 'axios' 

class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        // Destructuring of data to be used with this component.
        const { Poster, Title, Type, Year, imdbID} = this.props.movie;
        return ( 
            <View id={imdbID} style={{width:200, marginBottom: 10}}>
                <Text style={{fontFamily: "HelveticaNeue-Medium", fontSize: 15, textAlign: "center"}}> { Title } ({Year}) </Text>
                <TouchableOpacity onPress={this.getMovieInfo.bind(this, imdbID)}>
                    <Image source={ {uri: Poster} } style={{width: 200, height: 250}} />
                </TouchableOpacity>
            </View> 
         )
    }

    // HTTP Get request for movie details by ID (imdbID).
    getMovieInfo(id) {
        axios.get('https://www.omdbapi.com/?i=' + id + '&apikey=fd538e58')
            .then((response) => { 
                // console.log(response.data)
                // Redux. Set Modal to visible.
                this.props.sendDetailsToRedux(response.data)
            })
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendDetailsToRedux: details => dispatch(setDetails(details))
    }
}
export default connect(null, mapDispatchToProps)(Movie);