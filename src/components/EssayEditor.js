import React, { Component } from 'react';
import API from '../routes'
import { EditorState, ContentState, convertToRaw, Editor } from 'draft-js';
import styles from './EssayEditor.module.scss';
import debounce from 'lodash/debounce';

class EssayEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      essay: null,
      wordCount: 0,
      wordLimit: 0,
      saved: false
    };
  }

  saveContent = debounce((content) => {
    const obj = convertToRaw(content)
    const newText = obj.blocks[0].text

    if (this.state.essay !== null) {
      let {essay} = this.state
      API.patch(`essays/${essay.id}`, {text: newText})
      .then(essay => {
        this.setState({ saved: true })
        this.timer = setTimeout(_ => {
          this.setState({saved: false});
        }, 2000);
      })
    } 
    else {
      API.post(`essays`, {
        prompt_id: this.props.prompt_id,
        text: newText,
        user_id: 1
      }).then(essay => {
        this.setState({ 
          essay: essay.data,
          saved: true
        }, () => {
          this.timer = setTimeout(_ => {
            this.setState({saved: false});
          }, 2000);
        })
      })
    }

  }, 1000);

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
        essay: essay,
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

    let {wordCount, wordLimit, editorState, saved} = this.state
    

    if (!this.state.editorState) {
      return (
        <h3 className="loading">Loading...</h3>
      );
    }
    return (
      <div className={styles.textEditor}>
        <Editor
          editorState={editorState}
          onChange={this.onChange}
        />
        <span className={styles.wordCount}>Word Count: {wordCount}/{wordLimit}<span data-saved className={saved ? styles.saved : ''}>Essay Saved...</span></span>
      </div>
    );
  }
}

export default EssayEditor