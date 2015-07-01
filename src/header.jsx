var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			text: ''
		}
	},

	render: function(){
		return <div className = 'input-group'>
			<input 
				value = {this.state.text} 
				onChange = {this.handleInputChange}
				type="text" 
				className="form-control" />
			<span className = "input-group-btn">
				<button 
					onClick = {this.handleClick}
					className = "btn btn-default" 
					type = "button">
					Add
				</button>
			</span>
		</div>
	},

	handleClick: function() {
		// send value of text value to Firebase
		this.props.itemsStore.push({ //not an array. Adding data to database
			text: this.state.text,
			done: false
		});

		this.setState({text: ''}); //controlled components; clean up after input
	},

	handleInputChange: function(event) {
		this.setState({text: event.target.value}); // target is DOM node reference, in this case is input
	}
});