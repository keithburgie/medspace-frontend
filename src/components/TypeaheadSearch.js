import React, {Component, Fragment} from 'react'
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';

class TypeaheadSearch extends Component {
  state = {
    disabled: false,
    dropup: false,
    flip: true,
    highlightOnlyResult: true,
    minLength: 2,
    open: undefined,
    selectHintOnEnter: true
  };

  render() {
    const data = this.props.options

    return (
      <Fragment>
        <Typeahead
          {...this.state}
          id={"school-search"}
          labelKey={option => option.name}
          options={data.map(i => Object.assign({id: i.id, name: i.name}))}
          placeholder="Choose a school..."
        />
      </Fragment>
    );
  }
}

export default TypeaheadSearch