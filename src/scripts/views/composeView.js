import React from 'react'
import Header from './header'
import ACTIONS from '../actions'
import {User} from '../models/models'
import ReactFilepicker from 'react-filepicker'

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

    getInitialState: function() { //we did this here instead of the store because we are only setting a local state (store handles bigger data)
        return {
            currentDishRating: 0
        }
    },

    _handleSubmit: function(evt) {
        evt.preventDefault() //keeps the page from refreshing everytime you interact with the form (hold over from early internet)

        ACTIONS.saveDish({ //create the dish object right here on save (get the keys from the schema we set up)
            title: evt.currentTarget.title.value,
            description: evt.currentTarget.description.value,
            location: evt.currentTarget.description.value,
            rating: evt.currentTarget.rating.value,
            authorId: User.getCurrentUser()._id,
            authorEmail: User.getCurrentUser().email,
            tags: evt.currentTarget.tags.value.split(','),
            imageUrl: this.url ? this.url: '/images/empty-plate.jpg' //if there isn't a picture, or the picture upload fails it'll show the picture i selected of a random image(stored locally in dist/assets/images)
            })
    },

    _handleImage: function(result) {
        // console.log(result) test to make sure it works
        this.url = result.url //create a url property on the component
    },

    _handleRatingClick: function(evt) {
        this.setState ({
            currentDishRating: parseInt(evt.target.dataset.rating)
        })
    },

    _generateStarsJsx: function(ratingVal) { //how we are handling user rating of the dish
        var jsxStarsArray =[]
        for(var i = 1; i <= 5; i++) { //5 was arbitrarily chosen by us
            let starStyle = {fontSize: '30px'} //the default is that the font will be 30 px and the stars that are less than or equal to the rating value will turn yellow
            if(i <= ratingVal) {
                starStyle.color = 'yellow'
            }
            let jsxStar = <span style = {starStyle} data-rating = {i} onClick = {this._handleRatingClick} >&#9734;</span>
            jsxStarsArray.push(jsxStar)
        }
        return jsxStarsArray
    },

	render: function() {
		return (
			<div className = 'dishPostingForm'>
                <form onSubmit = {this._handleSubmit}>
                    <input type = 'text' name = 'title' placeholder = 'Title' />
                    <textarea name = 'description' placeholder = 'Tell me about your meal!'></textarea>
                    <input type = 'text' name = 'location' placeholder = 'Tell me where you ate!'/>
                    <input type = 'text' name = 'rating' placeholder = 'How was it?' />
                    {this._generateStarsJsx(this.state.currentDishRating)}
                    <input type = 'text' name = 'tags' placeholder = 'Tag your food!' />
                    {/*STEP 11 THIS IS TO UPLOAD IMAGES! (WE INSTALLED REACT-FILEPICKER AND ADDED IT TO package.json IN ORDER FOR THIS TO WORK!) */}
                    <ReactFilepicker apikey = 'A0hkVciLxQAuC7SR2RhKDz' onSuccess = {this._handleImage}/>
                    <button type = 'submit'>Submit</button>

                </form>
			</div>
			)
	}
})

export default ComposeView
