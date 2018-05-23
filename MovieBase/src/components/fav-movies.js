import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { connect } from 'react-redux' 
import Movie from './movie'

class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <View>
                <ScrollView contentContainerStyle={{alignItems: "center"}}>
                    {this.props.favMovies.map((movie, index) => {
                        return (<Movie movie={movie} key={index} />)
                    })}
                </ScrollView>
            </View>
         )
    }
}

const mapStateFromRedux = state => {
    return {
        favMovies: state.user.movies
    }
}
export default connect(mapStateFromRedux)(Favorites);