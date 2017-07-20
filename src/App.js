import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      comments: [{
        comment: '',
        author: ''
      }],
      name: '',
      nasa: {},
    };
  }

  // This is one way of handling multiple inputs in a form without have to have multiple 'handleInputChange' methods for each input.
  handleInputChange(key) {
    return function (event) {
      var state = {};
      state[key] = event.target.value;
      this.setState(state);
    }.bind(this);
  }

  // Somehow you have handle what happens when the form is submitted.
  // The initial state should give you a hint of what needs to be set upon submission.
  // You will need to set the state in such a way that you can access 'comment' and 'author'
  // When the 'comments' element gets rendered.
  // 'Handle' the form here:
  handleSubmit(event) {
    event.preventDefault();
    const {comments, input, name} = this.state;
    this.setState({
      comments: [
        ...comments,
        {
          comment: input,
          author: name
        }
      ]
    });
  }


// Make sure that we're fetching data using the right lifecycle hook.
  componentWillMount() {
    let update = localStorage.getItem("comments");
    this.setState({savedComments: update});
    console.log('did', this.state)
  fetch('https://api.nasa.gov/planetary/apod?api_key=NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo').then((response) => {
    console.log(response)
    return response.json()
  }).then((data) => {
    let nasa = data
    // Set state here...
    this.setState({nasa: nasa})
  })
}

  render() {
    let nasa = this.state.nasa;
    return (
      <div className="App container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="jumbotron">
              <h1>Welcome to NASA</h1>
            </div>
          </div>
        </div>
        <section className="row">
          <div className="col-md-10 offset-md-1">
          <h1 className="display-3">{nasa.title}</h1>
          <div className="col-md-6">
            <img className="img-fluid" alt="mars" src={nasa.url}/>
          </div>
          <div className="col-md-6">
            <p>{nasa.explanation}</p>
            <div className="card">
              <div className="card-block">
                <h3>Leave A Comment</h3>
                <form>
                  <div className="form-group">
                    <textarea className="form-control" name="comment" onChange={this.handleInputChange('input')} rows="3" type="text" value={this.state.input}></textarea>
                  </div>
                  <div className="form-group">
                    <input className="form-control col-md-3" name="name" onChange={this.handleInputChange('name')} type="text" value={this.state.name}/>
                  </div>
                  <div className="form-group pull-right">
                    <input className="btn btn-primary btn-lg" type="submit" onSubmit={this.handleSubmit} value="Submit"/>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        </section>
        <section className="row">
          <div className="col-md-10 offset-md-1">
            <div className="card comments">
              <div className="card-block">
              <h4 className="card-subtitle mb-2 text-muted">Comments</h4>
                <div className="card comments col-md-5">
                  {this.state.comments.map((comment, index) => {
                    console.log(comment);
                    return (
                      <div key={index}>
                        <p>{comment.comment}</p>
                        <p>{comment.author}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default App;
