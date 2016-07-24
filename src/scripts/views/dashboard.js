import React from 'react'
import Header from './header'
import DISH_STORE from '../store'
import ACTIONS from '../actions'
import {User} from '../models/models'
//STEP 13 SET UP LIFE CYCLE EVENTS
const Dashboard = React.createClass({

    getInitialState: function() {
        return DISH_STORE._getData()
    },

    componentWillMount: function() { //start listening to the store
        ACTIONS.fetchDishes()
        DISH_STORE.on('updateContent', () => {
            this.setState(DISH_STORE._getData())
        })
    },

    componentWillReceiveProps: function (newProps) {
        console.log('this.props: ', this.props)
        console.log('newProps: ', newProps)
        let queryForDishes
        if(newProps.routedFrom === 'dish/myDishes') {
         queryForDishes = {'authorId' : User.getCurrentUser()._id}
        }
        else {
            queryForDishes = {}
        }
        ACTIONS.fetchDishes(queryForDishes)

    },

    componentWillUnmount: function() {
        DISH_STORE.off('updateContent')
    },

    //STEP 16 CREATE FUNCTION TO HANDLE SERACHING FOR POSTS BY TAG
    _handleTagSearch: function(evt) {
        if(evt.keyCode === 13) {
            console.log(evt.target.value)
            ACTIONS.fetchDishes(evt.target.value)
            evt.target.value = ''
        }
    },

	render: function() {
        // console.log(this.state)
	 	return (
	 		<div className='dashboard' >
	 			<Header />
                <input onKeyDown = {this._handleTagSearch} type = 'text' placeholder = 'What tag would you like to search for?' />
	 			<h3>dashboard</h3>
	 			<DishContainer dishColl = {this.state.collection} />
	 		</div>
	 	)
 	}
})

const DishContainer = React.createClass({
	render: function() { //we map over the array of backbone models and return a single model
		return (
			<div className="dishContainer">
                {this.props.dishColl.map(
                    (model) => <Dish dishModel = {model} key = {model.id} />
                )}
			</div>
			)
	}
})

const Dish = React.createClass({

    _handleDelete: function() {
        ACTIONS.deletePost(this.props.record.request.params._id)
    },

    _handleLikes: function() {
        ACTIONS.likeDish(this.props.dishModel, User.getCurrentUser())
    },

	render: function() {
		return (
			<div className="dish">
				<p>{this.props.dishModel.get('title')}</p>
				<p>{this.props.dishModel.get('description')}</p>
                <p>tags: {this.props.dishModel.get('tags')}</p>
            {/*STEP 15 ADD IMAGE TO RENDER*/}
                <img className = 'dishImage' src = {this.props.dishModel.get('imageUrl')} />
                <button className = 'like' onClick = {this._handleLikes}>Like!</button>
                <button className = 'delete' onClick = {this._handleDelete}>X</button>
                <p>likes:{this.props.dishModel.get('likes').length}</p>
			</div>
			)
	}
})

export default Dashboard
