import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text, Picker } from "@tarojs/components";
import { AtIcon, AtModal, AtModalHeader, AtModalContent } from "taro-ui";
import buterDialog from "@/assets/user_center/butler_dialog.svg";
import { queryHousekeeper } from "@/globalApi/index";
import AuthorityModal from "@/components/common/authority_modal";

import "./butler_modal.scss";

class ButlerModal extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarBackgroundColor: "#fdd835",
      backgroundColor: "#eeeeee"
    };
    this.state = {
      currentIndex: 0,
      AuthModal: false,
      addressSelectorChecked: {},
      stewardList: [],
      showButlerDialog: this.props.showDialog
    };
  }
  componentWillMount() {
    this.queryListData();
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
      currentIndex: Number(e.detail.value)
    });
  };
  queryListData() {
    queryHousekeeper().then(({ data }) => {
      this.setState({
        stewardList: data,
        currentIndex: 0,
        addressSelectorChecked: data[0]
      });
    });
  }
  saveImage(imagePath) {
    const _this = this;
    Taro.authorize({
      scope: "scope.writePhotosAlbum",
      success() {
        Taro.downloadFile({
          url: imagePath,
          success: function(res) {
            console.log(res);
            Taro.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function() {
                Taro.showToast({
                  title: "保存成功",
                  icon: "success",
                  duration: 2000
                });
              },
              fail: function() {
                Taro.showToast({
                  title: "图片保存失败",
                  icon: "none",
                  duration: 2000
                });
              }
            });
          }
        });
      },
      fail: function() {
        _this.setState({
          AuthModal: true
        });
      }
    });
  }
  closeAuthModal() {
    this.setState({
      AuthModal: false
    });
  }
  render() {
    const {
      stewardList,
      showButlerDialog,
      addressSelectorChecked,
      currentIndex,
      AuthModal
    } = this.state;
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

            <Image
              src={addressSelectorChecked.houseKeeperQrcode}
              className='butlerQR'
              onLongPress={this.saveImage.bind(
                this,
                addressSelectorChecked.houseKeeperQrcode
              )}
            />
            <Text className='hintInfo'>长按保存图片\n您的管家微信二维码</Text>
          </View>
        </AtModalContent>
        <AuthorityModal
          showDialog={AuthModal}
          closeModal={this.closeAuthModal.bind(this)}
          content='需要使用保存到相册权限'
        ></AuthorityModal>
      </AtModal>
    );
  }
}

export default ButlerModal;
