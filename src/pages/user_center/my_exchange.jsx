import Taro, { Component } from "@tarojs/taro";
import { View,ScrollView } from "@tarojs/components";
import { AtActivityIndicator } from "taro-ui";
import FissionBanner from "@/components/fission/fission_banner";
import CommonUtils from "@/utils/common_utils";
import { queryRedeemList } from "./userServiceApi";
import "./my_exchange.scss";

class MyExchange extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarTitleText: "我的兑换",
      navigationBarBackgroundColor: "#eeeeee",
      backgroundColor: "#eeeeee"
    };
    this.state={
      pageNo:1,
      pageSize:10,
      isAll:false,
      isloading:false,
      dataList:[]
    }
  }
 componentDidMount(){
  this.queryListData()
 }
  queryListData(){
    const{dataList,pageNo,pageSize} = this.state
    this.setState({
      isloading:true
    })
    queryRedeemList({pageNo,pageSize}).then(({data})=>{


    const tempArry =  dataList.concat(data.list)
     this.setState({
       pageNo:pageNo+1,
       dataList:tempArry,
       isAll:tempArry.length === data.totalCount,
       isloading:false,
     })
     
    })
  }
  getMore(){
    if(this.state.isAll) return
    this.queryListData()
  }
  render() {
    let [wrapHeight, listHeight] = CommonUtils.getInstance().formatHeight(120);
    const {dataList,isAll,isloading} = this.state
    return (
      <View className='contentWrap' style={wrapHeight}>
        <View className='fissionBannerWrap'>
          <FissionBanner type='narrow'></FissionBanner>
        </View>
        <View  className='myExchangeList' >
        <ScrollView scrollY className='listWrap' onScrollToLower={this.getMore.bind(this)} style={listHeight}>
            {dataList.map((val,index )=> (
              <View key={index+'index'} className='myExchangeUnit'>
                <View className='unitLeft'>
                  <View className='unitName'>{val.item.name}</View>
                  <View className='unitType'>{val.itemType===1?'现金奖品':'实体奖品'}</View>
                  <View className='unitConditionWrap'>
                    <View className='exchangeTime'>{val.createTime} 申请兑换</View>
                    <View className='exchangeStatus'>{val.sendStatus===1?'待发货':val.sendStatus===2?'已发货':'发货失败'}</View>
                  </View>
                </View>
                <View className='unitRight'>×{val.itemCount}</View>
              </View>
            ))}
            <View className='moreHintMsg'>
              {
               isloading&&<AtActivityIndicator mode='center' content='加载中...'></AtActivityIndicator>
              }
              {
                !isloading&&isAll&&<View>没有数据了~</View>
              }
            </View>
         </ScrollView>
        </View>
      </View>
    );
  }
}

export default MyExchange;
