import Taro, { Component } from "@tarojs/taro";
import { View,ScrollView } from "@tarojs/components";
import FissionBanner from "@/components/fission/fission_banner";
import GoodsContainer from "@/components/sugarcube_store/goods_container";
import { AtActivityIndicator } from "taro-ui";
import "./sugarcube_store_waterfall.scss";
import queryGiftList from "./shopingApi";

class SugarcubeStoreWaterfall extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarTitleText: "方糖商城",
      navigationBarBackgroundColor: "#eeeeee",
      backgroundColor:"#eeeeee",
    };
    this.state = {
      pageNo:1,
      pageSize:10,
      isAll:false,
      loading:false,
      lisData:[]
    }
  }
  componentWillMount(){
   this.getListData()
  }
  getListData(index=1){
    this.setState({
      loading:true
    })
    const {pageNo,pageSize,lisData} = this.state
    const param={
      pageNo,
      pageSize,
      index
    }
    queryGiftList(param).then(({data})=>{
      const newList = lisData.concat(data.list)
      this.setState({
        pageNo:index+1,
        lisData:newList,
        loading:false,
        isAll:newList.length===data.totalCount
      })

    })
  }
  getMore(){
    if(this.state.isAll) return
    this.getListData()
  }
  render() {
    const {isAll,loading,lisData} = this.state
    return (
      <ScrollView refresherTriggered onScrollToLower={this.getMore.bind(this)} scrollY enableBackToTop className='scrollView'>
        <View className='fissionBannerContainer'>
          <FissionBanner type='narrow'></FissionBanner>
        </View>
        <View className='sugarcubeStoreWrap'>
          <GoodsContainer
            containerTitle='商品明细'            
            unitType='waterfall'
            showSugarcubeBtn
            dataList={lisData}
          ></GoodsContainer>          
        </View>
        <View className='loadMoreBox'>
        {
          isAll&&!loading&&<View className='noMore'>没有更多了~</View>
        }
        
        <AtActivityIndicator isOpened={loading} mode='center' content='加载中...'></AtActivityIndicator>
        </View>
      </ScrollView>
    );
  }
}

export default SugarcubeStoreWaterfall;
