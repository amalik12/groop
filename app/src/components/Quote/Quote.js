import React from 'react';
import SimpleMarkdown from 'simple-markdown';
import './Quote.css';
import Avatar from '../Avatar';
import Timestamp from '../Timestamp';

var mdParse = SimpleMarkdown.defaultBlockParse;
var mdOutput = SimpleMarkdown.defaultReactOutput;

let Quote = (props) => {
    let renderedText = mdOutput(mdParse(props.text));
    return (
        <div className="Quote">
            <div className="quote-border"></div>
            <div className="quote-inner">
                <div className="quote-info">
                    <Avatar user={props.user}/>
                    <span className="quote-sender">{props.user.name}</span>
                </div>
                <div className="quote-text">
                    {renderedText}
                </div>
                <div className="quote-time">
                    <Timestamp time={props.creation_time}/>
                </div>
            </div>
        </div>
    );
}

export default Quote;