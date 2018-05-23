import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux' 
import { logOutFB } from '../../redux/actions'

const FBSDK = require('react-native-fbsdk')
const { LoginManager } = FBSDK

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <View style={styles.container}>
                <Text> Are you sure you want to log out? </Text>
                <TouchableOpacity onPress={this.logOut.bind(this)} style={styles.logout} >
                    <Text style={styles.buttonText}>Log Out</Text>
                </TouchableOpacity>       
            </View>
         )
    }
    // Logs user out of Facebook, sets state to false, routes to login.
    logOut() {
        LoginManager.logOut();
        this.props.loggedOut;
        this.props.navigation.navigate('Home');
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF',
    },
    logout: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#3b5998",
      padding: 10,
      borderRadius: 5
    }
})

const mapDispatchToProps = dispatch => {
    return {
        loggedOut: () => dispatch(logOutFB())
    }
}
 
export default connect(null, mapDispatchToProps)(Logout);