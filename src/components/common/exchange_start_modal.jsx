import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import cubeBtnImg from "@/assets/common/cube_icon.svg";
import {
  AtIcon,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtButton
} from "taro-ui";
import goodsImg1 from "@/assets/sugarcube_store/hair_dryer.png";
import "./exchange_start_modal.scss";
// 开始兑奖的弹窗

class ExchangeStartModal extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarBackgroundColor: "#fdd835",
      backgroundColor: "#eeeeee"
    };
    this.state = {
      showFissionLoginDialog: this.props.showDialog
    };
  }
  componentWillMount() {}
  componentWillReceiveProps(nextProps) {
    this.setState({
      showFissionLoginDialog: nextProps.showDialog
    });
  }
  hideDialog = () => {
    this.setState({
      showFissionLoginDialog: false
    });
  };
  startExchange=()=>{
    Taro.navigateTo({url:'/pages/exchange_process/edit_address'})
  }
  render() {
    return (
      <AtModal isOpened={this.state.showFissionLoginDialog}>
        <View className='closeBtn' onClick={this.hideDialog}>
          <AtIcon value='close' size='14' color='#000'></AtIcon>
        </View>
        <AtModalHeader>兑换申请</AtModalHeader>
        <AtModalContent>
          <View className='modalContentWrap'>
            <View className='hintInfo'>
              <View className='infoRow'>
                确认消耗 <Text className='orange'>20000</Text>
                <Image src={cubeBtnImg} className='cubeBtnImg'></Image>
              </View>
              <View className='infoRow'>
                兑换<Text className='goodsName'>Dyson戴森吹风机HD03</Text>
                <Text className='orange'> x1</Text>
              </View>
            </View>
            <View className='goodsImageWrap'>
              <Image className='goodsImage' src={goodsImg1} aspectFill></Image>
            </View>

            <View className='buttonWrap'>
              <View className='modalBtn'>
                <AtButton className='modalConfirmBtn' onClick={this.startExchange}>开始兑换</AtButton>
              </View>
            </View>
          </View>
        </AtModalContent>
      </AtModal>
    );
  }
}

export default ExchangeStartModal;
