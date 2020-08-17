import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text, Input } from "@tarojs/components";
import bankCardImg from "@/assets/common/bank_card.svg";
import RightArrowOrangeImg from "@/assets/common/right_arrow_orange.svg";
import GoodsUnitRow from "@/components/sugarcube_store/goods_unit_row";
import InfoListRow from "@/components/common/info_list_row";
import goodsImg1 from "@/assets/sugarcube_store/rent_coupon.png";
import ExchangeStatusModal from "@/components/common/exchange_status_modal";
import { AtDivider, AtButton } from "taro-ui";
import FissionBanner from "@/components/fission/fission_banner";
import "./exchange_info_editor.scss";
// 虚拟商品兑奖页面
class EditAddress extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarTitleText: "确认银行卡信息",
      navigationBarBackgroundColor: "#eeeeee"
    };

    this.state = {
      // 第一次为0，添加银行卡信息页面，填写后为正常提交页面，状态1
      // 在有地址的时候默认为状态1
      infoState: 1,
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
      name: "100元现金",
      value: "价值1399元",
      price: "1000"
    };
    return (
      <View>
        {/* 单独封装了三个状态的ExchangeModal */}
        <ExchangeStatusModal
          showDialog={this.state.showExhangeDialog}
        ></ExchangeStatusModal>
        <View className='contentWrap' hidden={this.state.infoState != 0}>
          <FissionBanner type='narrow'></FissionBanner>
          <View className='whiteBoard infoInputWrap'>
            <View className='inputWrap'>
              <Input placeholder='银行卡号' className='inputComponent'></Input>
            </View>
            <View className='inputWrap'>
              <Input placeholder='开户行' className='inputComponent'></Input>
            </View>
            <View className='inputWrap'>
              <Input
                placeholder='收款人姓名'
                className='inputComponent'
              ></Input>
            </View>
            <View className='buttonWrap'>
              <AtButton className='modalConfirmBtn'>确认提交</AtButton>
            </View>
          </View>
        </View>
        <View className='contentWrap' hidden={this.state.infoState != 1}>
          <View className='whiteBoard infoContainer'>
            <View className='addressWrap'>
              <View className='locationWrap'>
                <Image src={bankCardImg} className='locationImg'></Image>
              </View>
              <View className='addressInfo'>
                <View className='firstLine'>
                  <Text className='name'>招商银行储蓄卡</Text>
                </View>
                <View className='address'>6214 8312 8748 7539</View>
              </View>
              <View className='arrowWrap'>
                <Image
                  src={RightArrowOrangeImg}
                  className='rightArrowOrangeImg'
                ></Image>
              </View>
            </View>
            <View className='bankInfo'>
              <Text>李凤麟</Text>
              <Text>18200296606</Text>
              <Text>四川省成都市四川大学支行</Text>
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
              <InfoListRow paraName='兑换数量' paraValue='2'></InfoListRow>
              <InfoListRow
                paraName='配送方式'
                paraValue='提现打款到银行卡'
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
