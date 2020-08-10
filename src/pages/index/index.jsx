import { AtTabBar } from "taro-ui";
import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import myCenterIcon from "@/assets/index/myCenterIcon.svg";
import myCenterFocusIcon from "@/assets/index/myCenterFocusIcon.svg";
import pixelroomIcon from "@/assets/index/pixelroomIcon.svg";
import pixelroomFocusIcon from "@/assets/index/pixelroomFocusIcon.svg";

import "./index.scss";
import UserCenter from "../user_center/user_center";
import ApartmentList from "../apartment_list/apartment_list";

class Index extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarTitleText: "像素公寓",
      navigationBarBackgroundColor: "#fdd835",
      backgroundColor:"#eeeeee"
      // navigationStyle:"custom"
    };

    this.state = {
      currentPage: 1
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleClick = currentPage => {
    this.setState({
      currentPage
    });
  };

  render() {
    return (
      <View className='index'>
        {this.state.currentPage === 0 && <ApartmentList></ApartmentList>}
        {this.state.currentPage === 1 && <UserCenter></UserCenter>}
        <AtTabBar
          className='my-tab-bar'
          color='#515151'
          selectedColor='#141414'
          fontSize='10'
          iconSize='24'
          fixed
          tabList={[
            {
              title: "自助找房",
              image: pixelroomIcon,
              selectedImage: pixelroomFocusIcon,
              max: "99"
            },
            {
              title: "个人中心",
              image: myCenterIcon,
              selectedImage: myCenterFocusIcon
            }
          ]}
          onClick={this.handleClick}
          current={this.state.currentPage}
        />
      </View>

      
    );
  }
}

export default Index;
