import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text, Input } from "@tarojs/components";
import bgCircle from "@/assets/ads/bg_circle.svg";
import {
  AtAvatar,
  AtButton,
  AtDivider
} from "taro-ui";
import { connect } from '@tarojs/redux'
import avatar from "@/assets/user_center/avatar.jpg";
import apartment from "@/assets/common/room.jpg";
import FissionLoginModal from "@/components/common/fission_login_modal";
import { phoneAuthCode } from "@/globalApi/index";
import { SAVE_USER_INFO } from '../../actions/globalActions'
import { acceptInvite } from "./adsServiceApi";


import "./fission_login.scss";

@connect(({ globalStore }) => ({
 userInfo:globalStore.userInfo
}), (dispatch) => ({
  onSaveMsg(data){
    dispatch(SAVE_USER_INFO(data))
  }
}))
class FissionLogin extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarTitleText: "分享登录",
      navigationBarBackgroundColor: "#eeeeee",
      backgroundColor: "#fdd835"
    };
    this.state = {
      tel:'',
      smsCode:'',
      referrerCode:''
    };
  }
  componentWillMount(){
   this.setState({
    referrerCode:this.$router.params.code|| ''
   })
  }
 
  invite = ()=>{
    let param={
      referrer:this.state.referrerCode,// 推荐人编码
      tel:'',// 电话号码
      smsCode:'',// 验证码
      nickName:'',//微信昵称
      avatar:'',// 微信头像
      sex:'',//性别
    }
    acceptInvite(param).then(res=>{
      console.log('接受邀请',res)
    })
  }
  getAuthCode = () => {
    if(!this.state.tel){
      Taro.showToast({
        title:'请先填写手机号',
        icon:'none'
      })
      return
    }
    const param={
        tel:this.state.tel,
        type:2
    }
    phoneAuthCode(param).then(()=>{
      Taro.showToast({
        title:'验证码已发送',
        icon:'none'
      })
    })
  };
  tleChange= (e) =>{
   const {value} = e.detail
     this.setState({
      tel:value
     })
    return value
  }
  codeChange = (e) =>{
    const {value} = e.detail
    this.setState({
      smsCode:value
    })
   return value
  }
  getWxuserMsg = (e)=>{
    console.log('thie.state',this.state)
    const { tel, smsCode } = this.state;
    if (!tel||!smsCode){
      Taro.showToast({
        title: "账号或密码不能为空！",
        icon: "none"
      });
      return;
    }
    const { userInfo } = e.detail;
    if (userInfo) {
      const { nickName, avatarUrl, gender } = userInfo;
      let param={
        referrer:'',// 推荐人编码
        tel:tel,// 电话号码
        smsCode:smsCode,// 验证码
        nickName:nickName,//微信昵称
        avatar:avatarUrl,// 微信头像
        sex:gender,//性别
      }
      acceptInvite(param).then(res=>{
        this.props.onSaveMsg(res.data);
      })
  }
}

  render() {
    const {tel,smsCode} = this.state
    return (
      <View className='page-wrap'>
        <FissionLoginModal showDialog={false}></FissionLoginModal>
        <View className='top-content '>
          <Image className='top-bg-pic' src={bgCircle} />
          <View className='avatar-wrap'>
            <AtAvatar
              size='large'
              circle
              image={avatar}
              className='avatar-img'
            ></AtAvatar>
            <Text className='top-text'>您的好友大屁股\n邀请您入住像素公寓</Text>
          </View>
        </View>
        <View className='top-bg-box'></View>
        <View className='form-content'>
          <View className='login-component-wrap'>
            <Input
              name='phone'
              type='number'
              value={tel}
              placeholder='请输入手机号'
              onInput={this.tleChange}
              maxLength={11}
              className='login-input'
            />
          </View>
          <View className='login-component-wrap'>
            <Input
              value={smsCode}
              name='phone'
              type='number'
              onInput={this.codeChange}
              maxLength={6}
              placeholder='请输入验证码'
              className='login-input'
            />
            <AtButton
              size='small'
              circle
              className='getAuthCode'
              onClick={this.getAuthCode}
            >
              获取验证码
            </AtButton>
          </View>
          <View className='login-component-wrap'>
            <AtButton    
              openType='getUserInfo'
              onGetUserInfo={this.getWxuserMsg} 
              className='accept-btn'
            >接受邀请</AtButton>
          </View>
        </View>
        <View className='detail-content'>
          <View className='detail-wrap'>
            <AtDivider
              content='活动细则'
              fontColor='#ff9900'
              lineColor='#FDC42A'
            />
            <Text>
              1、您的好友正在邀请您入住像素公寓，通过上方邀请功能使用您的手机并完成验证即可与您的好友完成好友绑定关系；\n
              2、绑定成功后若您在活动有效期内成功完成签约（租期大于6个月），则您的好友将获得相应奖励；\n
              注：活动期间内您可以更换绑定人，但一次只能与一名好友进行绑定。
            </Text>
          </View>
        </View>
        <View className='apartment-content'>
          <View className='divider-wrap'>
            <AtDivider
              content='优质房源'
              fontColor='#ff9900'
              lineColor='#FDC42A'
            />
          </View>
          <View className='apartment-links'>
            <View className='apartment-link'>
              <Image
                className='apartment-img'
                src={apartment}
                mode='aspectFill'
              ></Image>
              <View className='apartment-info'>
                <View className='apartment-address'>
                  中德英伦联邦苹果公寓-A主卫
                </View>
                <View className='apartment-props'>
                  高新区 中和|12㎡|5室1厅2卫
                </View>
                <View className='apartment-price'>￥950元/月</View>
              </View>
            </View>
            <View className='apartment-link'>
              <Image
                className='apartment-img'
                src={apartment}
                mode='aspectFill'
              ></Image>
              <View className='apartment-info'>
                <View className='apartment-address'>
                  中德英伦联邦苹果公寓-A主卫
                </View>
                <View className='apartment-props'>
                  高新区 中和|12㎡|5室1厅2卫
                </View>
                <View className='apartment-price'>￥950元/月</View>
              </View>
            </View>
            <View className='apartment-link'>
              <Image
                className='apartment-img'
                src={apartment}
                mode='aspectFill'
              ></Image>
              <View className='apartment-info'>
                <View className='apartment-address'>
                  中德英伦联邦苹果公寓-A主卫
                </View>
                <View className='apartment-props'>
                  高新区 中和|12㎡|5室1厅2卫
                </View>
                <View className='apartment-price'>￥950元/月</View>
              </View>
            </View>
            <View className='apartment-link'>
              <Image
                className='apartment-img'
                src={apartment}
                mode='aspectFill'
              ></Image>
              <View className='apartment-info'>
                <View className='apartment-address'>
                  中德英伦联邦苹果公寓-A主卫
                </View>
                <View className='apartment-props'>
                  高新区 中和|12㎡|5室1厅2卫
                </View>
                <View className='apartment-price'>￥950元/月</View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default FissionLogin;
