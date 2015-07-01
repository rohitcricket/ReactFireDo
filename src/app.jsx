var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var Header = require('./header');
var List = require('./list');
var rootUrl = 'https://todos4react.firebaseio.com/'; //connecting to firebase 

var App = React.createClass({
	mixins: [ ReactFire ], 
	getInitialState: function(){
		return {
			items: {},
			loaded: false
		}
	},
	// A mixin is a group of methods by React that sits on one object that gets copied on other objects, in this case 'this'
	componentWillMount: function(){ //React object
		this.fb = new Firebase(rootUrl + 'items/');
		this.bindAsObject(this.fb, 'items'); 
		this.fb.on('value', this.handleDataLoaded);
		// bindAsObject by ReactfFire
		//this.state.items => {} is expected.
	},

  render: function() {
  	//console.log(this.state);
    return <div className = "row panel panel-default">
    	<div className = "col-md-8 col-md-offset-2">
    		<h2 className = "text-center">
    			To-Do List
    		</h2>
    		<Header itemsStore = {this.firebaseRefs.items} /> 
        <hr />
    		<div className = {"content " + (this.state.loaded ? 'loaded' : '')}>
    			<List items = {this.state.items} /> 
          {this.deleteButton()}
    		</div>
    	</div>
    </div>
  },

  deleteButton: function() {
    if(!this.state.loaded) {
      return 
    } else {
      return <div className = "text-center clear-complete">
        <hr />
        <button 
          type = "button"
          onClick={this.onDeleteDoneClick}
          className="btn btn-default">
            Clear Complete 
        </button>
      </div>
    }
  },

  onDeleteDoneClick: function() {
    for (var key in this.state.items){
      if (this.state.items[key].done === true){
        this.fb.child(key).remove();
      }
    }
  },

  handleDataLoaded: function() {
  	this.setState({loaded: true});
  }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
