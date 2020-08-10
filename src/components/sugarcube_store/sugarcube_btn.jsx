import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import cubeBtnImg from "@/assets/common/cube_icon.svg";
import rightArrowImg from "@/assets/common/right_arrow.svg";
import "./sugarcube_btn.scss";

class SugarcubeBtn extends Component {
  constructor(props) {
    super(props);
    this.config = {};

    this.state = {};
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {
  }

  componentDidHide() {}

  gotoMySugarcube = () => {
    Taro.navigateTo({ url: "/pages/my_sugarcube/my_sugarcube" });
  };

  render() {
    return (
      
      <View className='surgarCubeBtn'  onClick={this.gotoMySugarcube}>
        
        <Image className='cubeBtnImg' src={cubeBtnImg} ></Image>
        2000
        
        <Image className='rightArrow' src={rightArrowImg} ></Image>
      </View>
    );
  }
}

export default SugarcubeBtn;
