import * as Types from  "./Types";

export const addUser=(user)=>{
return{
    type:Types.ADD_USER,
    payload:user
}
}