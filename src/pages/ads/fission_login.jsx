import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text, Input } from "@tarojs/components";
import bgCircle from "@/assets/ads/bg_circle.svg";
import sharePic from "@/assets/sharen.png";
import {
  AtAvatar,
  AtButton,
  AtDivider,
} from "taro-ui";
import avatar from "@/assets/user_center/avatar.jpg";
import apartment from "@/assets/common/room.jpg";
import FissionLoginModal from "@/components/common/fission_login_modal";
import "./fission_login.scss";


class FissionLogin extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarTitleText: "分享登录",
      navigationBarBackgroundColor: "#eeeeee",
      backgroundColor: "#fdd835"
      // navigationStyle:"custom"
    };
    this.state = {};
  }
  onShareAppMessage(e) {
    if (e.from === "button") {
      return {
        title: "方糖兑大奖",
        path: "/pages/ads/fission_promotion/fission_promotion",
        imageUrl: sharePic
      };
    }
  }

  fuck = () => {
    console.log("fuck");
  };

  render() {
    let windowHeight =
      Taro.getSystemInfoSync().windowHeight >= 680
        ? Taro.getSystemInfoSync().windowHeight
        : 680;
    console.log(windowHeight);
    return (
      <View className='page-wrap'>
        <FissionLoginModal showDialog></FissionLoginModal>
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
              type='text'
              placeholder='请输入手机号'
              className='login-input'
            />
          </View>
          <View className='login-component-wrap'>
            <Input
              type='text'
              placeholder='请输入验证码'
              className='login-input'
            />
            <AtButton
              size='small'
              circle
              className='getAuthCode'
              onClick={this.fuck}
            >
              获取验证码
            </AtButton>
          </View>
          <View className='login-component-wrap'>
            <AtButton className='accept-btn'>接受邀请</AtButton>
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
