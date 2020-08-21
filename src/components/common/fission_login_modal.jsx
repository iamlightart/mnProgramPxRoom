import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import {
  AtIcon,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtButton
} from "taro-ui";
import iceCream from "@/assets/ads/ice_cream.svg";
import "./fission_login_modal.scss";

class FissionLoginModal extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarBackgroundColor: "#fdd835",
      backgroundColor: "#eeeeee"
    };
    this.state = {
      showFissionLoginDialog: this.props.showDialog,
      // 0:绑定成功 1：更换绑定 2：温馨提示
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
  toUserCenter(){
    Taro.switchTab({url:"/pages/index/index"})
  }
  toHouse(){
    Taro.switchTab({url:"/pages/apartment_list/apartment_list"})
  }
  render() {
    const{ name} = this.props
    let modalDataArray = [
      {
        title: "绑定成功",
        content: `恭喜您！已成功接受${name}的邀请,快去选房入住吧`
      },
      {
        title: "更换绑定",
        content: `您已将邀请人更换为
        ${name}`
      },
      {
        title: "温馨提示",
        content: "您已成功入住像素公寓，无法接受邀请。"
      }
    ];
    const{modalState} = this.props
    return (
      <AtModal isOpened={this.state.showFissionLoginDialog} closeOnClickOverlay={false}>
        <View className='closeBtn' onClick={this.hideDialog}>
          <AtIcon value='close' size='14' color='#000'></AtIcon>
        </View>
        <AtModalHeader>
          {modalDataArray[modalState].title}
        </AtModalHeader>
        <AtModalContent>
          <View className='modalContentWrap'>
            <Image
              hidden={modalState == 1 || modalState == 2}
              src={iceCream}
              className='modalPic'
            ></Image>
            <Text className='hintInfo'>
              {modalDataArray[modalState].content}
            </Text>
            <View className='buttonWrap'>
              <View className='modalBtn' hidden={modalState != 0}>
                <AtButton className='modalConfirmBtn' onClick={this.toHouse.bind(this)} >去逛逛</AtButton>
              </View>
              <View className='modalBtn' hidden={modalState ===0}>
                <AtButton onClick={this.toUserCenter.bind(this)} className='modalConfirmBtn'>去往个人中心</AtButton>
              </View>
            </View>
          </View>
        </AtModalContent>
      </AtModal>
    );
  }
}

export default FissionLoginModal;
