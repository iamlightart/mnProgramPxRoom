import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import {
  AtIcon,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtButton
} from "taro-ui";
import "./to_login_modal.scss";

class AuthorityWechatModal extends Component {
  toLogin() {
    const {clearModal} = this.props
    clearModal()
    Taro.navigateTo({
      url: "/pages/login/login"
    });
  }
  render() {
    return (
      <AtModal
        isOpened={this.props.showDialog}
        onClose={this.props.clearModal}
      >
        <View className='closeBtn' onClick={this.props.clearModal}>
          <AtIcon value='close' size='14' color='#000'></AtIcon>
        </View>
        <AtModalHeader>温馨提示</AtModalHeader>
        <AtModalContent>
          <View className='modalContentWrap'>
            <Text className='hintInfo'>需要登陆过后才能使用哦~</Text>
            <View className='buttonWrap'>
              <View className='modalBtn'>
                <AtButton
                  className='wxModalConfirmBtn'
                  onClick={this.toLogin.bind(this)}
                >
                  去登陆
                </AtButton>
              </View>
            </View>
          </View>
        </AtModalContent>
      </AtModal>
    );
  }
}

export default AuthorityWechatModal;
