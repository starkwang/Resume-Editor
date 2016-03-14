import React from 'react';
import Text from '../components/Text';
import MainInfoBlock from './MainInfoBlock';

export default class MainInfo extends React.Component{
    constructor(props) {
        super(props);
    }

    handleChange(){

    }

    render() {
        var mainInfo = [];
        var { actions } = this.props;
        this.props.mainInfo.forEach((item,index)=>{
            mainInfo.push(
                <MainInfoBlock data={item} key={index} id={item.id} actions={actions} location={['mainInfo']} indexInMainInfo={index} isDragging={item.isDragging} beginDrag={actions.beginDrag} endDrag={actions.endDrag} itemSort={actions.itemSort}/>
            );
        })
        return(
            <div className="main-info">
                {mainInfo}
            </div>
        )
    }
}