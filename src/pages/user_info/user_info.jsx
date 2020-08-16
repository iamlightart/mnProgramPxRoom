import Taro, { Component } from "@tarojs/taro";
import { View, Image, Button } from "@tarojs/components";
import {
  AtButton,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction
} from "taro-ui";
import { wxUnbind } from "@/globalApi/index";
import "./user_info.scss";

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarTitleText: "个人信息",
      navigationBarBackgroundColor: "#eeeeee"
    };

    this.state = {
      userInfo: Taro.getStorageSync("currentUserInfo"),
      showHintModal: false,
      hintModalType: 1
    };
  }

  showUnbindWechatModal = () => {
    this.setState({
      showHintModal: true,
      hintModalType: 1
    });
  };

  showChangeNumberModal = () => {
    this.setState({
      showHintModal: true,
      hintModalType: 0
    });
  };

  hideHintModal = () => {
    this.setState({
      showHintModal: false
    });
  };
  handleConfirm = () => {
    if (this.state.hintModalType == 0) {
      Taro.navigateTo({
        url: `/pages/user_info/change_number?phoneNum=${this.state.userInfo.tel}`
      });
    } else if (this.state.hintModalType == 1) {
      wxUnbind().then(res => {
        console.log(res);
        Taro.reLaunch({ url: "/pages/login/login" });
      });
    }

    this.setState({
      showHintModal: false
    });
  };

  render() {
    const { userInfo, showHintModal, hintModalType } = this.state;
    return (
      <View>
        <AtModal isOpened={showHintModal}>
          <AtModalHeader>提示</AtModalHeader>
          <AtModalContent className='modalContent'>
            {hintModalType == 1
              ? "这样操作会解绑微信，需要重新登录，确定吗？"
              : "这样操作会换绑手机，确定吗？"}
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.hideHintModal}>取消</Button>
            <Button onClick={this.handleConfirm}>确定</Button>
          </AtModalAction>
        </AtModal>

        <View className='listWrap'>
          <View className='listItem'>
            <View className='itemKey'>头像</View>
            <View className='itemValue '>
              <Image src={userInfo.avatar} className='avatarImg'></Image>
            </View>
          </View>
          <View className='listItem'>
            <View className='itemKey'>昵称</View>
            <View className='itemValue'>{userInfo.nickName}</View>
          </View>
          <View className='listItem'>
            <View className='itemKey'>性别</View>
            <View className='itemValue'>
              {userInfo.sex === 1 ? "男" : "女"}
            </View>
          </View>
          <View className='listItem'>
            <View className='itemKey'>手机号</View>
            <View className='itemValue'>{userInfo.tel}</View>
          </View>
        </View>
        <View className='buttonWrap'>
          <AtButton
            className='userInfoBtn'
            onClick={this.showChangeNumberModal}
          >
            换绑手机
          </AtButton>
        </View>
        <View className='buttonWrap'>
          <AtButton
            onClick={this.showUnbindWechatModal}
            className='userInfoBtn'
          >
            解绑微信
          </AtButton>
        </View>
      </View>
    );
  }
}

export default UserInfo;
