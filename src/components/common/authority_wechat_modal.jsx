import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import {
  AtIcon,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtButton
} from "taro-ui";
import "./fission_login_modal.scss";

class AuthorityWechatModal extends Component {
  render() {
    return (
      <AtModal
        isOpened={this.props.showDialog}
        onClose={this.props.closeModal}
      >
        <View className='closeBtn' onClick={this.props.closeModal}>
          <AtIcon value='close' size='14' color='#000'></AtIcon>
        </View>
        <AtModalHeader>温馨提示</AtModalHeader>
        <AtModalContent>
          <View className='modalContentWrap authority'>
            <Text className='hintInfo'>使用您的公开信息（昵称，头像等）</Text>
            <View className='buttonWrap'>
              <View className='modalBtn'>
              <AtButton
                className='wxModalCancleBtn'
                size='small'
                circle
                onClick={this.props.closeModal}
              >
                <Text className=' cancleBtnText'>取消</Text>
                </AtButton>
                <AtButton
                  className='wxModalConfirmBtn'
                  openType='getUserInfo'
                  onGetUserInfo={this.props.getMsg}
                  size='small'
                >
                 <Text className='btnText'> 允许使用</Text>
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
