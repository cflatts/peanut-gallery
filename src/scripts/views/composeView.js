import React from 'react'
import Header from './header'
import ACTIONS from '../actions'
import {User} from '../models/models'

const ComposeView = React.createClass({
	 render: function() {
	 	return (
	 		<div className = 'composeView' >
	 			<Header />
	 			<h3>Post a dish!</h3>
	 			<DishPostingForm />
	 		</div>
	 	)
 	}
})

//STEP 7 (CREATE FORM TO COMPOSE NEW POST)
const DishPostingForm = React.createClass({

    _handleSubmit: function(evt) {
        evt.preventDefault() //keeps the page from refreshing everytime you interact with the form (hold over from early internet)

        ACTIONS.saveDish(dishObj)
    },

	render: function() {
		return (
			<div className = 'dishPostingForm'>
                <form onSubmit = {this._handleSubmit}>
                    <input type = 'text' name = 'title' placeholder = 'Title' />
                    <textarea name = 'description' placeholder = 'Tell me about your meal!'></textarea>
                    <button type = 'submit'>Submit</button>

                </form>
			</div>
			)
	}
})

export default ComposeView
