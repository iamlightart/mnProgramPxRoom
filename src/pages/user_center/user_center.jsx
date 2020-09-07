import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import {AtAvatar ,AtIcon } from "taro-ui";
import SugarcubeBtn from "@/components/sugarcube_store/sugarcube_btn";
import GoodsContainer from "@/components/sugarcube_store/goods_container";
import FissionBanner from "@/components/fission/fission_banner";
import ButlerModal from "@/components/common/butler_modal";
import { connect } from "@tarojs/redux";
import myRecommendsImg from "@/assets/user_center/my_recommends.svg";
import myExchangeImg from "@/assets/user_center/my_exchange.svg";
import myButlerImg from "@/assets/user_center/my_butler.svg";
import myServiceImg from "@/assets/user_center/my_service.svg";
import headerImage from "@/assets/user_center/avatar.png";
import "./user_center.scss";

@connect(({ globalStore }) => ({
  ...globalStore
}))
class UserCenter extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarBackgroundColor: "#fdd835",
      backgroundColor: "#fdd835"
    };
    this.state = {
      showButlerDialog: false,
      phoneNumber: "400 806 3399",
    };
  }
  gotoUserInfo = () => {
    Taro.navigateTo({ url: "/pages/user_info/user_info" });
  };
  gotoMyRecommends = () => {
    Taro.navigateTo({ url: "/pages/user_center/my_recommends" });
  };
  gotoMyExchange = () => {
    Taro.navigateTo({ url: "/pages/user_center/my_exchange" });
  };
  showButerDialog = () => {
    this.setState({
      showButlerDialog: true
    });
  };
  makePhoneCall = () => {
    Taro.makePhoneCall({
      phoneNumber: this.state.phoneNumber
    });
  };
  closeModal() {
    this.setState({
      showButlerDialog: false
    });
  }
  toLogin() {
    Taro.navigateTo({
      url: "/pages/login/login"
    });
  }
  render() {
    const { hotGoods} = this.props;
    const { userInfo } = this.props;
    return (
      <View className='backgroundWrap'>
        <View className='contentWrap'>
          <View className='headerBannerImg'></View>
          {
             userInfo&&<ButlerModal
               showDialog={this.state.showButlerDialog}
               clearModal={this.closeModal.bind(this)}
             ></ButlerModal>
          }

          {!userInfo && (
            <View className='userBanner'>
              <View className='avatarImgWrap'>
                <AtAvatar size='large' circle image={headerImage}></AtAvatar>
              </View>
              <View className='userInfo notLogin' onClick={this.toLogin.bind(this)}>
                 <View>未登录</View>
                <View className='toLoiginBtn'>
                  <View>注册/登录</View>
                  <AtIcon value='chevron-right' size='19' />
                </View>
              </View>
              <View className='sugarcubeBtnWrap'>
                <SugarcubeBtn number={0}></SugarcubeBtn>
              </View>
            </View>
          )}
          {userInfo && (
            <View className='userBanner'>
              <View className='avatarImgWrap' onClick={this.gotoUserInfo}>
                <AtAvatar
                  size='large'
                  circle
                  image={userInfo.avatar}
                ></AtAvatar>
              </View>
              <View className='userInfo'>
                <View>{userInfo.nickName}</View>
                <View>
                  {userInfo.signFlag === 1
                    ? "已入住 " + userInfo.livingDays + " 天"
                    : "尚未入住"}
                </View>
              </View>
              <View className='sugarcubeBtnWrap'>
                <SugarcubeBtn number={userInfo.score || 0}></SugarcubeBtn>
              </View>
            </View>
          )}

          <View className='mainFunctionSection'>
            <View className='mainFunctionUnit' onClick={this.gotoMyRecommends}>
              <Image src={myRecommendsImg} className='mainFunctionImg'></Image>
              我的推荐
            </View>
            <View className='mainFunctionUnit' onClick={this.gotoMyExchange}>
              <Image src={myExchangeImg} className='mainFunctionImg'></Image>
              我的兑换
            </View>
            {userInfo.signFlag === 1 && (
              <View className='mainFunctionUnit' onClick={this.showButerDialog}>
                <Image src={myButlerImg} className='mainFunctionImg'></Image>
                我的管家
              </View>
            )}

            <View className='mainFunctionUnit' onClick={this.makePhoneCall}>
              <Image src={myServiceImg} className='mainFunctionImg'></Image>
              我的客服
            </View>
          </View>

          <View className='sugarcubeStoreWrap'>
            {hotGoods&&hotGoods.length > 0 && (
              <GoodsContainer
                containerTitle='方糖商城'
                showViewMoreLink
                unitType='list'
                dataList={hotGoods}
              ></GoodsContainer>
            )}
          </View>
          <View className='fissionBannerWrap'>
           <FissionBanner></FissionBanner>
          </View>
        </View>
      </View>
    );
  }
}

export default UserCenter;
