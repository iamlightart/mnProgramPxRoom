import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
// import { connect } from "@tarojs/redux";
import bgCircle from "@/assets/ads/bg_circle.svg";
import backToCenterBtn from "@/assets/ads/back_to_center.svg";
import detailBtn from "@/assets/ads/detail_btn.svg";
import titleText from "@/assets/ads/title_text.svg";
import pixelLogo from "@/assets/ads/pixel_box_logo.svg";
import utilBox from "@/assets/ads/gift_util_box.jpg";
import weChartIcon from "@/assets/ads/weChart_icon.svg";
import sharePic from "@/assets/sharen.jpg";
import FissionModal from "@/components/common/fission_modal";
import { connect } from "@tarojs/redux";
import { AtButton, AtDivider } from "taro-ui";
import "./fission_promotion.scss";

@connect(({ globalStore }) => ({
  userInfo: globalStore.userInfo
}))
class FissionPromotion extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarTitleText: "推荐分享",
      navigationBarBackgroundColor: "#eeeeee",
      backgroundColor: "#fdd835",
      navigationStyle: "custom"
    };
    this.state = {
      showModal: false
    };
  }
  onShareAppMessage() {
    const {avatar,wxName,code}=this.props.userInfo
      return {
        title: "邀请好友入住像素公寓，返现兑大奖！",
        path: `/pages/ads/fission_login?header=${avatar}&name=${wxName}&code=${code}`,
        imageUrl: sharePic
      };
  }
  showModal() {
    this.setState({
      showModal: true
    });
  }
  toLogin() {
    Taro.navigateTo({
      url: "/pages/login/login?path=/pages/ads/fission_promotion"
    });
  }

  gotoCenter() {
    Taro.reLaunch({
      url: "/pages/index/index"
    });
  }

  render() {
    const { userInfo } = this.props;
    return (
      <View>
        <View className='header-place-holder'>
          <View
            style={`height:${Taro.getSystemInfoSync().statusBarHeight}px`}
          ></View>
          <View style='height:40px'>
            {userInfo && (
              <View onClick={this.gotoCenter.bind(this)}>
                <Image
                  src={backToCenterBtn}
                  className='back-to-center-btn'
                ></Image>
              </View>
            )}
          </View>
        </View>
        <View className='page-wrap'>
          <FissionModal showDialog={this.state.showModal}></FissionModal>
          <View className='top-content '>
            <Image className='top-bg-pic' src={bgCircle} />
            <Image className='top-text-pic' src={titleText} />
            <View onClick={this.showModal.bind(this)}>
              <Image src={detailBtn} className='detail-btn'></Image>
            </View>
          </View>
          <View className='middle-box'>
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
                <View className='gift-pic-box'>
                  <Image className='gift_pic' src={utilBox} mode='widthFix' />
                </View>
                <View className='divider-box'>
                  <AtDivider fontColor='#515151' fontSize='24' height='80'>
                    仅需<Text className='orange'>2</Text>步即可提现
                  </AtDivider>
                </View>
                <View className='surround-boxs'>
                  <View className='surround-box'>
                    <Text className='text-box'>分享此页 邀请好友</Text>
                  </View>
                  <View className='surround-box right'>
                    <Text className='text-box'>好友入住 方糖提现</Text>
                  </View>
                </View>
                <View className='step-hint-box'>
                  {!userInfo && (
                    <AtButton
                      className='share-btn'
                      onClick={this.toLogin.bind(this)}
                    >
                      立即分享
                    </AtButton>
                  )}
                </View>
              </View>
            </View>
          </View>
          {userInfo && (
            <View>
              <View className='bottom-menu '>
                <AtButton className='btn-box' openType='share'>
                  <View className='menu-item wechart-menu'>
                    <Image className='menu-icon' src={weChartIcon}  />
                    <Text className='menu-text'>微信好友</Text>
                  </View>
                </AtButton>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default FissionPromotion;
