import { AsyncStorage } from 'react-native'

const initialState = {
    user: [],
    loggedIn: false,
    details: [],
    modalVisible: false
}

const rootReducer = (state = initialState, action) => {
    if (action.type == 'SET_USER') {
        let userData = JSON.parse(action.payload)
        state = {
            ...state,
            user: userData,
            loggedIn: true
        }
        console.log("USER: " + state.user)
        console.log("Logged in: " + state.loggedIn)
    }
    if (action.type == 'SET_DETAILS') {
        state = {
            ...state,
            details: action.payload,
            modalVisible: true
        }
        console.log(state.details)
        console.log("Modal Visible: " + state.modalVisible)
    }
    if (action.type == 'HIDE_MODAL') {
        state = {
            ...state,
            modalVisible: false
        }
    }
    if (action.type == 'SAVE_MOVIE') {
        AsyncStorage.getItem(state.user.user.email)
            .then((res) => {
                let parsedData = JSON.parse(res)
                let newMovie = {
                    title: state.details.Title,
                    year: state.details.Year,
                    poster: state.details.Poster,
                    rated: state.details.Rated,
                    genre: state.details.Genre,
                    rating: state.details.imdbRating,
                    plot: state.details.Plot,
                    director: state.details.Director,
                    actors: state.details.Actors
                }
                parsedData.movies.push(newMovie)
                // Set state to new data.
                state.user = parsedData
                console.log("User: ")
                console.log(state.user)
                // Stores added movie to user data.
                AsyncStorage.mergeItem(state.user.user.email, JSON.stringify(parsedData)).then(() => {
                    console.log("Succesfuly saved movie")
                    alert("Movie saved to Favorites.")
                })
            })
    }
    if (action.type == 'LOG_OUT') {
        state = {
            ...state,
            loggedIn: false
        }
        console.log("User logged out.")
    }
    
    return state;
}

export default rootReducer