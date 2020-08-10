import Taro, { Component } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import "./exchange_detail.scss";

class ExchangeDetail extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationStyle: "custom"
    };

    this.state = {};
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  gotoCenter = () => {
    Taro.reLaunch({url:'/pages/index/index'})
    // Taro.navigateBack();
  };

  render() {
    return (
      <View className='surgarCubeBtn' onClick={this.gotoCenter}>
        fission_promotion
        <Button>GotoCenter</Button>
      </View>
    );
  }
}

export default ExchangeDetail;
