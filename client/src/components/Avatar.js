import React from 'react';
export default class Avatar extends React.Component{
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.enterAvatar = this.enterAvatar.bind(this);
        this.editAvatar = this.editAvatar.bind(this);
    }

    editAvatar(){
        const { imgUrl, editAvatar } = this.props;
        this.setState({
            value: imgUrl
        });
        editAvatar();
    }

    enterAvatar(){
        this.props.enterAvatar(this.state.value);
    }

    onChange(e){
        this.setState({
            value:e.target.value
        });
    }

    render() {
        const { isEditting, imgUrl, editAvatar, enterAvatar} = this.props;
        if(isEditting) {
            return (
                <div className="avatar">
                    <div className="avatar-img">
                        <img onClick={this.editAvatar} src={imgUrl} />
                    </div>
                    <input onChange={this.onChange} defaultValue={imgUrl}/>
                    <button onClick={this.enterAvatar}>确认</button>
                </div>
            );
        }else{
            return (
                <div className="avatar">
                    <div className="avatar-img">
                        <img onClick={this.editAvatar} src={imgUrl} />
                    </div>
                </div>
            );
        }
    }
}