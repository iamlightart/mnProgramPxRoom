import Taro, { Component } from "@tarojs/taro";
import { View, Button, Image } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import avatarImg from "@/assets/user_center/avatar.jpg";
import "./user_info.scss";

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarTitleText: "个人信息",
      navigationBarBackgroundColor: "#eeeeee"
    };

    this.state = {};
  }
  // componentWillReceiveProps(nextProps) {
  //   console.log(this.props, nextProps);
  // }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  gotoCenter = () => {
    Taro.reLaunch({url:'/pages/login/login'});
  };

  render() {
    return (
      <View className='surgarCubeBtn'>
        <View className='listWrap'>
          <View className='listItem'>
            <View className='itemKey'>头像</View>
            <View className='itemValue '>
              <Image src={avatarImg} className='avatarImg'></Image>
            </View>
          </View>
          <View className='listItem'>
            <View className='itemKey'>昵称</View>
            <View className='itemValue'>
              李西西啊
              <AtIcon value='chevron-right' size='15' color='#9e9e9e'></AtIcon>
            </View>
          </View>
          <View className='listItem'>
            <View className='itemKey'>性别</View>
            <View className='itemValue'>
              女
              <AtIcon value='chevron-right' size='15' color='#9e9e9e'></AtIcon>
            </View>
          </View>
          <View className='listItem'>
            <View className='itemKey'>手机号</View>
            <View className='itemValue'>18200291234</View>
          </View>
        </View>
        <Button>换绑手机</Button>
        <Button onClick={this.gotoCenter}>退出登录</Button>
      </View>
    );
  }
}

export default UserInfo;
