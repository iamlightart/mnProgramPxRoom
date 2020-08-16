import "taro-ui/dist/style/index.scss";
import Taro, { Component } from "@tarojs/taro";
import { Provider } from "@tarojs/redux";
import Index from "./pages/index";
import configStore from "./store";
import { getToken, getOpenId,queryUserInfo } from "./globalApi";
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
        // "pages/index/index",        
        // "pages/login/agreement",
        // "pages/my_sugarcube/my_sugarcube",
        // "pages/my_sugarcube/sugarcube_rules",
        // "pages/ads/fission_promotion",        
        "pages/ads/fission_login",
        "pages/exchange_process/confirm_exchange",
        "pages/exchange_process/exchange_rules",
        "pages/user_center/my_recommends",
        "pages/user_center/my_exchange",
        "pages/user_info/user_info",
        "pages/user_info/change_number"
      ],
      window: {
        backgroundTextStyle: "light",
        navigationBarBackgroundColor: "#fdd835",
        backgroundColor: "#eeeeee",
        navigationBarTitleText: "WeChat",
        navigationBarTextStyle: "black"
      }
    };
  }
  componentWillMount(){
    this.getbaseMsg();
  }
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}
  // get basics msg
  async getbaseMsg() {
    try {
      const { keys = [] } = Taro.getStorageInfoSync();
      if (!keys.includes("wxCode")) {
        await Taro.login({
          success: function({ code }) {
            if (code) {
              Taro.setStorageSync("wxCode", code);
            }
          }
        });
        await getToken().then(({ data }) => {
          Taro.setStorageSync("passwordKey", data.iv);
          Taro.setStorageSync("currentToken", data.token);
        });
        const code = Taro.getStorageSync("wxCode");
        await getOpenId({ code }).then(({ data }) => {
          Taro.setStorageSync("currentUserId", data.token.openid);
        });
        await queryUserInfo().then(({data})=>{
          if(data){
          Taro.setStorageSync("currentUserInfo", data);
          Taro.redirectTo({ url: "/pages/index/index" });
          }else{
          Taro.redirectTo({ url: "/pages/login/login" });
          }
        })
      }
    } catch (e) {
      console.log('错误信息',e)
      Taro.showToast({ title: "网络异常 ，拉取数据失败",icon:"none" });
    }
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
