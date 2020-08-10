import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

class ApartmentList extends Component {
  constructor(props) {
    super(props);
    this.config = {};

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
      <View>ApartmentList</View>
    );
  }
}

export default ApartmentList;
