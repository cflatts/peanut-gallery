//STEP 6 (CREATE ACTIONS MODULE)

import {User, DishModel} from './models/models'
import DISH_STORE from './store'
import toastr from 'toastr'

const ACTIONS = {

    //WE WANT TO LOG THE USER IN IMMEDIATELY AFTER THEY REGISTER (AS LONG AS THEY REGISTER SUCCESFULLY) THE FIRST METHOD REGISTERS AND THE SECOND LOGS THEM IN
    //.then takes two callback functions, both of these methods use that to create either a 'success' function or a 'failure' function
    registerUser: function(userObj) { //input name doesn't actually matter, we just named it the same as the object that is getting passsed in for our own peace of mind
        User.register(userObj).then( () => ACTIONS.logUserIn(userObj.email, userObj.password),
            (error) => {
                alert('FAILURE TO REGISTER')
                console.log(error)
            }
        )

    },
    //toastr items are for cool alerts
    logUserIn: function(email, password) {
        User.login(email, password).then(
            (responseData) => {
                toastr.success(`user ${email} logged in!`)
                console.log(responseData)
                location.hash = 'home' //want the page to re-route to the home page after successfull login
            },
            (error) => {
                toastr.error('FAILURE LOGGING IN')
                console.log(error)
            }
        )
    },

    logUserOut: function() { // we want the page to reroute to the login page after a user has logged out (server keeps track os user being logged in with a 'session')
        User.logout().then(
            () => location.hash = 'login'
        )
    },

    //STEP 8 (CREATE SAVE METHOD IN ACTIONS, THIS WILL CREATE THE NEW INSTANCE OF THE MODEL)
    saveDish: function(dishObj) {
        var dish = new DishModel(dishObj)
        dish.save().then(
            (responseData) => { //all three statments are ways to confirm success
                alert('Thanks for your submission!')
                location.hash = 'home'
                console.log(responseData)
            },
            (error) => {
                alert('Sorry, your post was not successful')
                console.log(error)
            }
        )
    },

    //STEP 14 CREATE FETCH METHOD
    fetchDishes: function(inputQuery) {
        DISH_STORE.data.collection.fetch({
            data: {
                tags: inputQuery
            }
        })
    },

    likeDish: function(dish, userObj) { //modify dish, adding user ID (we passed the whole object in case we wanted to make modifications in the future) to the likes, step 2 save to the server

    }
}

export default ACTIONS