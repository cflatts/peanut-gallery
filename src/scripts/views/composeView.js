import React from 'react'
import Header from './header'

const ComposeView = React.createClass({
	 render: function() {
	 	return (
	 		<div className = 'composeView' >
	 			<Header />
	 			<h3>post a dish!</h3>
	 			<DishPostingForm />
	 		</div>
	 	)
 	}
})

//STEP 7 (CREATE FORM TO COMPOSE NEWP OST)
const DishPostingForm = React.createClass({
	render: function() {
		return (
			<div className = 'dishPostingForm'>
                <form>
                    <input type = 'text' name = 'title' placeholder = 'Title' />
                    <textarea name = 'description' placeholder = 'Tell me about your meal!'></textarea>
                    <button type = 'submit'>Submit</button>

                </form>
			</div>
			)
	}
})

export default ComposeView
