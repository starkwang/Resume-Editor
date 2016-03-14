import React from 'react';
import Text from '../components/Text';
import Contact from '../components/Contact';
import ContactCollection from './ContactCollection';
import Avatar from '../components/Avatar';

export default class BaseInfo extends React.Component{
    constructor(props) {
        super(props);
    }

    handleChange(){

    }

    render() {
        const { name, job, contact, avatar} = this.props.baseInfo;
        const { actions } = this.props;
        return(
        <div className="base-info">
            <Avatar imgUrl={avatar.imgUrl} isEditting={avatar.isEditting} editAvatar={actions.editAvatar} enterAvatar={actions.enterAvatar}/>
            <Text className="name" location={['baseInfo','name']} text={name.text} isEditting={name.isEditting} textEdit={actions.textEdit} enterEdit={actions.enterEdit}></Text>
            <Text className="job" location={['baseInfo','job']} text={job.text} isEditting={job.isEditting} textEdit={actions.textEdit} enterEdit={actions.enterEdit}></Text>
            <hr/>
            <ContactCollection contact={contact} actions={actions}/>
        </div>
        )
    }
}