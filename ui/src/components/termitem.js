import React, { PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Postings from './postings';

const POSTINGSSTYLE = {
  marginLeft: '15px'
};

class TermItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayPostings: false
    }

    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.handlePostingsClick = this.handlePostingsClick.bind(this);
  }

  componentWillReceiveProps(newprops) {
    this.setState({ displayPostings: false });
  }

  handlePostingsClick() {
    var display = !this.state.displayPostings;
    this.setState({ displayPostings: display });
  }

  render() {
    const s = this.state;
    const p = this.props;

    const postings = s.displayPostings ?
      <div style={POSTINGSSTYLE}>
        <Postings segment={p.segment} field={p.field}
         term={p.term} showAlert={p.showAlert}
         encoding={p.encoding} />
      </div> : null;

    const toggle = s.displayPostings ?
      'glyphicon-triangle-bottom' : 'glyphicon-triangle-right';

    return <div>
      <div><a href="#" onClick={ e => { e.preventDefault();
        this.handlePostingsClick() }}>
        {p.term}
        <span className={'glyphicon ' + toggle}
              style={{ fontSize: '11px', paddingLeft: '5px', color: 'lightgrey' }}
              aria-hidden="true"></span>
      </a></div>
      {postings}
      </div>;
  }
}

TermItem.propTypes = {
  segment: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  field: PropTypes.string.isRequired,
  term: PropTypes.string.isRequired,
  encoding: PropTypes.string.isRequired,
  showAlert: PropTypes.func.isRequired
}

export default TermItem;
