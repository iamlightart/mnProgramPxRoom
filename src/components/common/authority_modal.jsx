import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import {
  AtIcon,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtButton
} from "taro-ui";
import "./fission_login_modal.scss";

class AuthorityModal extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarBackgroundColor: "#fdd835",
      backgroundColor: "#eeeeee"
    };
    this.state = {
      showFissionLoginDialog: this.props.showDialog,
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
  render() {

    return (
      <AtModal isOpened={this.state.showFissionLoginDialog} closeOnClickOverlay={false}>
        <View className='closeBtn' onClick={this.hideDialog}>
          <AtIcon value='close' size='14' color='#000'></AtIcon>
        </View>
        <AtModalHeader>
        温馨提示
        </AtModalHeader>
        <AtModalContent>
          <View className='modalContentWrap'>
            <Text className='hintInfo'>
              需要XXXX授权
            </Text>
            <View className='buttonWrap'>
              <View className='modalBtn'>
                <AtButton className='modalConfirmBtn'>去设置</AtButton>
              </View>
            </View>
          </View>
        </AtModalContent>
      </AtModal>
    );
  }
}

export default AuthorityModal;
