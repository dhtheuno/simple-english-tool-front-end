import React, { Component } from "react";
import ParaphraseService from "../services/paraphrase.service";
import { trackPromise } from 'react-promise-tracker';

export default class paraphrase extends Component {
    constructor(props){
        super(props);
        this.onChangePassage = this.onChangePassage.bind(this);
        this.generateParaphrase = this.generateParaphrase.bind(this);      
        this.newPassage = this.newPassage.bind(this);
        
        this.displayParaphrased = this.displayParaphrased.bind(this);

        this.state = {
            passage: "",
            output: "",
            generated: false
        };
    }
    onChangePassage(e){
        this.setState({
            passage: e.target.value
        });
    }

    generateParaphrase() {
        var data = {
            passage: this.state.passage
        };
        trackPromise(
        ParaphraseService.paraphrase(data).then(response => {
            this.setState({
                generated: true,
                output: response.data.passage
            });
            console.log(response.data)
            console.log(this.state.output)
        }))
        .catch(e => {
            console.log(e)
        });
    }
    newPassage() {
        this.setState({
            passage: "",
            output: "",
            generated: false
        })
    }
    displayParaphrased() {
        const test = []
        return(
            <div>
                <div><h4><b>Original Passage</b></h4></div>
                <div>
                    <h4>{this.state.passage}</h4>
                </div>
                <div><h4> </h4></div>
                <div><h4> </h4></div>
                <div><h4><b>Paraphrased Passage</b></h4></div>
                <div>
                    <h4>{this.state.output}</h4>
                </div>
            </div>
        )
    }
        
    render() {
        return (
          <div className="submit-form">
            {this.state.generated ? (
              <div>
                {this.displayParaphrased()}
                <button className="btn btn-success" onClick={this.newPassage}>
                  New
                </button>
              </div>
            ) : (
              <div>
                <div className="form-group">
                  <label htmlFor="Passage">Passage</label>
                  <input
                    type="text"
                    rows= {3}
                    className="form-control"
                    id="passage"
                    required
                    value={this.state.passage}
                    onChange={this.onChangePassage}
                    name="passage"
                  />
                </div>
                <button onClick={this.generateParaphrase} className="btn btn-success">
                  Paraphrase!
                </button>
              </div>
            )}
          </div>
        );
      }
}