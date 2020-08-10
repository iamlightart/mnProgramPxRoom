import Taro, { Component } from "@tarojs/taro";
import { View,Image,Text } from "@tarojs/components";
import paraIcon from "@/assets/common/para_icon.svg";
import "./para_display.scss";

class ParaDisplay extends Component {
  constructor(props) {
    super(props);
    this.config = {};

    this.state = {};
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {
  }

  componentDidHide() {}

  gotoFissionPromotion = () => {
    Taro.navigateTo({ url: "/pages/ads/fission_promotion/fission_promotion" });
  };

  render() {
    return (
      <View className='paraWrap'>
        <View className='paraTitle'>
          <Image src={paraIcon} className='paraIcon'></Image>{this.props.title}
        </View>
        <Text className='paraContent'>
          {this.props.content}
        </Text>
      </View>
    );
  }
}

export default ParaDisplay;
