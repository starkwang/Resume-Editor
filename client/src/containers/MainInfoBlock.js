import React from 'react';
import Text from '../components/Text';
import DraggableItemConstroctor from '../components/MainInfoItem';
import { DragSource ,DropTarget } from 'react-dnd';
//主要信息块，块级组件，比如“教育经历”、“实践经历”等，所有数据均放在由props.data中
var Education = DraggableItemConstroctor('education-item');
var Practice = DraggableItemConstroctor('practice-item');
var Skill = DraggableItemConstroctor('skill-item');
var Intern = DraggableItemConstroctor('intern-item');
var Honor = DraggableItemConstroctor('honor-item');

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

class MainInfoBlock extends React.Component{
    constructor(props) {
        super(props);
        this.addItemInMainInfo = this.addItemInMainInfo.bind(this);
    }

    addItemInMainInfo(){
        this.props.actions.addItemInMainInfo(this.props.indexInMainInfo, this.props.data.type);
    }

    render() {
        const { actions, data, indexInMainInfo } = this.props;
        var renderResult;
        var itemsInBlock = [];
        data.items.forEach((item,index) => {
            switch(data.type){
                case 'education':
                    itemsInBlock.push(
                        <Education item={item} id={item.id} location={['mainInfo',indexInMainInfo,'items']} type={data.type} index={index} key={index} indexInMainInfo={indexInMainInfo} actions={actions} isDragging={item.isDragging} beginDrag={actions.beginDrag} endDrag={actions.endDrag} itemSort={actions.itemSort}/>
                    );
                    break;
                case 'practice':
                    itemsInBlock.push(
                        <Practice item={item} id={item.id} location={['mainInfo',indexInMainInfo,'items']} type={data.type} index={index} key={index} indexInMainInfo={indexInMainInfo} actions={actions} isDragging={item.isDragging} beginDrag={actions.beginDrag} endDrag={actions.endDrag} itemSort={actions.itemSort}/>
                    );
                    break;
                case 'skill':
                    itemsInBlock.push(
                        <Skill item={item} id={item.id} location={['mainInfo',indexInMainInfo,'items']} type={data.type} index={index} key={index} indexInMainInfo={indexInMainInfo} actions={actions} isDragging={item.isDragging} beginDrag={actions.beginDrag} endDrag={actions.endDrag} itemSort={actions.itemSort}/>
                    );
                    break;
                case 'intern':
                    itemsInBlock.push(
                        <Intern item={item} id={item.id} location={['mainInfo',indexInMainInfo,'items']} type={data.type} index={index} key={index} indexInMainInfo={indexInMainInfo} actions={actions} isDragging={item.isDragging} beginDrag={actions.beginDrag} endDrag={actions.endDrag} itemSort={actions.itemSort}/>
                    );
                    break;
                case 'honor':
                    itemsInBlock.push(
                        <Honor item={item} id={item.id} location={['mainInfo',indexInMainInfo,'items']} type={data.type} index={index} key={index} indexInMainInfo={indexInMainInfo} actions={actions} isDragging={item.isDragging} beginDrag={actions.beginDrag} endDrag={actions.endDrag} itemSort={actions.itemSort}/>
                    );
                    break;
            }
            
        });

        switch(data.type){
            case 'education':
                return(
                    <div className={data.type + " isDraggable"} type={data.type}>
                        <i className="iconfont">&#xe603;</i>
                        <Text className="title" text={data.title.text} isEditting={data.title.isEditting} location={['mainInfo',indexInMainInfo,'title']} textEdit={actions.textEdit} enterEdit={actions.enterEdit} />
                        <button onClick={this.addItemInMainInfo}>+</button>
                        {itemsInBlock}
                    </div>
                );
            case 'practice':
                return(
                    <div className={data.type + " isDraggable"}>
                        <i className="iconfont">&#xe601;</i>
                        <Text className="title" text={data.title.text} isEditting={data.title.isEditting} location={['mainInfo',indexInMainInfo,'title']} textEdit={actions.textEdit} enterEdit={actions.enterEdit} />
                        <button onClick={this.addItemInMainInfo}>+</button>
                        {itemsInBlock}
                    </div>
                );
            case 'skill':
                return(
                    <div className={data.type + " isDraggable"}>
                        <i className="iconfont">&#xe605;</i>
                        <Text className="title" text={data.title.text} isEditting={data.title.isEditting} location={['mainInfo',indexInMainInfo,'title']} textEdit={actions.textEdit} enterEdit={actions.enterEdit} />
                        <button onClick={this.addItemInMainInfo}>+</button>
                        {itemsInBlock}
                    </div>
                );
            case 'intern':
                return(
                    <div className={data.type + " isDraggable"}>
                        <i className="iconfont">&#xe600;</i>
                        <Text className="title" text={data.title.text} isEditting={data.title.isEditting} location={['mainInfo',indexInMainInfo,'title']} textEdit={actions.textEdit} enterEdit={actions.enterEdit} />
                        <button onClick={this.addItemInMainInfo}>+</button>
                        {itemsInBlock}
                    </div>
                );
            case 'honor':
                return(
                    <div className={data.type + " isDraggable"}>
                        <i className="iconfont">&#xe604;</i>
                        <Text className="title" text={data.title.text} isEditting={data.title.isEditting} location={['mainInfo',indexInMainInfo,'title']} textEdit={actions.textEdit} enterEdit={actions.enterEdit} />
                        <button onClick={this.addItemInMainInfo}>+</button>
                        {itemsInBlock}
                    </div>
                );
            default:
                return(
                    <div className={data.type} type={data.type}>
                        <i className="iconfont">&#xe603;</i>
                        <Text className="title" text={data.title.text} isEditting={data.title.isEditting} location={['mainInfo',indexInMainInfo,'title']} textEdit={actions.textEdit} enterEdit={actions.enterEdit} />
                        <button onClick={this.addItemInMainInfo}>+</button>
                        {itemsInBlock}
                    </div>     
                );
        }
        
    }
}

const dragType = 'mainInfo-item'
export default DropTarget(dragType, itemTarget, targetCollect)(DragSource(dragType, itemSource, sourceCollect)(MainInfoBlock));