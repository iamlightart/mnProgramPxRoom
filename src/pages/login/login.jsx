import Taro, { Component } from "@tarojs/taro";
import logo from "@/assets/login/login_right_logo.svg";
import welcomeText from "@/assets/login/welcome_text.svg";
import bottomLogo from "@/assets/login/login_bottom_logo.svg";
import { AtButton, AtForm, AtInput } from "taro-ui";
import { connect } from "@tarojs/redux";
import { View, Image, Text } from "@tarojs/components";
import { phoneAuthCode, queryUserInfo } from "@/globalApi/index";
import AuthorityModal from "@/components/common/authority_modal";
import { SAVE_USER_INFO } from "../../actions/globalActions";
import { decodePhoneNumber, enterInfo } from "./serviceApi";
import "./login.scss";

@connect(
  ({ globalStore }) => ({
    userInfo: globalStore.userInfo
  }),
  dispatch => ({
    onSaveMsg(data) {
      dispatch(SAVE_USER_INFO(data));
    }
  })
)
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
    this._mytimer;
  }
  componentWillMount() {
    if (this.props.userInfo) {
      Taro.redirectTo({ url: "/pages/index/index" });
    } else {
      queryUserInfo().then(({ data }) => {
        if (data) {
          this.props.onSaveMsg(data);
          Taro.redirectTo({ url: "/pages/index/index" });
        }
      });
    }
  }
  accountChange(value) {
    console.log("value", value);
    this.setState({
      account: value,
      hasAuthCode: !(value.length === 11)
    });
    return value;
  }
  passwordChange(value) {
    this.setState({
      password: value,
      disableLogin: !(value.length === 6 && this.state.account.length === 11)
    });
    return value;
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
        count: 60
      });
      return;
    } else {
      this.setState({
        count: value - 1
      });
      this._mytimer = setTimeout(() => {
        this.timer(value - 1);
      }, 1000);
    }
  }
  getPhoneNumber(e) {
    this.setState({
      loading: true
    });
    const { encryptedData, iv } = e.detail;
    try {
      if (encryptedData && iv) {
        decodePhoneNumber({ encryptedData, iv }).then(() => {
          this.setState({
            loading: false
          });
          // const {phoneNumber} = data
          // enterInfo()
        });
      }
    } finally {
      console.log(e);
      this.setState({
        loading: false
      });
    }
  }
  getWxuserMsg(e) {
    const { disableLogin } = this.state;
    if (disableLogin) {
      Taro.showToast({
        title: "账号或密码不能为空！",
        icon: "none"
      });
      return;
    }
    const { userInfo } = e.detail;
    if (userInfo) {
      const { account, password } = this.state;
      const { nickName, avatarUrl, gender } = userInfo;
      let param = {
        tel: account,
        smsCode: password,
        nickName,
        avatar: avatarUrl,
        sex: gender,
        type: 1
      };
      enterInfo(param).then(({ data }) => {
        if (data) {
          this.props.onSaveMsg(data);
          Taro.redirectTo({ url: "/pages/index/index" });
        }
      });
    }
    console.log(e);
  }
  render() {
    const { count, hasAuthCode } = this.state;
    let windowHeightStyle = `height:${Taro.getSystemInfoSync().windowHeight}px`;
    return (
      <View className='login-wrap' style={windowHeightStyle}>
        <AuthorityModal showDialog></AuthorityModal>
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
                type='number'
                className='input-box'
                placeholder='手机号'
                maxLength={11}
                required
                value={this.state.account}
                onChange={this.accountChange.bind(this)}
              >
                {count >= 60 ? (
                  <AtButton
                    size='small'
                    circle
                    disabled={hasAuthCode}
                    onClick={this.getAuthCode.bind(this)}
                    className='getAuthCode'
                  >
                    获取验证码
                  </AtButton>
                ) : (
                  <AtButton size='small' circle className='hintMsg getAuthCode'>
                    {count}
                  </AtButton>
                )}
              </AtInput>
              <AtInput
                name='smsCode'
                type='number'
                className='input-box'
                border={false}
                placeholder='验证码'
                maxLength={6}
                required
                value={this.state.password}
                onChange={this.passwordChange.bind(this)}
              />
              <AtButton
                full
                size='small'
                openType='getUserInfo'
                onGetUserInfo={this.getWxuserMsg.bind(this)}
                className='login-btn'
              >
                同意协议并登录
              </AtButton>

              <AtButton
                full
                openType='getPhoneNumber'
                size='small'
                className='wx-login'
                loading={this.state.loading}
                type='primary'
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
