import React from 'react';
import Text from './Text';
import { DragSource ,DropTarget } from 'react-dnd';

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
    }
}

function targetCollect(connect) {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

class MainInfoItem extends React.Component{
    constructor(props) {
        super(props);
        this.removeItem = this.removeItem.bind(this);
    }

    removeItem(){
        this.props.actions.removeItemInMainInfo(this.props.indexInMainInfo, this.props.index);
    }

    render() {
        const { type, item, index, indexInMainInfo, isDragging } = this.props;
        const { textEdit, enterEdit } = this.props.actions;
        const { connectDragSource, connectDropTarget } = this.props;
        const opacity = isDragging?'0.5':'1';
        switch(type){
            case 'education':
                return connectDropTarget(connectDragSource((
                    <div className="item isDraggable" style={{opacity:opacity}}>
                        <button className="delete" onClick={this.removeItem}>-</button>
                        <Text className="name" text={item.name.text} isEditting={item.name.isEditting} textEdit={textEdit} enterEdit={enterEdit} location={['mainInfo',indexInMainInfo,'items',index,'name']}/>
                        <Text className="time" text={item.time.text} isEditting={item.time.isEditting} textEdit={textEdit} enterEdit={enterEdit} location={['mainInfo',indexInMainInfo,'items',index,'time']}/>
                        <Text className="content" text={item.content.text} isTextArea={true} isEditting={item.content.isEditting} textEdit={textEdit} enterEdit={enterEdit} location={['mainInfo',indexInMainInfo,'items',index,'content']}/>
                    </div>
                )));
            case 'practice':
                return connectDropTarget(connectDragSource((
                    <div className="item isDraggable" style={{opacity:opacity}}>
                        <button className="delete" onClick={this.removeItem}>-</button>
                        <Text className="name" text={item.name.text} isEditting={item.name.isEditting} textEdit={textEdit} enterEdit={enterEdit} location={['mainInfo',indexInMainInfo,'items',index,'name']}/>
                        <Text className="time" text={item.time.text} isEditting={item.time.isEditting} textEdit={textEdit} enterEdit={enterEdit} location={['mainInfo',indexInMainInfo,'items',index,'time']}/>
                        <Text className="content" text={item.content.text} isTextArea={true} isEditting={item.content.isEditting} textEdit={textEdit} enterEdit={enterEdit} location={['mainInfo',indexInMainInfo,'items',index,'content']}/>
                    </div>
                )));
            case 'skill':
                return connectDropTarget(connectDragSource((
                    <li className="item isDraggable" style={{opacity:opacity}}>
                        <button className="delete" onClick={this.removeItem}>-</button>
                        <Text className="text" text={item.text} isTextArea={true} isEditting={item.isEditting} textEdit={textEdit} enterEdit={enterEdit} location={['mainInfo',indexInMainInfo,'items',index]}/>
                    </li>
                )));
            case 'intern':
                return connectDropTarget(connectDragSource((
                    <div className="item isDraggable" style={{opacity:opacity}}>
                        <button className="delete" onClick={this.removeItem}>-</button>
                        <Text className="name" text={item.name.text} isEditting={item.name.isEditting} textEdit={textEdit} enterEdit={enterEdit} location={['mainInfo',indexInMainInfo,'items',index,'name']}/>
                        <Text className="job" text={item.job.text} isEditting={item.job.isEditting} textEdit={textEdit} enterEdit={enterEdit} location={['mainInfo',indexInMainInfo,'items',index,'job']}/>
                        <Text className="time-2" text={item.time.text} isEditting={item.time.isEditting} textEdit={textEdit} enterEdit={enterEdit} location={['mainInfo',indexInMainInfo,'items',index,'time']}/>
                        <Text className="content" text={item.content.text} isTextArea={true} isEditting={item.content.isEditting} textEdit={textEdit} enterEdit={enterEdit} location={['mainInfo',indexInMainInfo,'items',index,'content']}/>
                    </div>
                )));
            case 'honor':
                return connectDropTarget(connectDragSource((
                    <div className="item isDraggable" style={{opacity:opacity}}>
                        <button className="delete" onClick={this.removeItem}>-</button>
                        <Text className="name" text={item.name.text} isEditting={item.name.isEditting} textEdit={textEdit} enterEdit={enterEdit} location={['mainInfo',indexInMainInfo,'items',index,'name']}/>
                        <Text className="time" text={item.time.text} isEditting={item.time.isEditting} textEdit={textEdit} enterEdit={enterEdit} location={['mainInfo',indexInMainInfo,'items',index,'time']}/>
                    </div>
                )));
        }
    }
}

export default function DraggableItemConstroctor(type){
    return DropTarget(type, itemTarget, targetCollect)(DragSource(type, itemSource, sourceCollect)(MainInfoItem));
}