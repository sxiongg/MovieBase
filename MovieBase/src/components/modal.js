import React, { Component } from 'react'
import { View, Text, Modal, Image, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import { hideModal } from '../../redux/actions'
import { saveMovieAsync } from '../../redux/actions'

class MovieDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <Modal
            animationType="slide"
            transparent={false}
            visible={this.props.modalVisible}>
                <View>
                    <View style={styles.buttons}>
                        <TouchableOpacity >
                            <Icon onPress={this.props.hideModalRedux} name="chevron-down" color="#000000" size={20}/>
                        </TouchableOpacity>  
                        <TouchableOpacity>
                            <Icon onPress={this.props.saveMovie} name="heart" color="#d63031" size={20} />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={styles.heading}> {this.props.title} ({this.props.year}) </Text>
                    </View> 
                    <Image source={{uri: this.props.poster}} style={{width: 300, height: 350}} />
                    <Text style={styles.font}> Rated: {this.props.rated} </Text>
                    <Text style={styles.font}> Genre: {this.props.genre} </Text>
                    <Text style={styles.font}> IMDB Rating: {this.props.rating} </Text>
                    <Text style={styles.font}> {this.props.plot} </Text>
                    <Text style={styles.font}> Director: {this.props.director} </Text>
                    <Text style={styles.font}> Actors: {this.props.actors} </Text>  
                </View>
            </Modal>
         )
    }
}

const styles = StyleSheet.create({
    buttons: {
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            marginTop: 25, 
            marginBottom: 15, 
            padding: 10
    },
    font: {
        fontFamily: "HelveticaNeue-Light"
    },
    heading: {
        fontFamily: "HelveticaNeue-Medium", 
        fontSize: 20, 
        textAlign: "center"}
})

const mapStateFromRedux = state => {
    return {
        modalVisible: state.modalVisible,
        title: state.details.Title,
        year: state.details.Year,
        poster: state.details.Poster,
        rated: state.details.Rated,
        genre: state.details.Genre,
        rating: state.details.imdbRating,
        plot: state.details.Plot,
        director: state.details.Director,
        actors: state.details.Actors,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        hideModalRedux: () => dispatch(hideModal()),
        saveMovie: () => dispatch(saveMovieAsync())
    }
}
 
export default connect(mapStateFromRedux, mapDispatchToProps)(MovieDetails);