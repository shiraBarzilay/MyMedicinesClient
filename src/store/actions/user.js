import * as Types from  "./Types";


export const addNewUser=(user)=>{
return{
    type:Types.ADD_NEW_USER,
    payload:user
}
}

//עדכון נתוני לקוח(אולי עבר דירה וכד)
export const updateCurrentUser=(currentUser)=>{
return{
    type:Types.UPDATE_CURRENT_USER,
    payload:currentUser
}
}
export const deleteUser=(id)=>{
    return{
        type:Types.DELETE_USER,
        payload:id
    }
}