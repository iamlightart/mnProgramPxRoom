import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./fission_banner.scss";

class FissionBanner extends Component {
  constructor(props) {
    super(props);
    this.config = {};

    this.state = {
      bannerType:0
    };
  }
  componentDidShow() {
    if(this.props.type==='narrow'){
      this.setState({
        bannerType:1
      })
    }
  }
  gotoFissionPromotion = () => {
    Taro.navigateTo({ url: "/pages/ads/fission_promotion/fission_promotion" });
  };

  render() {
    return (
      <View>
        {this.state.bannerType === 1 &&<View
          className='adsBannerNarrow'
          onClick={this.gotoFissionPromotion}
        ></View>}
        {this.state.bannerType === 0 && <View
          className='adsBannerWide'
          onClick={this.gotoFissionPromotion}
        ></View>}
      </View>
    );
  }
}

export default FissionBanner;
