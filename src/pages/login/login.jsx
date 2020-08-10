import Taro, { Component } from "@tarojs/taro";
import logo from "@/assets/login/login_right_logo.svg";
import welcomeText from "@/assets/login/welcome_text.svg";
import bottomLogo from "@/assets/login/login_bottom_logo.svg";
import { AtButton, AtForm, AtInput } from "taro-ui";
import { View, Image, Text } from "@tarojs/components";
import { setGlobalData } from "@/store/global_data";
import { phoneAuthCode } from "@/globalApi/index";

import "./login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.config = {
      // navigationStyle: "custom"
      navigationBarTitleText: " "
    };
    this.state = {
      account: "",
      password: "",
      loading: false,
      hasAuthCode: true,
      disableLogin: true,
      count: 60
    };
    // _mytimer 通过this加在构造器上
    this._mytimer;
  }

  setToken(value) {
    setGlobalData("token", value);
  }
  accountChange(value) {
    if (!value) return;
    this.setState({
      ...this.state,
      account: value,
      hasAuthCode: !(value.length === 11)
    });
    return value;
  }
  passwordChange(value) {
    if (!value) return;
    this.setState({
      ...this.state,
      password: value,
      disableLogin: !(value.length === 6 && this.state.account.length === 11)
    });
    return value;
  }
  wxLogin(e) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    // const _selfe = this;
    // const oldState = this.state;
    // this.setState({
    //   ...oldState,
    //   loading: true
    // });
    console.log("微信login", e);
  }
  checkedProtocol() {
    Taro.navigateTo({
      url: "/pages/login/agreement"
    });
  }
  getAuthCode() {
    this.timer(this.state.count);
    const param = {
      tel: this.state.account,
      type: 1
    };
    phoneAuthCode(param)
      .then(() => {
        Taro.showToast({
          title: "验证码已发送",
          duration: 2000,
          icon: "none"
        });
      })
      .catch(() => {
        if (this._mytimer) {
          clearTimeout(this._mytimer);
          this.setState({
            ...this.state,
            count: 60
          });
        }
      });
  }
  // 倒计时
  timer(value) {
    if (value <= 0) {
      if (this._mytimer) clearTimeout(this._mytimer);
      this.setState({
        ...this.state,
        count: 60
      });
      return;
    } else {
      this.setState({
        ...this.state,
        count: value - 1
      });
      this._mytimer = setTimeout(() => {
        this.timer(value - 1);
      }, 1000);
    }
  }

  getPhoneNumber(e) {
    console.log("事件对象", e);
    console.log("xxx");
  }

  render() {
    const { count, hasAuthCode, disableLogin } = this.state;
    let windowHeightStyle = `height:${Taro.getSystemInfoSync().windowHeight}px`;
    return (
      <View className='login-wrap' style={windowHeightStyle}>
        <View className='circle'></View>
        <View className='form-top-circle'></View>
        <Image className='title-pic' src={welcomeText} />
        <Image className='top-logo' src={logo} />
        {/* 中间表单 */}
        <View className='content-wrap'>
          <View className='form-box'>
            <AtForm className='login-form'>
              <AtInput
                name='value'
                type='phone'
                className='input-box'
                placeholder='手机号'
                value={this.state.account}
                onChange={this.accountChange.bind(this)}
              >
                {count >= 60 ? (
                  <AtButton
                    size='small'
                    circle
                    disabled={hasAuthCode}
                    onClick={this.getAuthCode.bind(this)}
                  >
                    获取验证码
                  </AtButton>
                ) : (
                  <AtButton size='small' circle className='hintMsg'>
                    {count}
                  </AtButton>
                )}
              </AtInput>
              <AtInput
                name='value'
                type='number'
                className='input-box'
                border={false}
                placeholder='验证码'
                maxLength={6}
                value={this.state.password}
                onChange={this.passwordChange.bind(this)}
              />
              <AtButton
                formType='submit'
                full
                disabled={disableLogin}
                size='small'
                className='login-btn center'
              >
                同意协议并登录
              </AtButton>
              <AtButton
                full
                openType='getPhoneNumber'
                size='small'
                className='wx-login center'
                loading={this.state.loading}
                type='primary'
                onClick={this.wxLogin.bind(this)}
                onGetPhoneNumber={this.getPhoneNumber.bind(this)}
              >
                微信一键登录
              </AtButton>
              <View className='form-hint'>
                为了保障您的个人隐私及其他权益，请点击同意按钮之前认真阅读
                <Text
                  className='protocol-link'
                  onClick={this.checkedProtocol.bind(this)}
                >
                  《像素公寓服务协议》
                </Text>
              </View>
            </AtForm>
          </View>
        </View>
        {/* 底部图标 */}
        <View className='center bottom-box'>
          <Image src={bottomLogo} className='bottom-logo' />
        </View>
      </View>
    );
  }
}

export default Login;
