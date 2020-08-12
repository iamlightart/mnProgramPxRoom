import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import FissionBanner from "@/components/fission/fission_banner";
import GoodsContainer from "@/components/sugarcube_store/goods_container";
import "./sugarcube_store_waterfall.scss";


class SugarcubeStoreWaterfall extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarTitleText: "方糖商城",
      navigationBarBackgroundColor: "#eeeeee",
      backgroundColor:"#eeeeee",
      // navigationStyle:"custom"
    };

    this.state = {};
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(this.props, nextProps);
  // }

  componentWillUnmount() {}

  componentDidShow() {
  }

  componentDidHide() {}

  render() {
    return (
      <View className='sugarcubeStoreWrap'>
        <View className='fissionBannerContainer'>
          <FissionBanner type='narrow'></FissionBanner>
        </View>
        <View className='sugarcubeStoreWrap'>
          <GoodsContainer
            containerTitle='商品明细'            
            unitType='waterfall'
            showSugarcubeBtn
          ></GoodsContainer>          
        </View>
      </View>
    );
  }
}

export default SugarcubeStoreWaterfall;
