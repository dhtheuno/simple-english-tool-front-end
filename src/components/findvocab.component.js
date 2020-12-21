import React, { Component } from "react";
import FindvocabService from "../services/findvocab.service";
import Highlighter from "react-highlight-words";
import { trackPromise } from 'react-promise-tracker';

export default class Findvocab extends Component {
    constructor(props){
        super(props);
        this.onChangePassage = this.onChangePassage.bind(this);
        this.onChangeWord = this.onChangeWord.bind(this);
        this.findVocab = this.findVocab.bind(this);      
        this.newPassage = this.newPassage.bind(this);
        this.showVocab = this.showVocab.bind(this);

        this.state = {
            passage: "",
            word: "",
            output: "",
            found: false
        };
    }

    onChangePassage(e){
        this.setState({
            passage: e.target.value
        });
    }
    
    onChangeWord(e){
        this.setState({
            word: e.target.value
        });
    }
    findVocab() {
        var data = {
            word: this.state.word,
            sentence: this.state.passage
        };
        trackPromise(
        FindvocabService.find(data).then(response => {
            this.setState({
                found: true,
                output: response.data.words
            });
            console.log(response.data)
            console.log(this.state.found)
            console.log(this.state.output)
        }))
        .catch(e => {
            console.log(e)
        });
    }

    newPassage() {
        this.setState({
            passage: '',
            word: '',
            output: "",
            found: false

        })
    }
    showVocab() {
      const vocab_list = this.state.output
      console.log(vocab_list)
      const final_vocab = []
      const final_index = []
      if (vocab_list.length === 0) {
        return (
          <h4>We <b>CAN'T FIND</b> the word!</h4>
        )
      }
      else {
        for (var i =0; i < vocab_list.length; i++){
          final_vocab.push(vocab_list[i]["word"])
          final_index.push(vocab_list[i]["index"])
        }
        return (
          <Highlighter
            highlightClassName="YourHighlightClass"
            searchWords={final_vocab}
            autoEscape={true}
            textToHighlight= {this.state.passage}
          />
        )
      }
    }

    render() {
        return (
          <div className="submit-form">
            {this.state.found ? (
              <div>
                <div>
                  {this.showVocab()}
                </div>
                <button className="btn btn-success" onClick={this.newPassage}>
                  New
                </button>
              </div>
            ) : (
              <div>
                <div className="form-group">
                  <label htmlFor="word">Word</label>
                  <input
                    type="text"
                    className="form-control"
                    id="word"
                    required
                    value={this.state.word}
                    onChange={this.onChangeWord}
                    name="word"
                  />
                </div>
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
                <button onClick={this.findVocab} className="btn btn-success">
                  Find
                </button>
              </div>
            )}
          </div>
        );
      }
}