import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { AtDivider, AtAvatar } from "taro-ui";
import FissionBanner from "@/components/fission/fission_banner";
import avatarImg from "@/assets/user_center/avatar.jpg";
import cubeBtnImg from "@/assets/common/cube_icon.svg";
import CommonUtils from "@/utils/common_utils";
import "./my_recommends.scss";

class MyRecommends extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarTitleText: "我的推荐",
      navigationBarBackgroundColor: "#eeeeee",
      backgroundColor: "#eeeeee"
    };

    this.state = {};
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {
    console.log(Taro.getSystemInfoSync());
  }

  componentDidHide() {}

  render() {
    let [wrapHeight, listHeight] = CommonUtils.getInstance().formatHeight(305);
    const recommendList = Array.from({ length: 20 }, (v, i) => i);
    console.log(wrapHeight);
    return (
      <View className='contentWrap' style={wrapHeight}>
        <View className='fissionBannerWrap'>
          <FissionBanner type='narrow'></FissionBanner>
        </View>
        <View className='myRecommendsList'>
          <View className='myrecommendsListHeader'>
            <Text className='headerFirstLine'>您已绑定XX人，成功推荐XX人</Text>
            <View className='headerSecondLine'>
              已累积获得 <View className='totalAcquire'>20000</View>
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
              {recommendList.map(number => (
                <View className='listTdRow' key={number}>
                  <View className='listTd'>
                    <View className='avatarImgWrap'>
                      <AtAvatar
                        size='small'
                        circle
                        image={avatarImg}
                      ></AtAvatar>
                    </View>
                  </View>
                  <View className='listTd'>李西西</View>
                  <View className='listTd'>182****6606</View>
                  <View className='listTd'>否</View>
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
