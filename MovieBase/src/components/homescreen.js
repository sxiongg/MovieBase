import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, } from 'react-native'
import { SearchBar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import axios from 'axios'
import Title from './title'
import Movie from './movie'
import MovieDetails from './modal'

const FBSDK = require('react-native-fbsdk')
const { LoginManager } = FBSDK

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            searchResults: [],
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchBar}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {
                            clearTimeout(this.textTimeout)
                            this.textTimeout = setTimeout(() => this.setState({ input: text }), 100)
                        }}
                        value={this.state.input}
                        placeholder="Type here..." />
                        
                    <TouchableOpacity onPress={this.getApi.bind(this)} >
                        <Icon name="search" size={30} color="#55efc4" />
                    </TouchableOpacity>
                </View>

                {/* Renders search results. */}
                <ScrollView contentContainerStyle={{alignItems: "center"}}>
                    {this.state.searchResults.map((movie, index) => {
                        return (<Movie movie={movie} key={index} />)
                    })}
                </ScrollView>

                {/* Modal. */}
                <MovieDetails />
            </View>
        )
    }

    // HTTP Get request for movie search from OMDb API.
    getApi() {
        // Replaces spaces in input with plus signs for the URL.
        let movie = this.state.input.replace(" ", "+")
        axios.get('https://www.omdbapi.com/?s=' + movie + '&apikey=fd538e58')
            .then((response) => {
                console.log(response.data.Search)
                this.setState({ searchResults: response.data.Search })
            })
        }
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            // backgroundColor: ,
            marginTop: 30
        },
        input: { 
            height: 40, 
            width: 300, 
            padding: 10, 
            borderColor: '#000', 
            borderWidth: 1, 
            borderRadius: 4, 
            fontFamily: "HelveticaNeue-Light", 
            backgroundColor: "#FFF" },
        searchBar: {
            flexDirection: 'row', 
            justifyContent: 'space-around', 
            backgroundColor: "#2d3436", 
            padding: 7 
        },
    })

export default HomeScreen;