import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import locationImg from "@/assets/common/location.svg";
import noLocationImg from "@/assets/common/no_location.svg";
import RightArrowOrangeImg from "@/assets/common/right_arrow_orange.svg";
import GoodsUnitRow from "@/components/sugarcube_store/goods_unit_row";
import InfoListRow from "@/components/common/info_list_row";
import goodsImg1 from "@/assets/sugarcube_store/hair_dryer.png";
import { AtDivider, AtButton } from "taro-ui";
import ExchangeStatusModal from "@/components/common/exchange_status_modal";
import FissionBanner from "@/components/fission/fission_banner";
import "./exchange_info_editor.scss";
// 实体商品编辑地址的页面
class EditAddress extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarTitleText: "确认收货地址",
      navigationBarBackgroundColor: "#eeeeee"
    };

    this.state = {
      // 第一次为0，添加微信地址页面，点击选择后跳转选择地址页面，选择后跳转回并切换状态1
      // 在有地址的时候默认为状态1
      addressState: 1,
      showExhangeDialog: false
    };
  }

  openDialog = () => {
    this.setState({
      showExhangeDialog: true
    });
  };

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
      <View>
        {/* 单独封装了三个状态的ExchangeModal */}
        <ExchangeStatusModal
          showDialog={this.state.showExhangeDialog}
        ></ExchangeStatusModal>
        <View className='contentWrap' hidden={this.state.addressState != 0}>
          <FissionBanner type='narrow'></FissionBanner>
          <View className='whiteBoard confirmWrap'>
            <View className='infoWrap'>
              <Image className='infoImg' src={noLocationImg}></Image>
              <Text className='infoContent'>暂时没有收货地址</Text>
            </View>
            <View className='buttonWrap'>
              <AtButton className='modalConfirmBtn'>使用微信地址</AtButton>
            </View>
          </View>
        </View>
        <View className='contentWrap' hidden={this.state.addressState != 1}>
          <View className='whiteBoard'>
            <View className='addressWrap'>
              <View className='locationWrap'>
                <Image src={locationImg} className='locationImg'></Image>
              </View>
              <View className='addressInfo'>
                <View className='firstLine'>
                  <Text className='name'>李凤麟</Text>
                  <Text className='phoneNum'>18509090909</Text>
                </View>
                <View className='address'>
                  四川省成都市双流区华阳镇街道天府大道南段
                  2716号恒大天府半岛淽澜城
                </View>
              </View>
              <View className='arrowWrap'>
                <Image
                  src={RightArrowOrangeImg}
                  className='rightArrowOrangeImg'
                ></Image>
              </View>
            </View>
          </View>
          <View className='whiteBoard confirmWrap'>
            <View className='exchangeTitle'>兑换奖品</View>

            <View className='goodsUnitWrap'>
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
            <View className='InfoListWrap'>
              <InfoListRow paraName='兑换数量' paraValue='1'></InfoListRow>
              <InfoListRow
                paraName='配送方式'
                paraValue='快递免邮'
              ></InfoListRow>
              <AtDivider height='60' lineColor='#E1E1E1'></AtDivider>
            </View>
            <View className='buttonWrap'>
              <AtButton className='modalConfirmBtn' onClick={this.openDialog}>
                确认提交
              </AtButton>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default EditAddress;