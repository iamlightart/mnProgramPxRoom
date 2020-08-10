import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
// import { connect } from "@tarojs/redux";
import { getGlobalData } from "@/store/global_data";
import bgCircle from "@/assets/ads/bg_circle.svg";
import titleText from "@/assets/ads/title_text.svg";
import pixelLogo from "@/assets/ads/pixel_box_logo.svg";
import utilBox from "@/assets/ads/gift_util_box.svg";
import weChartIcon from "@/assets/ads/weChart_icon.svg";
import { AtButton, AtDivider } from "taro-ui";
import { encryptFactory, decryptFactory } from "@/utils/encipher";
import "./fission_promotion.scss";

class FissionPromotion extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarTitleText: "推荐分享",
      navigationBarBackgroundColor: "#eeeeee",
      backgroundColor: "#eeeeee"
      // navigationStyle:"custom"
    };
    this.state = {
      openModal: false,
      isLogin: getGlobalData("token")
      // isLogin:true
    };
  }
  closeModal() {
    const oldState = this.state;
    this.setState({
      ...oldState,
      openModal: false
    });
  }
  showModal() {
    const oldState = this.state;
    this.setState({
      ...oldState,
      openModal: true
    });
  }
  toLogin() {
    Taro.getUserInfo({
      success: function(res) {
        console.log("用户信息", res);
      }
    });
    // wx.getUserInfo().then(res=>{
    //   console.log('res',res)
    // })
    // Taro.navigateTo({
    //   url: "/pages/login/login"
    // });
  }
  testCode() {
    const key = "6724117550073144";
    const iv = 4639180306142775;
    const handleAfter =
      "4N1rm06z36lEEiLnsC5sNEOL0rRrNADZ64cAOetWi/FyeDusiA+ACqVMjt8Egqs4AipAiNGS+Rw72GCDxieqSH7uixHCxwb7HlceuQdfc8VYHzB/gocs2ysuk3jL+gyzxYk4MYsGyy+gcxmaJSmbHJqwj55pCd/JxShCBHQoGhQipVKFEe3Ix9Nsg6IUukWrwm1Csjk9qyWnXx5D6SIQgZlkvtJXF/zaEEN7BOdbykwuP0Yck1bMXZzmgohu9mAD3RCkX0iX0X8vQY9SX50hMs3aVPamXZQqBlpFgAv6Sen8eHhRj5U18cOVd/+FNptVM937fsOmuDljESizmcb72+lUfC6ePX8GNPXuzviPp7jG8ffMUGUe+AmfLtU5BaGqAOz95OihQu0qgeiXGJUzghW5Vgf20LD8ooG4I+jPFvkb5hRpeBh0R4fFBM86gWPy";
    const handleBefore = {
      title: "json在线解析（简版） -JSON在线解析",
      "json.url": "https://www.sojson.com/simple_json.html",
      keywords: "json在线解析",
      功能: [
        "JSON美化",
        "JSON数据类型显示",
        "JSON数组显示角标",
        "高亮显示",
        "错误提示",
        {
          备注: ["www.sojson.com", "json.la"]
        }
      ],
      加入我们: {
        qq群: "259217951"
      }
    };
    const msg = encryptFactory(handleBefore, key, iv);
    console.log("参照密文", handleAfter);
    console.log("加密后的信息", msg);
    console.log("加密后的信息长度", msg.length);
    console.log("两次信息做比对======", msg == handleAfter);
    const sr = decryptFactory(handleAfter, key, iv);
    console.log("解密========", sr);
  }
  render() {
    const isLogin = this.state.isLogin;
    // const { openModal } = this.state;
    return (
      <View className='page-wrap share-page-box'>
        <View className='top-content center'>
          <Image className='top-bg-pic' src={bgCircle} />
          <Image className='top-text-pic' src={titleText} />
        </View>
        <View className='middle-box center'>
          <Image className='middle-logo-pic' src={pixelLogo} />
          <View className='middle-content'>
            <View className='explain-box'>
              <View className='explain'>
                每推荐成功
                <Text className='orange'>1</Text>
                位即可获得像素方糖
                <Image className='icon-logo-pic' src={pixelLogo} />
                可提现¥
                <Text className='orange'>100-200</Text>
                ，累积可换好礼
              </View>
              <View className='gift-pic-box center'>
                <Image className='gift_pic' src={utilBox} />
              </View>
              <View className='divider-box'>
                <AtDivider fontColor='#515151' fontSize='24' height='80'>
                  仅需<Text className='orange'>2</Text>步即可提现
                </AtDivider>
              </View>
              <View className='step-hint-box'>
                <View className='surround-box center'>
                  <Text className='text-box'>分享此页 邀请好友</Text>
                </View>
                <View className='surround-box center right'>
                  <Text className='text-box'>好友入住 方糖提现</Text>
                </View>
                {!isLogin && (
                  <AtButton openType='getUserInfo' className='share-btn'>
                    立即分享
                  </AtButton>
                )}
              </View>
            </View>
          </View>
        </View>
        <AtButton
          className='rule-btn center'
          onClick={this.showModal.bind(this)}
        >
          活动细则
          <View className='btn-icon center'>
            ?<View className='bubble'></View>
          </View>
        </AtButton>
        {isLogin && (
          <View>
            <AtButton
              className='user-center-btn center'
              onClick={this.toLogin.bind(this)}
            >
              返回个人中心
            </AtButton>
            <View className='bottom-menu center'>
              <AtButton className='btn-box' openType='share'>
                <View className='menu-item center wechart-menu'>
                  <Image className='menu-icon' src={weChartIcon} />
                  <Text className='menu-text'>微信好友</Text>
                </View>
              </AtButton>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default FissionPromotion;
