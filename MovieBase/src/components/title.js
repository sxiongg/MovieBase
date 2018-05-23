import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native'; 

class Title extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <View>
                <Text style={styles.title}>
                    MovieBase
                </Text>
            </View>
         )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 50,
        fontFamily: "Futura",
        marginTop: 25,
        shadowColor: '#FFF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    }
})
 
export default Title;