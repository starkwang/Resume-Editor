import qwest from 'qwest';

export function changeText() {
    return {
        type: 'CHANGE_TEXT'
    }
}

export function buttonClick() {
    return {
        type: 'BUTTON_CLICK'
    }
}

export function addInput() {
    return {
        type: 'ADD_INPUT'
    }
}

export function inputChange(text, index) {
    return {
        type: 'INPUT_CHANGE',
        text: text,
        index: index
    }
}

export function beginDrag(id, location) {
    return {
        type: 'BEGIN_DRAG',
        id: id,
        location: location
    }
}

export function endDrag(id, location) {
    return {
        type: 'END_DRAG',
        id: id,
        location: location
    }
}

export function itemSort(sourceID, targetID, location) {
    //console.log('itemSort',sourceIndex,targetIndex);
    return {
        type: 'ITEM_SORT',
        sourceID: sourceID,
        targetID: targetID,
        location: location
    }
}

export function textEdit(location) {
    return {
        type: 'TEXT_EDIT',
        location: location,
    }
}

export function enterEdit(location, value) {
    return {
        type: 'ENTER_EDIT',
        location: location,
        value: value
    }
}

export function addContact() {
    return {
        type: 'ADD_CONTACT'
    }
}

export function deleteContact(index) {
    return {
        type: 'DELETE_CONTACT',
        index: index
    }
}

export function editAvatar() {
    return {
        type: 'EDIT_AVATAR'
    }
}

export function enterAvatar(url) {
    return {
        type: 'ENTER_AVATAR',
        url: url
    }
}

export function addItemInMainInfo(indexInMainInfo, category) {
    return {
        type: 'ADD_ITEM_IN_MAIN_INFO',
        category: category,// 'education'/'skill'
        indexInMainInfo: indexInMainInfo
    }
}

export function removeItemInMainInfo(indexInMainInfo, index){
    return {
        type: 'REMOVE_ITEM_IN_MAIN_INFO',
        indexInMainInfo:indexInMainInfo,
        index:index
    }
}

export function historyBackward() {
    return {
        type:'HISTORY_BACKWARD'
    }
}

export function historyForward() {
    return {
        type:'HISTORY_FORWARD'
    }
}

export function createResume(){
    return function(dispatch, getstate){
        qwest.post('/create',{ data: JSON.stringify(getstate()) })
        .then( result => dispatch(resumeComplete()) );
    }
}

export function resumeComplete(){
    return {
        type: 'RESUME_COMPLETE'
    }
}