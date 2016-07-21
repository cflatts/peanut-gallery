import Backbone from 'backbone'
import _ from 'underscore'
import {DishCollection} from './models/models'

//STEP 12 SET UP STORE(BACKBONE EVENTS OBJECT SO ALL EVENTS ARE BROADCAST FROM HERE AND POINT TO THE EMIT CHANGE METHOD)
const DISH_STORE = _.extend(Backbone.Events, { //have to use underscore here because Backbone Events does not have an extend method like the models and collection do

    data: {
        collection: new DishCollection() //create new instance of the collection here
    },

    _emitChange: function() { //the underscore is for my peace of mind, i like knowing what is built in and what i make myself (there isn't anything built in here)
        this.trigger('updateContent') //this is an event we have created ourselves
    },

    _initialize: function() { //routes any content that syncs or updates go through the emit change method
        this.data.collection.on('sync update', this._emitChange.bind(this))
    }
})

DISH_STORE._initialize() //initializes the data before we export it

export default DISH_STORE