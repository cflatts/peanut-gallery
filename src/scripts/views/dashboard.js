import React from 'react'
import Header from './header'
import DISH_STORE from '../store'
import ACTIONS from '../actions'

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

    componentWillUnmount: function() {
        DISH_STORE.off('updateContent')
    },

    //STEP 14 CREATE FUNCTION TO HANDLE SERACHING FOR POSTS BY TAG
    _handleTagSearch: function(evt) {
        if(evt.keyCode === 13) {
            ACTIONS.fetchDishes.(evt.target.tags.value)
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
	render: function() {
		return (
			<div className="dish">
				<p>{this.props.dishModel.get('title')}</p>
				<p>{this.props.dishModel.get('description')}</p>
                <p>{this.props.dishModel.get('tags')}</p>
            {/*STEP 15 ADD IMAGE TO RENDER*/}
                <img className = 'dishImage' src = {this.props.dishModel.get('imageUrl')} />
			</div>
			)
	}
})

export default Dashboard
