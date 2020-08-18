import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text, Picker } from "@tarojs/components";
import { AtIcon, AtModal, AtModalHeader, AtModalContent } from "taro-ui";
import buterDialog from "@/assets/user_center/butler_dialog.svg";
import { queryHousekeeper } from "@/globalApi/index";
import "./butler_modal.scss";

class ButlerModal extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarBackgroundColor: "#fdd835",
      backgroundColor: "#eeeeee"
    };
    this.state = {
      currentIndex:0,
      addressSelectorChecked: {},
      stewardList:[],
      showButlerDialog: this.props.showDialog
    };
  }
  componentWillMount(){
    this.queryListData()
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      showButlerDialog: nextProps.showDialog
    });
  }
  hideButerDialog = () => {
    this.setState({
      showButlerDialog: false
    });
  };

  onAddressChange = e => {
    this.setState({
      addressSelectorChecked: this.state.stewardList[e.detail.value],
      currentIndex:Number(e.detail.value)
    });
  };
  queryListData(){
    queryHousekeeper().then(({data})=>{
      this.setState({
        stewardList:data,
        currentIndex:0,
        addressSelectorChecked:data[0]
      })
    })
  }
  render() {
    const{stewardList,showButlerDialog,addressSelectorChecked,currentIndex} = this.state
    return (
      <AtModal isOpened={showButlerDialog} closeOnClickOverlay={false}>
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
              rangeKey='houseName'
              value={currentIndex}
              range={stewardList}
              onChange={this.onAddressChange}
            >
              <View className='addressPicker'>
                <View className='addressContent'>
                  {addressSelectorChecked.houseName}
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

            <Image src={addressSelectorChecked.houseKeeperQrcode} className='butlerQR'></Image>
            <Text className='hintInfo'>长按保存图片\n您的管家微信二维码</Text>
          </View>
        </AtModalContent>
      </AtModal>
    );
  }
}

export default ButlerModal;
