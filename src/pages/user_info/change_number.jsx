import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtButton, AtInput, AtForm } from "taro-ui";
import "./change_number.scss";

class ChangeNumber extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarTitleText: " ",
      navigationBarBackgroundColor: "#eeeeee"
    };

    this.state = {
      count: 61,
      hasAuthCode: false
    };
  }
  getAuthCode() {
    // this.timer(this.state.count);
    // const param = {
    //   tel: this.state.account,
    //   type: 1
    // };
    // phoneAuthCode(param)
    //   .then(() => {
    //     Taro.showToast({
    //       title: "验证码已发送",
    //       duration: 2000,
    //       icon: "none"
    //     });
    //   })
    //   .catch(() => {
    //     if (this._mytimer) {
    //       clearTimeout(this._mytimer);
    //       this.setState({
    //         count: 60
    //       });
    //     }
    //   });
    console.log("获取验证码");
  }

  changeNumber = () => {
    Taro.showToast({
      title: "手机号换绑成功",
      duration: 1500,
      icon: "success"
    });
    setTimeout(()=>{Taro.navigateBack()}, 1500);
  };

  render() {
    const { count, hasAuthCode } = this.state;
    return (
      <View>
        <View className='buttonWrap'>
          <AtForm>
            <AtInput
              title='新手机'
              border={false}
              type='phone'
              placeholder={`原号码${this.$router.params.phoneNum}`}
              value={this.state.value6}
              // onChange={this.handleChange.bind(this)}
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
                <AtButton size='small' circle className='hintMsg'>
                  {count}
                </AtButton>
              )}
            </AtInput>
            <AtInput
              title='验证码'
              type='password'
              placeholder='请输入收到的验证码'
              // onChange={this.handleChange.bind(this)}
            />
          </AtForm>
          <View className='changeNumBtnWrap'>
            <AtButton className='userInfoBtn' onClick={this.changeNumber}>
              换绑手机
            </AtButton>
          </View>
        </View>
      </View>
    );
  }
}

export default ChangeNumber;
