import client from './client';
import auth from './auth'

const register = (userInfo) => client.post('/users',userInfo);

// const createUser = (userInfo)=>{
//     auth.createUser(userInfo.email,userInfo.password);
// }


export default { register};