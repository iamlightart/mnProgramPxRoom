import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import rightArrowImg from "@/assets/common/right_arrow.svg";
import SugarcubeBtn from "@/components/sugarcube_store/sugarcube_btn";
import goodsImg1 from "@/assets/sugarcube_store/hair_dryer.png";
import goodsImg2 from "@/assets/sugarcube_store/rent_coupon.png";
import ExchangeRulesLink from "@/components/common/exchange_rules_link"

import "./goods_container.scss";
import GoodsUnitRow from "./goods_unit_row";
import GoodsUnitGrid from "./goods_unit_grid";
/*
    功能：
    方糖商城的商品列表模块。

    属性定义：
    containerTitle: 模块标题
    showSugarcubeBtn: 是否展示我的方糖按钮，跳转进入“我的方糖”页;
    showViewMoreLink: 是否展示查看更多连接，跳转进入“方糖商城”瀑布列表页。
    type='list': 商品以列表方式显示
    type='waterfall'商品以瀑布页方式显示
  */

class GoodsContainer extends Component {
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
  }

  componentDidHide() {}

  /*下面为自定义方法 */
  // 方糖商城跳转

  gotoSugarcubeStore = () => {
    if(this.props.showViewMoreLink){
      Taro.reLaunch({ url: "/pages/sugarcube_store/sugarcube_store_waterfall" });
    }
  };

  render() {
    const numbers = [1, 2, 3, 4];

    const hairDryerData = {
      ID: 1,
      type:'substance',
      img: goodsImg1,
      name: "Dyson戴森吹风机HD03",
      value: "价值1399元",
      price: "1000"
    };

    const rentCouponData = {
      ID: 2,
      type:'rent_coupon',
      img: goodsImg2,
      name: "200元房租抵用券",
      value: "价值200元",
      price: "2000"
    };

    return (
      <View className='goodsContainer'>
        <View className='shopListHeader' onClick={this.gotoSugarcubeStore}>
          <View className='listHeaderTitle'>{this.props.containerTitle}</View>
          <View className='listHeaderFunctionWrap'>
            <View hidden={!this.props.showSugarcubeBtn}>
              <SugarcubeBtn></SugarcubeBtn>
            </View>
            <View hidden={!this.props.showViewMoreLink}>
              <View className='viewMoreLink'>
                查看更多
                <Image src={rightArrowImg} className='rightArrow'></Image>
              </View>
            </View>
          </View>
        </View>
        {this.props.unitType === "list" &&
          //通过一个const数组直接循环显示列表，noBorderBottom进行末尾边界样式处理
          numbers.map(number => (
            <GoodsUnitRow
              key={number}
              noBorderBottom={number === numbers[numbers.length - 1]}
              imgSrc={hairDryerData.img}
              goodsID={hairDryerData.ID}
              goodsType={hairDryerData.type}
              goodsName={hairDryerData.name}
              goodsValue={hairDryerData.value}
              goodsPrice={hairDryerData.price}
              showExchangeBtn
            ></GoodsUnitRow>
          ))}
        {this.props.unitType === "waterfall" && (
          <View>
            <ExchangeRulesLink></ExchangeRulesLink>
            <View className='waterfallWrap'>
              <View className='waterfallColumn'>
                <GoodsUnitGrid
                  imgSrc={hairDryerData.img}
                  goodsID={hairDryerData.ID}
                  goodsType={hairDryerData.type}
                  goodsName={hairDryerData.name}
                  goodsValue={hairDryerData.value}
                  goodsPrice={hairDryerData.price}
                ></GoodsUnitGrid>
                <GoodsUnitGrid
                  imgSrc={rentCouponData.img}
                  goodsID={rentCouponData.ID}
                  goodsType={rentCouponData.type}
                  goodsName={rentCouponData.name}
                  goodsValue={rentCouponData.value}
                  goodsPrice={rentCouponData.price}
                ></GoodsUnitGrid>
                <GoodsUnitGrid
                  imgSrc={hairDryerData.img}
                  goodsID={hairDryerData.ID}
                  goodsType={hairDryerData.type}
                  goodsName={hairDryerData.name}
                  goodsValue={hairDryerData.value}
                  goodsPrice={hairDryerData.price}
                ></GoodsUnitGrid>
              </View>
              <View className='waterfallColumn'>
                <GoodsUnitGrid
                  imgSrc={rentCouponData.img}
                  goodsID={rentCouponData.ID}
                  goodsType={rentCouponData.type}
                  goodsName={rentCouponData.name}
                  goodsValue={rentCouponData.value}
                  goodsPrice={rentCouponData.price}
                ></GoodsUnitGrid>
                <GoodsUnitGrid
                  imgSrc={hairDryerData.img}
                  goodsID={hairDryerData.ID}
                  goodsType={hairDryerData.type}
                  goodsName={hairDryerData.name}
                  goodsValue={hairDryerData.value}
                  goodsPrice={hairDryerData.price}
                ></GoodsUnitGrid>
                <GoodsUnitGrid
                  imgSrc={hairDryerData.img}
                  goodsID={hairDryerData.ID}
                  goodsType={hairDryerData.type}
                  goodsName={hairDryerData.name}
                  goodsValue={hairDryerData.value}
                  goodsPrice={hairDryerData.price}
                ></GoodsUnitGrid>
              </View>
            </View>
            <View className='loadMore'>没有更多了~</View>
          </View>
        )}
      </View>
    );
  }
}

export default GoodsContainer;
