import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import rightArrowImg from "@/assets/common/right_arrow.svg";
import SugarcubeBtn from "@/components/sugarcube_store/sugarcube_btn";
import ExchangeRulesLink from "@/components/common/exchange_rules_link";

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
    dataList 数据列表 [] 
  */

class GoodsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftList: [],
      rightList: [],
      leftHeight: 0,
      rightHeight: 0
    };
  }
  componentDidMount(){
    console.log('xxx1')
    const { unitType } = this.props;
    if(unitType==='waterfall')  {
      this.test()
    }
    
  }
  gotoSugarcubeStore = () => {
    if (this.props.showViewMoreLink) {
      Taro.reLaunch({
        url: "/pages/sugarcube_store/sugarcube_store_waterfall"
      });
    }
  };

  computedHeight(src) {
    return new Promise((resolve, reject) => {
      // let query = Taro.createSelectorQuery().in(this.$scope);
    
      //   query.select('#leftCloumn').boundingClientRect();
      //   query.select('#rightColumn').boundingClientRect();
      //   query.exec((res) => {
      //     console.log('获取到的元素',res)
      //     let leftHeight = res[0].height||0;
      //     let rightHeight = res[1].height||0;
      //     resolve({leftHeight,rightHeight});
      //   });
     
          Taro.getImageInfo({
            src,
            success:function(result){
              resolve(result.height);
            },
            fail:function () {
              resolve(1);
              // reject('err 图片信息获取失败');
            }
          })
     })
    }
  async test() {
    const {dataList} = this.props
    const {leftList,rightList} = this.state
    const leftArry = [];
    const rightArry = [];
    let leftHeight = 0 ;
    let rightHeight = 0 ;
    for (const item of dataList){
        let imageHeight= await this.computedHeight(item.image)
        if(leftHeight<=rightHeight){
          leftArry.push(item)
          leftHeight+=imageHeight
        }else{
          rightArry.push(item)
          rightHeight += imageHeight 
        }
        console.log('左侧',leftHeight)
        console.log('右侧',rightHeight)
      }
    this.setState({
      leftList:leftList.concat(leftArry),
      rightList:rightList.concat(rightArry)
    })
  }
  render() {
    const { dataList = [],unitType } = this.props;
    const {leftList,rightList} = this.state
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
                <Image
                  lazyLoad
                  src={rightArrowImg}
                  className='rightArrow'
                ></Image>
              </View>
            </View>
          </View>
        </View>
        {unitType === "list" &&
          //通过一个const数组直接循环显示列表，noBorderBottom进行末尾边界样式处理
          dataList.map((item, index) => (
            <GoodsUnitRow
              key={item.itemId}
              noBorderBottom={index === dataList.length - 1}
              imgSrc={item.image}
              goodsID={item.itemId}
              goodsType={item.type}
              goodsName={item.name}
              goodsValue={item.content}
              goodsPrice={item.price}
              showExchangeBtn
            ></GoodsUnitRow>
          ))}

        {unitType === "waterfall" && (
          <View>
            <ExchangeRulesLink></ExchangeRulesLink>
            <View className='waterfallWrap'>
              <View className='waterfallColumn' id='leftCloumn'>
                {1&&leftList.map(item => {
                  return(
                    <GoodsUnitGrid
                      key={item.itemId+'1'}
                      imgSrc={item.image}
                      goodsID={item.itemId}
                      goodsType={item.type}
                      goodsName={item.name}
                      goodsValue={item.content}
                      goodsPrice={item.price}
                    ></GoodsUnitGrid>
                  )
                })}
              </View>
              <View className='waterfallColumn' id='rightColumn'>
                {rightList.map((item) => {
                  return (
                    <GoodsUnitGrid
                      key={item.itemId+'2'}
                      imgSrc={item.image}
                      goodsID={item.itemId}
                      goodsType={item.type}
                      goodsName={item.name}
                      goodsValue={item.content}
                      goodsPrice={item.price}
                    ></GoodsUnitGrid>
                  );
                })}
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default GoodsContainer;
