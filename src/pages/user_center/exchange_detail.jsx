import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import GoodsUnitRow from "@/components/sugarcube_store/goods_unit_row";
import goodsImg1 from "@/assets/sugarcube_store/hair_dryer.png";
import ParaDisplay from "@/components/common/para_display";
import "./exchange_detail.scss";

class ExchangeDetail extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarTitleText: "兑换详情",
      navigationBarBackgroundColor: "#ffffff"
    };

    this.state = {
    };
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}


  render() {
    const hairDryerData = {
      ID: 1,
      type: "substance",
      img: goodsImg1,
      name: "Dyson戴森吹风机HD03",
      value: "价值1399元",
      price: "1000"
    };
    return (
      <View className='contentWrap'>
        <View className='whiteBoard'>
          <GoodsUnitRow
            noBorderBottom
            imgSrc={hairDryerData.img}
            goodsID={hairDryerData.ID}
            goodsType={hairDryerData.type}
            goodsName={hairDryerData.name}
            goodsValue={hairDryerData.value}
            goodsPrice={hairDryerData.price}
            showExchangeBtn={false}
          ></GoodsUnitRow>
        </View>
        <View className='paraWrap'>
          <ParaDisplay
            title='奖品介绍'
            content='Dyson戴森吹风机HD03'
          ></ParaDisplay>
        </View>
        <View className='paraWrap'>
          <ParaDisplay
            title='兑换时间'
            content='2020.06.29 23:23:34'
          ></ParaDisplay>
        </View>
        <View className='paraWrap'>
          <ParaDisplay title='兑换数量' content='1 '></ParaDisplay>
        </View>
        <View className='paraWrap'>
          <ParaDisplay title='兑换状态' content='待发货'></ParaDisplay>
        </View>
        <View className='paraWrap'>
          <ParaDisplay
            title='兑换说明'
            content={
              "1.兑换成功后，可在“我的兑换”中查看\n2.此奖品每兑换1件将消耗20000方糖，兑换成功后方糖不予退还；\n3.此奖品默认申请兑换后7天发货，有任何疑问，欢迎致电客服热线 400 806 3399 （服务时间为每周一到周六：08:30-17:45）"
            }
          ></ParaDisplay>
        </View>
      </View>
    );
  }
}

export default ExchangeDetail;
