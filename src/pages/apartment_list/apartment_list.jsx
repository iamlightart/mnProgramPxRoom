import Taro, { Component } from "@tarojs/taro";
import { WebView} from "@tarojs/components";

class ApartmentList extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarTitleText: "像素公寓",
      navigationBarBackgroundColor: "#eeeeee",
      backgroundColor: "#eeeeee"
    };

    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
        <WebView
          src='https://hrms.pixelroom.cn/tquery/#/'
          onMessage={this.handleMessage}
        />
    );
  }
}

export default ApartmentList;
