import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text, Picker } from "@tarojs/components";
import { AtIcon, AtModal, AtModalHeader, AtModalContent } from "taro-ui";
import buterDialog from "@/assets/user_center/butler_dialog.svg";
import butlerQR from "@/assets/user_center/butlerQR.jpg";
import "./butler_modal.scss";

class ButlerModal extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarBackgroundColor: "#fdd835",
      backgroundColor: "#eeeeee"
    };
    this.state = {
      addressSelector: ["中德英伦联邦1栋3单元1238-D", "育才竹岛2栋2单元202-A"],
      addressSelectorChecked: "中德英伦联邦1栋3单元1238-D",
      showDialog: this.props.showButerDialog
    };
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
    this.setState({
      showDialog: nextProps.showButerDialog
    });
    // this.props.parent.hideButerDialog();
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  hideButerDialog = () => {
    this.setState({
      showDialog: false
    });
  };

  onAddressChange = e => {
    this.setState({
      addressSelectorChecked: this.state.addressSelector[e.detail.value]
    });
  };

  render() {
    return (
      <AtModal isOpened={this.state.showDialog}>
        <View className='closeBtn' onClick={this.hideButerDialog}>
          <AtIcon value='close' size='14' color='#000'></AtIcon>
        </View>
        <AtModalHeader> 联系管家</AtModalHeader>
        <AtModalContent>
          <View className='modalContentWrap'>
            <Image src={buterDialog} className='butlerDialogImg'></Image>
            {/* <View className='address'>中德英伦联邦1栋3单元1238-D</View> */}

            <Picker
              mode='selector'
              range={this.state.addressSelector}
              onChange={this.onAddressChange}
            >
              <View className='addressPicker'>
                <View className='addressContent'>
                  {this.state.addressSelectorChecked}
                </View>
                <View className='toggleDown'>
                  <AtIcon
                    value='chevron-down'
                    size='14'
                    color='#9E9E9E'
                  ></AtIcon>
                </View>
              </View>
            </Picker>

            <Image src={butlerQR} className='butlerQR'></Image>
            <Text className='hintInfo'>长按保存图片\n您的管家微信二维码</Text>
          </View>
        </AtModalContent>
      </AtModal>
    );
  }
}

export default ButlerModal;
