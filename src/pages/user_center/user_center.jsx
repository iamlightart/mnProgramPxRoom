import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtAvatar } from "taro-ui";
import SugarcubeBtn from "@/components/sugarcube_store/sugarcube_btn";
import GoodsContainer from "@/components/sugarcube_store/goods_container";
import FissionBanner from "@/components/fission/fission_banner";
import ButlerModal from "@/components/common/butler_modal";

import myRecommendsImg from "@/assets/user_center/my_recommends.svg";
import myExchangeImg from "@/assets/user_center/my_exchange.svg";
import myButlerImg from "@/assets/user_center/my_butler.svg";
import myServiceImg from "@/assets/user_center/my_service.svg";
import { queryHotGift } from "./userServiceApi";
import "./user_center.scss";


class UserCenter extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarBackgroundColor: "#fdd835",
      backgroundColor: "#eeeeee"
    };
    this.butlerDialog = Taro.createRef();
    this.state = {
      showButlerDialog: false,
      phoneNumber: "18200296606",
      userInfo: Taro.getStorageSync("currentUserInfo"),
      hotList:[]
    };
  }
  componentWillMount(){
    queryHotGift().then(({data})=>{
      this.setState({
        hotList:data||[]
      })
    })
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
  render() {
    const { hotList,userInfo={} } = this.state;
    const {avatar,nickName,score,signFlag,livingDays=0} = userInfo
    return (
      <View className='contentWrap'>
        <View className='headerBannerImg'></View>
        <ButlerModal
          showDialog={this.state.showButlerDialog}
          ref={this.butlerDialog}
        ></ButlerModal>
        <View className='userBanner'>
          <View className='avatarImgWrap' onClick={this.gotoUserInfo}>
            <AtAvatar size='large' circle image={avatar}></AtAvatar>
          </View>
          <View className='userInfo'>
            <View>{nickName}</View>
            <View>{livingDays>0?'已入住'+livingDays:'尚未入住'}</View>
          </View>
          <View className='sugarcubeBtnWrap'>
            <SugarcubeBtn number={score}></SugarcubeBtn>
          </View>
        </View>
        <View className='mainFunctionSection'>
          <View className='mainFunctionUnit' onClick={this.gotoMyRecommends}>
            <Image src={myRecommendsImg} className='mainFunctionImg'></Image>
            我的推荐
          </View>
          <View className='mainFunctionUnit' onClick={this.gotoMyExchange}>
            <Image src={myExchangeImg} className='mainFunctionImg'></Image>
            我的兑换
          </View>
          {signFlag&&<View className='mainFunctionUnit' onClick={this.showButerDialog}>
            <Image src={myButlerImg} className='mainFunctionImg'></Image>
            我的管家
          </View>
          }
          
          <View className='mainFunctionUnit' onClick={this.makePhoneCall}>
            <Image src={myServiceImg} className='mainFunctionImg'></Image>
            我的客服
          </View>
        </View>

        <View className='sugarcubeStoreWrap'>
          <GoodsContainer
            containerTitle='方糖商城'
            showViewMoreLink
            unitType='list'
            dataList={hotList}
          ></GoodsContainer>
        </View>
        <View className='fissionBannerWrap'>
          <FissionBanner></FissionBanner>
        </View>
      </View>
    );
  }
}

export default UserCenter;
