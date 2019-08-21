import React, { Component } from 'react';
import API from '../routes'
import { EditorState, ContentState, Editor, convertToRaw, convertFromRaw } from 'draft-js';
import debounce from 'lodash/debounce';

class EssayEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      essay: null,
      wordCount: 0,
      wordLimit: 0
    };
  }

  saveContent = debounce((content) => {
    const obj = convertToRaw(content)
    const newText = obj.blocks[0].text

    if (this.state.essay !== null) {
      const {essay} = this.props
      API.patch(`essays/${essay.id}`, {text: newText})
      .then(console.log("Essay saved"))
    } 
    else {
      API.post(`essays`, {
        prompt_id: this.props.prompt_id,
        text: newText,
        user_id: 1
      }).then(essay => {
        this.setState({ essay: essay })
      })
    }
  }, 2000);

  updateWordCount = (content) => {
    const obj = convertToRaw(content)
    const string = obj.blocks[0].text
    this.setState({
      wordCount: string.split(' ').length
    })
  }

  onChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    this.saveContent(contentState);
    this.setState({ editorState });
    this.updateWordCount(contentState)
  }

  componentDidMount() {
    const {essay, limit} = this.props

    this.setState({wordLimit: limit})

    if (essay !== null) {
      this.setState({
        essay: essay.id,
        wordCount: essay.text.split(' ').length,
        editorState: EditorState.createWithContent(ContentState.createFromText(essay.text)) 
      })
    } else {
      this.setState({ 
        editorState: EditorState.createEmpty() 
      });
    }
  }
  

  render() {

    let {wordCount, wordLimit, editorState} = this.state
    

    if (!this.state.editorState) {
      return (
        <h3 className="loading">Loading...</h3>
      );
    }
    return (
      <div>
        <Editor
          editorState={editorState}
          onChange={this.onChange}
        />
        <span>Word Count: {wordCount}/{wordLimit}</span>
      </div>
    );
  }
}

export default EssayEditor