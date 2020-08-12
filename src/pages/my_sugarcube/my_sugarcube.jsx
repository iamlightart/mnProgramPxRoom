import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";
import FissionBanner from "@/components/fission/fission_banner";
import CubeIconImg from "@/assets/common/cube_icon.svg";
import RightArrowImg from "@/assets/common/right_arrow.svg";
import RightArrowOrangeImg from "@/assets/common/right_arrow_orange.svg";
import CommonUtils from "@/utils/common_utils";
import "./my_sugarcube.scss";


class MySugarcube extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarTitleText: "我的方糖",
      navigationBarBackgroundColor: "#eeeeee",
      backgroundColor: "#eeeeee"
      // navigationStyle:"custom"
    };

    this.state = {
      tabCurrent: 0
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(this.props, nextProps);
  // }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  gotoSugarcubeStore = () => {
    Taro.reLaunch({ url: "/pages/sugarcube_store/sugarcube_store_waterfall" });
  };

  gotoSugarcubeRules=()=>{
    Taro.navigateTo({url:'/pages/my_sugarcube/sugarcube_rules'})
  }

  handleTabClick = value => {
    this.setState({
      tabCurrent: value
    });
  };
  // 适配包裹高度及列表高度的方法,通过系统windowheight计算包裹页面元素的wrap高度和明细列表高度，动态适配
  render() {
    const tabList = [{ title: "收入" }, { title: "支出" }];
    const incomeList = Array.from({ length: 20 }, (v, i) => i);
    const outcomeList = Array.from({ length: 30 }, (v, i) => i);
    // CommonUtils.getInstance().formatHeight(列表上方的占用高度，需要根据不同页面进行有效适配)
    let [wrapHeight, listHeight] = CommonUtils.getInstance().formatHeight(312);

    return (
      // 最大的包裹，通过屏幕高度适配列表高度
      <View className='mySugarcubeWrap' style={wrapHeight}>
        <View className='fissionBannerContainer'>
          <FissionBanner type='narrow'></FissionBanner>
        </View>
        <View className='sugarcubeBalanceWrap'>
          <View className='sugarcubeRulesLink' onClick={this.gotoSugarcubeRules}>
            方糖规则
            <Image src={RightArrowImg} className='rightArrowImg'></Image>
          </View>
          <View className='balanceTitle'>
            当前拥有方糖
            <Image src={CubeIconImg} className='cubeIconImg'></Image>
          </View>
          <View className='sugarcubeBalanceValue'>2000</View>
          <View
            className='sugarcubeStoreLink'
            onClick={this.gotoSugarcubeStore}
          >
            方糖商城
            <Image
              src={RightArrowOrangeImg}
              className='rightArrowOrangeImg'
            ></Image>
          </View>
        </View>
        <View className='balanceDetail'>
          <View className='balanceDetailHeader'>
            <View className='detailHeaderTitle'>方糖明细</View>
          </View>
          <AtTabs
            current={this.state.tabCurrent}
            tabList={tabList}
            onClick={this.handleTabClick}
          >
            <AtTabsPane current={this.state.tabCurrent} index={0} sytle='display:flex'>
              {/* 需要通过listHeight动态匹配屏幕高度适配列表高度  */}
              <View className='tabDetailListWrap' style={listHeight}>
                {incomeList.map(number => (
                  <View
                    key={number}
                    className='tabDetailListUnit incomeListUnit'
                  >
                    <View className='detailInfoWrap'>
                      <View className='detailInfo'>推荐入住成功{number}</View>
                      <View className='detailTime'>2020-06-23 23:12</View>
                    </View>
                    <View className='detailBalanceChange'>+2000</View>
                  </View>
                ))}
              </View>
            </AtTabsPane>
            <AtTabsPane current={this.state.tabCurrent} index={1}>
              <View className='tabDetailListWrap' style={listHeight}>
                {outcomeList.map(number => (
                  <View
                    key={number}
                    className='tabDetailListUnit outcomeListUnit'
                  >
                    <View className='detailInfoWrap'>
                      <View className='detailInfo'>兑换100元现金{number}</View>
                      <View className='detailTime'>2020-06-23 23:12</View>
                    </View>
                    <View className='detailBalanceChange'>-1000</View>
                  </View>
                ))}
              </View>
            </AtTabsPane>
          </AtTabs>
        </View>
      </View>
    );
  }
}

export default MySugarcube;
