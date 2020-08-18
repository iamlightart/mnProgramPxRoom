import "taro-ui/dist/style/index.scss";
import Taro, { Component } from "@tarojs/taro";
import { Provider } from "@tarojs/redux";
import Index from "./pages/index";
import configStore from "./store";
import { getToken, getOpenId } from "./globalApi";
import "./custom-theme.scss";
import "./app.scss";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore();

class App extends Component {
  constructor(props) {
    super(props);
    this.config = {
      pages: [
        // "pages/login/login",
        // "pages/sugarcube_store/sugarcube_store_waterfall",
        "pages/index/index",
        "pages/apartment_list/apartment_list",
        
        "pages/login/agreement",
        "pages/my_sugarcube/my_sugarcube",
        "pages/my_sugarcube/sugarcube_rules",
        "pages/ads/fission_promotion",
        "pages/ads/fission_login",
        "pages/exchange_process/confirm_exchange",
        "pages/exchange_process/exchange_rules",
        // 实体奖品兑奖地址页
        "pages/exchange_process/edit_address",
        // 虚拟奖品银行信息填写
        "pages/exchange_process/edit_bank_info",
        "pages/user_center/my_recommends",
        "pages/user_center/my_exchange",
        "pages/user_center/exchange_detail",
        "pages/user_info/user_info",
        "pages/user_info/change_number"
      ],
      window: {
        backgroundTextStyle: "light",
        navigationBarBackgroundColor: "#fdd835",
        backgroundColor: "#eeeeee",
        navigationBarTitleText: "WeChat",
        navigationBarTextStyle: "black"
      },
      tabBar: {
        color: "#515151",
        selectedColor: "#000000",
        borderStyle: "white",
        list: [
          {
            pagePath: "pages/apartment_list/apartment_list",
            text: "自助找房",
            iconPath: "assets/index/pixelroomIcon.png",
            selectedIconPath: "./assets/index/pixelroomFocusIcon.png"
          },
          {
            pagePath: "pages/index/index",
            text: "个人中心",
            iconPath: "assets/index/myCenterIcon.png",
            selectedIconPath: "assets/index/myCenterFocusIcon.png"
          }
        ]
      }
    };
  }
  componentWillMount() {
    // referrerInfo
    // console.log('小程序初始化参数',this.$router.params)
    this.wxLogin();
  }
  componentDidMount() {}

  componentDidShow() {
    // 需要检查登录状态
    this.checkedLogin();
  }

  componentDidHide() {}

  componentDidCatchError() {}
  // 检查登录是否失效
  checkedLogin() {
    Taro.checkSession({
      success: function(result) {
        if (result.errMsg === "checkSession:ok") {
        }
      },
      fail: function() {
        this.wxLogin(); //重新调用微信登录
      }
    });
  }
  wxLogin() {
    Taro.login({
      success: function({ code }) {
        if (code) {
          // 获取微信code
          Taro.setStorageSync("wxCode", code);
          getToken().then(({ data }) => {
            if (!data) return;
            Taro.setStorageSync("passwordKey", data.iv);
            Taro.setStorageSync("currentToken", data.token);
          });
          getOpenId({ code }).then(({ data }) => {
            Taro.setStorageSync("currentUserId", data.token.openid);
          });
        }
      },
      fail: function() {
        Taro.showToast({ title: "网络异常 ，拉取数据失败", icon: "none" });
      }
    });
  }
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));
