import React from 'react';
export default class Text extends React.Component{
    constructor(props) {
        super(props);
        this.textEdit = this.textEdit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.enterEdit = this.enterEdit.bind(this);
    }

    textEdit(){
        this.setState({
            value: this.props.text
        });
        const { textEdit, location} = this.props;
        textEdit(location);
    }

    enterEdit(){
        const { enterEdit, location} = this.props;
        enterEdit(location, this.state.value);
    }

    onChange(e){
        this.setState({
            value:e.target.value
        });
    }

    render() {
        const { className, text, isEditting, isTextArea} = this.props;
        if(isEditting){
            if(isTextArea){
                return (
                    <div className="text-wrapper">
                        <textarea defaultValue={text} className={className} onChange={this.onChange}/>
                        <button className={className} onClick={this.enterEdit}>确认</button>
                    </div>
                )
            }else{
                return (
                    <div className="text-wrapper">
                        <input defaultValue={text} className={className} onChange={this.onChange}/>
                        <button className={className} onClick={this.enterEdit}>确认</button>
                    </div>
                );
            }
        }else{
            return (
                <p className={className} onClick={this.textEdit} >{text}</p>
            );
        }
    }
}