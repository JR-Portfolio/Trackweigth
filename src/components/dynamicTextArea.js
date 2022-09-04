import React from 'react'

export default class dynamicTextArea extends React.Component {
    constructor(props){
        super(props);

        this.textAreaRef = React.createRef();
    }

    componentDidMount() {
        this.textareaChange(this.textAreaRef.current);
    }

    textareaChange(ta) {
        ta.style.height = "130px";
        ta.style.height = ta.scrollHeight + "px";
    }

    render() {
        return(
            <textarea                
                ref={this.textAreaRef}
                onChange={(e) => this.textAreaChange(e.target)}
            />
        );
    }
}