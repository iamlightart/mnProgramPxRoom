import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtButton } from "taro-ui";

import cubeBtnImg from "@/assets/common/cube_icon.svg";

import "./goods_unit_row.scss";
/*
  noBorderBottom：是否显示底部边距

*/
class GoodsUnitRow extends Component {
  
  /*下面为自定义方法 */
  confirmExchange = () => {
  const {goodsID}=this.props
    Taro.navigateTo({ url: "/pages/exchange_process/confirm_exchange?goodsID="+goodsID });
  };
    
  render() {
    let noBorderBottom;
    if (this.props.noBorderBottom) {
      noBorderBottom = `border-bottom:#fff`;
    }
    const {goodsName,goodsPrice,showExchangeBtn,goodsValue=''} = this.props
    return (
      <View className='goodsUnitRow' style={noBorderBottom}>
        <Image
          className='goodsImg'
          src={this.props.imgSrc}
          mode='aspectFill'
        ></Image>
        <View className='goodsInfo'>
          <View className='goodsName'>{goodsName}</View>
          <View className='goodsValue'>{goodsValue.substring(0,10)}</View>
          <View className='goodsPriceWrap'>
            <View className='goodsPrice'>{goodsPrice}</View>
            <Image src={cubeBtnImg} className='cubeBtnImg'></Image>
          </View>
        </View>
        <View className='exchangeBtnWrap'>
          <View hidden={!showExchangeBtn}>
            <AtButton
              className='exchangeBtn'
              size='small'
              circle
              onClick={this.confirmExchange}
            >
              兑换
            </AtButton>
          </View>
        </View>
      </View>
    );
  }
}

export default GoodsUnitRow;
