import "taro-ui/dist/style/index.scss";
import Taro, { Component } from "@tarojs/taro";
import { Provider } from "@tarojs/redux";
import Index from "./pages/index";
import configStore from "./store";
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
        "pages/index/index",
        "pages/login/login",
        "pages/login/agreement",
        "pages/sugarcube_store/sugarcube_store_waterfall",
        "pages/my_sugarcube/my_sugarcube",
        "pages/my_sugarcube/sugarcube_rules",
        "pages/ads/fission_promotion/fission_promotion",
        "pages/exchange_process/confirm_exchange",
        "pages/exchange_process/exchange_rules",
        "pages/user_center/my_recommends",
        "pages/user_center/my_exchange",
        "pages/user_info/user_info"
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

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

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
