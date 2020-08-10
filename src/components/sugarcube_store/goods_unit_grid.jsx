import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import cubeBtnImg from "@/assets/common/cube_icon.svg";
import "./goods_unit_grid.scss";
/*
  noBorderBottom：是否显示底部边距

*/
class GoodsUnitGrid extends Component {
  constructor(props) {
    super(props);
    this.config = {};

    this.state = {};
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {
    console.log(this.props.goodsType)
  }

  confirmExchange=()=>{
    Taro.navigateTo({url:'/pages/exchange_process/confirm_exchange'})
  }

  componentDidHide() {}

  /*下面为自定义方法 */
  // 方糖商城跳转

  render() {
    return (
      <View className='goodsUnitGridWrap' onClick={this.confirmExchange}>
        <Image
          mode='widthFix'
          src={"../.." + this.props.imgSrc}
          className='goodsImg'
        ></Image>
        <View className='goodsInfo'>
          <View className='goodsName'>{this.props.goodsName}</View>
          <View className='goodsValue'>{this.props.goodsValue}</View>
          <View>
            <View className='goodsPrice'>{this.props.goodsPrice}</View>
            <Image widthFix src={cubeBtnImg} className='cubeBtnImg'></Image>
          </View>
        </View>
      </View>
    );
  }
}

export default GoodsUnitGrid;
