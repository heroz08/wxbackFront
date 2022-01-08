import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '@pages/Home';
import Friends from '@pages/Friends';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import '@assets/font/iconfont.css';
import './app.less';

export default function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/friends" component={Friends} />
          {/* <Route path="*" render={(props) => 'page'} /> */}
        </Switch>
      </Router>
    </ConfigProvider>
  );
}
