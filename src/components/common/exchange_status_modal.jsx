import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import {
  AtIcon,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtButton
} from "taro-ui";
import prizeImg from "@/assets/common/prize.svg";
import purseImg from "@/assets/common/purse.svg";
import cryImg from "@/assets/common/cry.svg";
import "./exchange_status_modal.scss";
// 兑奖结算的弹窗

class ExchangeStatusModal extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarBackgroundColor: "#fdd835",
      backgroundColor: "#eeeeee"
    };
    this.state = {
      showStatusDialog: this.props.showDialog,
      modalState: 0
    };
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
    this.setState({
      showStatusDialog: nextProps.showDialog
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  hideDialog = () => {
    this.setState({
      showStatusDialog: false
    });
  };

  render() {
    return (
      <AtModal isOpened={this.state.showStatusDialog} closeOnClickOverlay={false}>
        <View hidden={this.state.modalState != 0}>
          <View
            className='closeBtn'
            onClick={this.hideDialog}
            hidden={this.state.modalState}
          >
            <AtIcon value='close' size='14' color='#000'></AtIcon>
          </View>
          <AtModalHeader>温馨提示</AtModalHeader>
          <AtModalContent className='atModalContent'>
            <View className='modalContentWrap'>
              <Image src={cryImg} className='modalPic'></Image>
              <Text className='modalContent'>
                您的方糖不够，尚不能兑换该奖品
              </Text>
              <View className='buttonWrap'>
                <View className='modalBtn'>
                  <AtButton className='modalConfirmBtn'>
                    立即推荐赚方糖
                  </AtButton>
                </View>
              </View>
            </View>
          </AtModalContent>
        </View>
        <View hidden={this.state.modalState != 1}>
          <View
            className='closeBtn'
            onClick={this.hideDialog}
            hidden={this.state.modalState}
          >
            <AtIcon value='close' size='14' color='#000'></AtIcon>
          </View>
          <AtModalHeader>申请成功</AtModalHeader>
          <AtModalContent className='atModalContent'>
            <View className='modalContentWrap'>
              <Image src={prizeImg} className='modalPic'></Image>
              <Text className='modalContent'>
                我们已收到您的兑奖申请，兑奖记录可在“我的兑换”中查看，奖品将于
                <Text className='orange'>7</Text>日内发出， 请注意查收
              </Text>
              <View className='buttonWrap'>
                <View className='modalBtn'>
                  <AtButton className='modalConfirmBtn'>返回个人中心</AtButton>
                </View>
              </View>
            </View>
          </AtModalContent>
        </View>
        <View hidden={this.state.modalState != 2}>
          <View
            className='closeBtn'
            onClick={this.hideDialog}
            hidden={this.state.modalState}
          >
            <AtIcon value='close' size='14' color='#000'></AtIcon>
          </View>
          <AtModalHeader>申请成功</AtModalHeader>
          <AtModalContent className='atModalContent'>
            <View className='modalContentWrap'>
              <Image src={purseImg} className='modalPic'></Image>
              <Text className='modalContent'>
                我们已收到您的兑奖申请，兑奖记录可在“我的兑换”中查看， 款项将于
                7<Text className='orange'>7</Text>个工作日到账， 请注意查收
              </Text>
              <View className='buttonWrap'>
                <View className='modalBtn'>
                  <AtButton className='modalConfirmBtn'>返回个人中心</AtButton>
                </View>
              </View>
            </View>
          </AtModalContent>
        </View>
      </AtModal>
    );
  }
}

export default ExchangeStatusModal;
