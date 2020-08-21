import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtButton, AtInput, AtForm } from "taro-ui";
import { phoneAuthCode,unBindPhone,bindPhoneNumber } from "@/globalApi/index";
import { connect } from "@tarojs/redux";
import { SAVE_USER_INFO } from "../../actions/globalActions";
import "./change_number.scss";

@connect(({ globalStore }) => ({
  userInfo: globalStore.userInfo||{}
}),
dispatch => ({
  onSaveMsg(data) {
    dispatch(SAVE_USER_INFO(data));
  }
})
)
class ChangeNumber extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarTitleText: " ",
      navigationBarBackgroundColor: "#eeeeee"
    };

    this.state = {
      oldPhoneCode: "",
      newPhone: "",
      newSmsCode: ""
    };
  }

  changeNumber() {
    const { oldPhoneCode, newPhone, newSmsCode } = this.state;
    if (oldPhoneCode && newPhone && newSmsCode) {
      unBindPhone({smsCode:oldPhoneCode}).then(res=>{
        if(res.code=='000000'){
          const param={
            smsCode: newSmsCode,
              tel: newPhone,
              unbindToken: res.data.unbindToken
          }
          bindPhoneNumber(param).then(result=>{
            if(result.code=='000000'){
              const {data} = result
              this.props.onSaveMsg(data)
              Taro.showToast({title:'手机号换绑成功',duration:3000})
              setTimeout(()=>{
                Taro.navigateBack()
              },3000)
            }else{
              Taro.showToast({title:result.msg,icon:'none'})
            }
          })
        }else{
          Taro.showToast({title:res.msg,icon:'none'})
        }
      })
    } else {
      Taro.showToast({title: "请将信息填写完整！",icon: "none"});
    }
  }
  getOldPhoneCode() {
    let param = {
      type: 3,
      tel: this.props.userInfo.tel
    };
    phoneAuthCode(param).then(res => {
      if (res.code == "000000") {
        Taro.showToast({ title: "验证码已成功发送",icon:'none' });
      }
    });
  }
  getNewPhoneCode() {
    const { newPhone } = this.state;
    let param = {
      tel: newPhone,
      type: 4
    };
    phoneAuthCode(param).then(res => {
      if (res.code == "000000") {
        Taro.showToast({ title: "验证码已成功发送",icon:'none' });
      }
    });
  }
  editValue(key, value) {
    this.setState({
      [key]: value
    });
    return value;
  }
  render() {
    const { oldPhoneCode, newPhone, newSmsCode } = this.state;
    const { tel } = this.props.userInfo;
    return (
      <View>
        {
          tel&&<View className='buttonWrap'>
          <AtForm>
            <AtInput
              title='原手机验证'
              border={false}
              type='phone'
              placeholder={`${tel.substring(0, 3)}**${tel.substring(
                7,
                11
              )}的验证码`}
              value={oldPhoneCode}
              onChange={this.editValue.bind(this, "oldPhoneCode")}
            >
              <AtButton
                size='small'
                circle
                onClick={this.getOldPhoneCode.bind(this)}
                className='getAuthCode'
              >
                获取验证码
              </AtButton>
            </AtInput>
            <View className='formDivider'></View>

            <AtInput
              title='新手机号码'
              border={false}
              type='phone'
              placeholder='不要输入原手机'
              value={newPhone}
              onChange={this.editValue.bind(this, "newPhone")}
            >
              <AtButton
                size='small'
                circle
                onClick={this.getNewPhoneCode.bind(this)}
                className='getAuthCode'
              >
                获取验证码
              </AtButton>
            </AtInput>
            <AtInput
              title='新验证码'
              type='password'
              value={newSmsCode}
              placeholder='新手机收到的验证码'
              onChange={this.editValue.bind(this, "newSmsCode")}
            />
          </AtForm>
          <View className='changeNumBtnWrap'>
            <AtButton
              className='userInfoBtn'
              onClick={this.changeNumber.bind(this)}
            >
              换绑手机
            </AtButton>
          </View>
        </View>
        }
      </View>
    );
  }
}

export default ChangeNumber;
