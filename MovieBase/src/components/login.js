import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { setUser } from '../../redux/actions'
import Icon from 'react-native-vector-icons/FontAwesome'
import Title from './title'

const FBSDK = require('react-native-fbsdk')
const { LoginManager, GraphRequest, GraphRequestManager, AccessToken } = FBSDK

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  render() {
    return (
      <View style={styles.container}>
          <Title />
          <View style={{alignItems: 'center'}}>
          <Text style={{fontFamily: 'HelveticaNeue-Light', fontSize: 13}}>Please sign in with Facebook to continue.</Text>
          <TouchableOpacity onPress={this.logInToFacebook.bind(this)} style={styles.button}>
            <Icon name="facebook" size={50} color="#FFFFFF" />
          </TouchableOpacity>
          </View>

          {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('TabNav')}>
            <Text>Route To Tabs</Text>
          </TouchableOpacity>

        <TouchableOpacity onPress={() => { AsyncStorage.removeItem("sia.xiong@outlook.com")} }>
          <Text>Clear Asycn Item</Text>
        </TouchableOpacity>  */}
      </View>
    )
  }

  //  Login through Facebook SDK.
  logInToFacebook() {
    // Opens modal for login instead of browser.
    LoginManager.setLoginBehavior('web')
    LoginManager.logInWithReadPermissions(['email']).then(
      function (result) {
        if (result.isCancelled) {
          alert('Login was cancelled.')
        } else {
          // AccessToken from FB that allows application to get user info.
          AccessToken.getCurrentAccessToken()
            .then((data) => {
              let accessToken = data.accessToken
          
              // Callback function for GraphRequest.
              const responseInfoCallback = (error, result) => {
                if (error) {
                  console.log(error)
                  alert('Error fetching data: ' + error.toString())
                } else {
                  console.log(result)

                  // Store user info to AsyncStorage and send to Redux.
                  let user = {
                    user: {
                      id: result.id,
                      name: result.first_name,
                      email: result.email
                    },
                    movies: []
                  }
                  AsyncStorage.setItem(result.email, JSON.stringify(user), () => {
                    AsyncStorage.getItem(result.email, (err, result) => {
                      this.props.sendUserToRedux(result)
                    })
                  })
                  // Navigate to home screen.
                  this.props.navigation.navigate('TabNav')
                }
              }
              // GraphRequest that defines what information to retrieve and the callback.
              const infoRequest = new GraphRequest('/me', {
                accessToken: accessToken,
                parameters: {
                  fields: {
                    string: 'id, email, first_name'
                  }
                }
              }, responseInfoCallback);

              // Start the graph request.
              new GraphRequestManager().addRequest(infoRequest).start()
            })
        }
      }.bind(this),
      // Error function.
      function (error) {
        alert('Login fail with error: ' + error);
      }
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#55efc4',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#3b5998",
    padding: 12,
    borderRadius: 5,
    width: 75,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 15
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
      sendUserToRedux: user => dispatch(setUser(user))
  }
}

export default connect(null, mapDispatchToProps)(Login);