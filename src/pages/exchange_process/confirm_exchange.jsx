import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtButton, AtInputNumber } from "taro-ui";
import GoodsUnitRow from "@/components/sugarcube_store/goods_unit_row";

import ParaDisplay from "@/components/common/para_display";
import ExchangeRulesLink from "@/components/common/exchange_rules_link"
import "./confirm_exchange.scss";
import  queryGiftDetails from "./serviceExchangeApi";

class ConfirmExchange extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarTitleText: "兑换奖品",
      navigationBarBackgroundColor: "#eeeeee"
    };

    this.state = {
      value: 1,
      detailsData:{}
    };
  }
  componentWillMount(){
    const goodsId = this.$router.params.goodsID
    this.queryData(goodsId)
  }
  queryData(id){
    const param={
      itemId:id
    }
    queryGiftDetails(param).then(({data})=>{
      console.log('商品详情',data)
      this.setState({
        ...this.state,
        detailsData:data
      })
    })
  }
  handleChange = value => {
    this.setState({
      value
    });
  };


  render() {
    const {detailsData} = this.state
    return (
      <View className='contentWrap'>
        <View className='whiteBoard'>
          <GoodsUnitRow
            noBorderBottom
            imgSrc={detailsData.image}
            goodsID={detailsData.itemId}
            goodsType={detailsData.type}
            goodsName={detailsData.name}
            goodsValue={detailsData.content}
            goodsPrice={detailsData.price}
            showExchangeBtn={false}
          ></GoodsUnitRow>
        </View>
        <ExchangeRulesLink></ExchangeRulesLink>
        <View className='paraWrap'>
          <ParaDisplay
            title='奖品介绍'
            content={"Dyson戴森吹风机HD03\n商品详情具体可参考京东在售同款"}
          ></ParaDisplay>
        </View>
        <View className='paraWrap'>
          <ParaDisplay
            title='兑换说明'
            content={
              `"1.兑换成功后，可在“我的兑换”中查看\n2.此商品每兑换1件将消耗${detailsData.price}方糖，兑换成功后方糖不予退还;\n有任何疑问，欢迎致电客服热线 "`
            }
          ></ParaDisplay>
        </View>
        <View className='bottomWrap'>
          <View className='exchangeNumber'>
            <View>兑换数量</View>
            <AtInputNumber
              min={0}
              max={10}
              step={1}
              value={this.state.value}
              onChange={this.handleChange}
            />
          </View>
          <View className='confirmExchangeBtnWrap'>
            <AtButton className='confirmExchangeBtn' full>
              立即兑换
            </AtButton>
          </View>
        </View>
      </View>
    );
  }
}

export default ConfirmExchange;
