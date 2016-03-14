import React from 'react';
import Text from './Text';
import { DragSource ,DropTarget} from 'react-dnd';

const type = 'contact-item';
const itemSource = {
    beginDrag(props) {
        props.beginDrag(props.id,props.location);
        return {
            id : props.id
        };
    },
    endDrag(props, monitor) {
        props.endDrag(monitor.getItem().id,props.location);
    }
};
const itemTarget = {
    canDrop() {
        return false;
    },

    hover(props, monitor) {
        props.itemSort(monitor.getItem().id, props.id, props.location);
    }
};

function sourceCollect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        //isDragging: monitor.isDragging()
    }
}

function targetCollect(connect) {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

class Contact extends React.Component{
    constructor(props) {
        super(props);
        this.deleteContact = this.deleteContact.bind(this);
    }

    handleClick(){
        //this.props.actions.changeText();
    }

    deleteContact(){
        this.props.deleteContact(this.props.index);
    }

    render() {

        const { index, item, actions, isDragging, textEdit, enterEdit, connectDragSource, connectDropTarget } = this.props;
        const opacity = isDragging?'0.5':'1';
        return connectDropTarget(connectDragSource((
            <div className="contact-item isDraggable" style={{opacity:opacity}}>
                <button className="delete" onClick={this.deleteContact}>-</button>
                <Text className="contact-name" location={['baseInfo','contact',index,'name']} text={item.name.text} isEditting={item.name.isEditting} textEdit={textEdit} enterEdit={enterEdit} />
                <Text className="contact-value" location={['baseInfo','contact',index,'value']} text={item.value.text} isEditting={item.value.isEditting} textEdit={textEdit} enterEdit={enterEdit} />                   
            </div>
        )));
    }
}

export default DropTarget(type, itemTarget, targetCollect)(DragSource(type, itemSource, sourceCollect)(Contact));