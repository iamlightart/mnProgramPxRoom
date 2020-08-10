import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import FissionBanner from "@/components/fission/fission_banner";
import CommonUtils from "@/utils/common_utils";
import "./my_exchange.scss";

class MyExchange extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarTitleText: "我的兑换",
      navigationBarBackgroundColor: "#eeeeee",
      backgroundColor: "#eeeeee"
    };

    this.state = {};
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {
    console.log(Taro.getSystemInfoSync());
  }

  componentDidHide() {}

  render() {
    let [wrapHeight, listHeight] = CommonUtils.getInstance().formatHeight(120);
    const exchangeList = Array.from({ length: 20 }, (v, i) => i);
    return (
      <View className='contentWrap' style={wrapHeight}>
        <View className='fissionBannerWrap'>
          <FissionBanner type='narrow'></FissionBanner>
        </View>
        <View className='myExchangeList'>
          <View className='listWrap' style={listHeight}>
            {exchangeList.map(number => (
              <View key={number} className='myExchangeUnit'>
                <View className='unitLeft'>
                  <View className='unitName'>Switch任天堂游戏机</View>
                  <View className='unitType'>实体奖品</View>
                  <View className='unitConditionWrap'>
                    <View className='exchangeTime'>2020.06.29 12:30:23 申请兑换</View>
                    <View className='exchangeStatus'>待发货</View>
                  </View>
                </View>
                <View className='unitRight'>×1</View>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }
}

export default MyExchange;
