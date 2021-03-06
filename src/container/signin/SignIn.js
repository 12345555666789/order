/**
 * 登录页面
 */
import './signin.less'
import React,{Component} from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import {connect} from "react-redux";
import {ajax} from '../../util/index';
import {
    HashRouter as Router,Route,Link,Switch
} from "react-router-dom";
import Index from "../index/Index";
import utils from '../../localStorange/utils';

class SignIn extends Component{
    constructor(){
        super();
        this.state={title:'登录'}
    }
    handleClick=()=>{
            let nickname=this.refs.nickname.value;
            let password=this.refs.password.value;
        // utils.saveUser({nickname,password});
        let tel=((utils.readUsers().filter((item)=>item.nickname==nickname)))[0].tel;
        // console.log(tel,444444444444);
        this.props.getUserInfo({nickname:nickname,password:password,tel:tel});
        if(nickname&&password){
            if(utils.readUsers().some((item)=>(item.nickname==nickname&&item.password==password))){
                alert('恭喜您登录成功(*￣︶￣*)!');
                this.props.history.push("/index");
            }else{
                alert('您输入的用户名或密码不存在,请注册后再登录!')
            }
        }else{
            alert("用户名或密码错误")
        }
        /*ajax({
            method:'post',
            url:'http://localhost:8001/signin',
            async:true,
            data:data,
            headers:{} }).then((result)=>{
            console.log(result,1111111);

            if(!result){
                alert('您输入的用户名或密码不存在,请注册后再登录!')
            }else if(result.nickname==data.nickname&&result.password==data.password){
                result=JSON.parse(result);
                this.props.getUserInfo(result);
                this.props.history.push("/index");
                alert('恭喜您登录成功(*￣︶￣*)!')
                // console.log(this.props,3333333);
            }else{
                alert("用户名或密码错误")
            }
        }).catch((err)=>{
            console.log(err);
        });*/
    };
    render(){
        return (
            <div className="signIn">
                <Header title={this.state.title}/>
                <img className="avatar" src="../../../static/img/avatar.png" alt="个人头像"/>
                <form id="form" method="get">
                    <div className="form-group">
                        <label htmlFor="nickname">昵称</label>
                        <input id="nickname" ref="nickname" type="text" placeholder="请输入您的用户名"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">密码</label>
                        <input id="password" ref="password" type="password" placeholder="请输入您的密码"/>
                    </div>
                    <div className="form-group">
                        <button id="register" onClick={this.handleClick}>立即登录</button>
                    </div>
                </form>

            </div>
        )
    }
}

let mapStateToProps=state=>({

});
let mapDispatchToProps=dispatch=>({
    getUserInfo:(text)=>dispatch({type:"GET_USERINFO",text})
});

export default connect(mapStateToProps,mapDispatchToProps)(SignIn)