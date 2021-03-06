import Backbone from 'backbone'
import $ from 'jquery'
import {app_name} from '../app'

//STEP 9 (CREATE MODEL AND COLLECTION FOR DISH, PROBABLY SHOULDVE BEEN DONE EARLIER, BUT HEY THIS IS HOW IT GOES)

const DishModel = Backbone.Model.extend ({
    urlRoot: '/api/dishes',
    idAttribute: '_id'
})

const DishCollection = Backbone.Collection.extend ({
    model: DishModel,
    url: '/api/dishes'
})

// ..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
const UserAuthModel = Backbone.Model.extend({
	urlRoot: '/api/users',
	idAttribute: '_id'
})


UserAuthModel.register = function(userData) {
	return $.ajax({
		type: 'post',
		url: '/auth/register',
		data: userData
	})
}

UserAuthModel.login = function(email,password) {
	return $.ajax({
		type: 'post',
		url: '/auth/login',
		data: {
			email: email,
			password: password
		}
	}).then((userData) => {
		localStorage[app_name + '_user'] = JSON.stringify(userData)
		return userData
	},(err)=> {console.log(err.responseText)})
}

UserAuthModel.logout = function() {
	return $.getJSON('/auth/logout').then(()=>{
		localStorage[app_name + '_user'] = null
	})
}

UserAuthModel.getCurrentUser = function() {
	return localStorage[app_name + '_user'] ? JSON.parse(localStorage[app_name + '_user']) : null
}


// ..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
// ^^ DO NOT TOUCH ^^

// but, you may extend the UserAuthModel (which is a Backbone Model)
const User = UserAuthModel.extend({
	initialize: function(){

	}
})

export { User, DishModel, DishCollection }
