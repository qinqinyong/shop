
// 这个工具函数 给每个请求带上uuid标识id
// 先从localStrong 中获取标识id,没有的话再添加新的uuid标识id

import { v4 as uuidv4 } from 'uuid';
let TOKEN_KEY = 'TOKEN_KEY'


function getUserTempId() {
    let userTempId = localStorage.getItem('USERTEMPID_KEY')
    if (!userTempId) {
        //如果不存在，添加新的
        userTempId = uuidv4()  // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d')
        userTempId = localStorage.setItem('USERTEMPID_KEY', userTempId);
    }
    return userTempId
}


function setToken(token){
    localStorage.setItem(TOKEN_KEY,token)
}

function getToken(token){
    return localStorage.getItem(TOKEN_KEY)
}

function removeToken(token){
    localStorage.removeItem(TOKEN_KEY)
}





export {
    getUserTempId,
    setToken,
    getToken,
    removeToken

}