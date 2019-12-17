import axiosInstance from './interceptors';
import interfaceObj from './interface'
import util from '../util/index'
export default util(axiosInstance, interfaceObj)
/* 
  api中以下这五种方法 这五种方法对应这里要用到的五种请求数据的方式
   getContactList(){}
   postContactJson(){}
   postContactForm(){}
   putContactEdit(){}
   deleteContact(){}
*/
