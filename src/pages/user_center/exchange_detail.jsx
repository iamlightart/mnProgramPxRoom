import Taro, { Component } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import "./exchange_detail.scss";

class ExchangeDetail extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationStyle: "custom"
    };
  }
 

  componentWillUnmount() {
    console.log('商品详情')
  }


  gotoCenter = () => {
    Taro.reLaunch({url:'/pages/index/index'})
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
