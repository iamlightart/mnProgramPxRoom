import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text, Input } from "@tarojs/components";
import bgCircle from "@/assets/ads/bg_circle.svg";
import {
  AtAvatar,
  AtButton,
  AtDivider
} from "taro-ui";
import { connect } from '@tarojs/redux'
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
      referrerCode:'',
      inviteAvatar:'',
      name:'',
      resultModal:false,
      modalState:0// 1更换 0 绑定 3 在租无法绑定
    };
  }
  componentWillMount(){
    const {header,code,name}=this.$router.params
   this.setState({
    referrerCode:code,
    inviteAvatar:header,
    name:name
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
    const { tel, smsCode,referrerCode } = this.state;
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
        referrer:referrerCode,// 推荐人编码
        tel:tel,// 电话号码
        smsCode:smsCode,// 验证码
        nickName:nickName,//微信昵称
        avatar:avatarUrl,// 微信头像
        sex:gender,//性别
      }
      acceptInvite(param).then(res=>{
        this.props.onSaveMsg(res.data);
        if(res.code=='000000'){
          this.setState({
            resultModal:true,
            modalState:0
          })
        }else if(res.code=='000001'){
          this.setState({
            resultModal:true,
            modalState:1
          })
        }else if(res.code=='100001'){
          this.setState({
            resultModal:true,
            modalState:3
          })

        }else if(res.code=='300001'||res.code=='300002'){
             Taro.showToast({title:'该账号已是像素用户 即将跳转去登录',icon:'none',duration:2800})
            setTimeout(()=>{
              Taro.switchTab({url:'/pages/index/index'})
            },3000)
        }else{
          Taro.showToast({title:res.msg,icon:'none'})
        }
       
      })
  }
}

  render() {
    const {tel,smsCode,inviteAvatar,name,resultModal,modalState} = this.state
    return (
      <View className='page-wrap'>
        <FissionLoginModal name={name} modalState={modalState} showDialog={resultModal}></FissionLoginModal>
        <View className='top-content '>
          <Image className='top-bg-pic' src={bgCircle} />
          <View className='avatar-wrap'>
            <AtAvatar
              size='large'
              circle
              image={inviteAvatar}
              className='avatar-img'
            ></AtAvatar>
            <Text className='top-text'>您的好友{name}\n邀请您入住像素公寓</Text>
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
