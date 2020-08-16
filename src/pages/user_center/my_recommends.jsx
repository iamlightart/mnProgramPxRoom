import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { AtDivider, AtAvatar } from "taro-ui";
import FissionBanner from "@/components/fission/fission_banner";
import cubeBtnImg from "@/assets/common/cube_icon.svg";
import CommonUtils from "@/utils/common_utils";
import { totalRecommend,coustomerList } from "./userServiceApi";
import "./my_recommends.scss";

class MyRecommends extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarTitleText: "我的推荐",
      navigationBarBackgroundColor: "#eeeeee",
      backgroundColor: "#eeeeee"
    };

    this.state = {
      pageNo:1,
      pageSize:100,
      isloading:false,
      isAll:false,
      totalData:{},
      recommendList:[]
    };
  }
  componentWillMount(){
    this.queryTotal()
    this.queryBind()
  }
  queryTotal(){
    totalRecommend().then(({data})=>{
      this.setState({
        totalData:data
      })
    })
  }
  queryBind(){
    const {pageNo,pageSize,recommendList} = this.state
    this.setState({
      isloading:true
    })
    coustomerList({pageSize,pageNo}).then(({data})=>{
      const tempArry = recommendList.concat(data.list)
      this.setState({
        recommendList:tempArry,
        isloading:false,
        isAll:tempArry.length===data.totalCount
      })
        console.log('成功推荐的列表',data)
    })
  }

  render() {
    let [wrapHeight, listHeight] = CommonUtils.getInstance().formatHeight(305);
    const {totalData,recommendList,isloading,isAll} = this.state
    return (
      <View className='contentWrap' style={wrapHeight}>
        <View className='fissionBannerWrap'>
          <FissionBanner type='narrow'></FissionBanner>
        </View>
        <View className='myRecommendsList'>
          <View className='myrecommendsListHeader'>
    <Text className='headerFirstLine'>您已绑定{totalData.bindCount}人，成功推荐{totalData.signCount}人</Text>
            <View className='headerSecondLine'>
    已累积获得 <View className='totalAcquire'>{totalData.incomeScore}</View>
              <Image src={cubeBtnImg} className='cubeBtnImg'></Image>
            </View>
          </View>
          <View className='dividerWrap'>
            <AtDivider
              content='绑定记录'
              fontSize='28'
              fontColor='#707070'
              lineColor='#E1E1E1'
            />
          </View>
          <View className='myRecommendsListBody'>
            <View className='listThRow'>
              <View className='listTh'></View>
              <View className='listTh'>好友名称</View>
              <View className='listTh'>联系电话</View>
              <View className='listTh'>是否签约</View>
            </View>
            <View className='listWrap' style={listHeight}>
          {
             !isloading&&isAll&&<View >defaule View</View> 
          }
              {recommendList.map(item => (
                <View className='listTdRow' key={item.custId}>
                  <View className='listTd'>
                    <View className='avatarImgWrap'>
                      <AtAvatar
                        size='small'
                        circle
                        image={item.targetAvatar}
                      ></AtAvatar>
                    </View>
                  </View>
              <View className='listTd'>{item.targetName}</View>
              <View className='listTd'>{item.targetTel.substring(0,3)+'****'+item.targetTel.substring(-1,4)}</View>
              <View className='listTd'>{item.signFlag===1?'是':'否'}</View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default MyRecommends;
