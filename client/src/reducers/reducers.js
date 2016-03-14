import shortid from 'shortid';
import { initialState } from './initialState';
import { History } from './History';

function findItem(items, id){
    var resultIndex;
    items.forEach((item,index) => {
        if(item.id == id){
            resultIndex = index;
        }
    });
    return resultIndex
}
export default function todoApp(state = initialState, action) {
    console.log(action.type, action);
    switch (action.type) {
        case 'ITEM_SORT':
            var {sourceID,targetID} = action;
            if(sourceID == targetID){
                return Object.assign({},state);
            }else{
                var category = action.location[0];
                var newCategory = category=='baseInfo'?Object.assign({},state[category]):Object.assign([],state[category]);
                var targetArr = newCategory;
                for(var i = 1 ; i < action.location.length ; i++){
                    targetArr = targetArr[action.location[i]];
                }
                var sourceIndex = findItem(targetArr, sourceID);
                var targetIndex = findItem(targetArr, targetID);
                var clone = targetArr.slice(0,targetArr.length);   
                var movingItem = clone.splice(sourceIndex,1)[0];
                targetArr = [
                    ...clone.slice(0,targetIndex),
                    movingItem,
                    ...clone.slice(targetIndex),
                ]
                var targetNode = newCategory;
                for(var i = 1 ; i < action.location.length-1 ; i++){
                    targetNode = targetNode[action.location[i]];
                }
                targetNode[action.location[action.location.length-1]] = targetArr;
                var tmp = {};
                tmp[action.location[0]] = newCategory;
                //History.add(Object.assign({},state,tmp));
                return Object.assign({},state,tmp);
            }
            

        case 'BEGIN_DRAG':
            var category = action.location[0];
            var newCategory = category=='baseInfo'?Object.assign({},state[category]):Object.assign([],state[category]);
            var targetArr = newCategory;
            for(var i = 1 ; i < action.location.length ; i++){
                targetArr = targetArr[action.location[i]];
            }
            var index = findItem(targetArr, action.id);
            targetArr[index].isDragging = true;
            var tmp = {};
            tmp[action.location[0]] = newCategory;
            return Object.assign({},state,tmp);
            

        case 'END_DRAG':
            var category = action.location[0];
            var newCategory = category=='baseInfo'?Object.assign({},state[category]):Object.assign([],state[category]);
            var targetArr = newCategory;
            for(var i = 1 ; i < action.location.length ; i++){
                targetArr = targetArr[action.location[i]];
            }
            var index = findItem(targetArr, action.id);
            targetArr[index].isDragging = false;
            var tmp = {};
            tmp[action.location[0]] = newCategory;
            History.add(Object.assign({},state,tmp));
            return Object.assign({},state,tmp);
            

        case 'TEXT_EDIT':
            var category = action.location[0];
            var newCategory = category=='baseInfo'?Object.assign({},state[category]):Object.assign([],state[category]);
            var targetNode = newCategory;
            for(var i = 1 ; i < action.location.length ; i++){
                targetNode = targetNode[action.location[i]];
            }
            targetNode.isEditting = true;
            var tmp = {};
            tmp[action.location[0]] = newCategory;
            History.add(Object.assign({},state,tmp));
            return Object.assign({},state,tmp);
            

        case 'ENTER_EDIT':
            var category = action.location[0];
            var newCategory = category=='baseInfo'?Object.assign({},state[category]):Object.assign([],state[category]);
            var targetNode = newCategory;
            for(var i = 1 ; i < action.location.length ; i++){
                targetNode = targetNode[action.location[i]];
            }
            targetNode.isEditting = false;
            targetNode.text = action.value;
            var tmp = {};
            tmp[action.location[0]] = newCategory;
            History.add(Object.assign({},state,tmp));
            return Object.assign({},state,tmp);
            

        case 'ADD_CONTACT':
            var newBaseInfo = Object.assign({},state.baseInfo);
            var id = shortid.generate();
            newBaseInfo.contact.push({
                id:id,
                name:{
                    text:'名称',
                    isEditting:false
                },
                value:{
                    text:'值',
                    isEditting:false
                },
                isDragging:false
            })
            History.add(Object.assign({},state,{
                baseInfo: newBaseInfo
            }));
            return Object.assign({},state,{
                baseInfo: newBaseInfo
            });
            

        case 'DELETE_CONTACT':
            var newBaseInfo = Object.assign({},state.baseInfo);
            newBaseInfo.contact.splice(action.index,1);
            History.add(Object.assign({},state,{
                baseInfo: newBaseInfo
            }));
            return Object.assign({},state,{
                baseInfo: newBaseInfo
            });
            

        case 'EDIT_AVATAR':
            var newBaseInfo = Object.assign({},state.baseInfo);
            newBaseInfo.avatar.isEditting = true;
            History.add(Object.assign({},state,{
                baseInfo: newBaseInfo
            }));
            return Object.assign({},state,{
                baseInfo: newBaseInfo
            });
            

        case 'ENTER_AVATAR':
            var newBaseInfo = Object.assign({},state.baseInfo);
            newBaseInfo.avatar.isEditting = false;
            newBaseInfo.avatar.imgUrl = action.url;
            History.add(Object.assign({},state,{
                baseInfo: newBaseInfo
            }));
            return Object.assign({},state,{
                baseInfo: newBaseInfo
            });
            

        case 'ADD_ITEM_IN_MAIN_INFO':
            var newMainInfo = Object.assign([],state.mainInfo);
            var targetArr = newMainInfo[action.indexInMainInfo].items;
            if(action.category == 'education'){
                targetArr.push({
                    id:shortid.generate(),
                    isDragging:false,
                    name:{
                        text:'这里填入名称',
                        isEditting:false
                    },
                    time:{
                        text:'这里填入时间',
                        isEditting:false
                    },
                    content:{
                        text:'这里填入简介',
                        isEditting:false
                    }
                });
            }
            if(action.category == 'skill'){
                targetArr.push({
                        id:shortid.generate(),
                        isDragging:false,
                        text:'这里填入专业技能',
                        isEditting:false
                });
            }
            if(action.category == 'practice'){
                targetArr.push({
                    id:shortid.generate(),
                    isDragging:false,
                    name:{
                        text:'项目名称abcdehgga项目名称',
                        isEditting:false
                    },
                    time:{
                        text:'项目时间',
                        isEditting:false
                    },
                    content:{
                        text:'项目内容项目内容项目内容项目内容项目内容项目内容项目内容abcdefgh项目内容项目内容',
                        isEditting:false
                    }
                });
            }
            if(action.category == 'intern'){
                targetArr.push({
                    id:shortid.generate(),
                    isDragging:false,
                    name:{
                        text:'项目名称abcdehgga项目名称',
                        isEditting:false
                    },
                    time:{
                        text:'项目时间',
                        isEditting:false
                    },
                    job:{
                        text:'职位',
                        isEditting:false
                    },
                    content:{
                        text:'项目内容项目内容项目内容项目内容项目内容项目内容项目内容abcdefgh项目内容项目内容',
                        isEditting:false
                    }
                });
            }
            if(action.category == 'honor'){
                targetArr.push({
                    id:shortid.generate(),
                    isDragging:false,
                    name:{
                        text:'项目名称abcdehgga项目名称',
                        isEditting:false
                    },
                    time:{
                        text:'项目时间',
                        isEditting:false
                    }
                });
            }
            History.add(Object.assign({},state,{
                mainInfo: newMainInfo
            }));
            return Object.assign({},state,{
                mainInfo: newMainInfo
            });
            
            
        case 'REMOVE_ITEM_IN_MAIN_INFO':
            var newMainInfo = Object.assign([],state.mainInfo);
            var targetArr = newMainInfo[action.indexInMainInfo].items;
            targetArr.splice(action.index,1);
            History.add(Object.assign({},state,{
                mainInfo: newMainInfo
            }));
            return Object.assign({},state,{
                mainInfo: newMainInfo
            });
            

        case 'HISTORY_BACKWARD':
            return History.backward();
            

        case 'HISTORY_FORWARD':
            return History.forward();
            
        case 'RESUME_COMPLETE':
            localStorage.saveState = JSON.stringify(state);
            return state;
        default:
            return Object.assign({},state);
            
    };
    
}