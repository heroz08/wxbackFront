import { useEffect, useMemo, useState } from 'react';
import {
  Button, Tabs, Spin, Input,
} from 'antd';
import { useGet } from '@utils';
import './index.less';

const { TabPane } = Tabs;

function Friends() {
  const search = window.location.search.slice(1);
  const [activeId, setActiveId] = useState(null);
  const [value, setValue] = useState();
  const [searchParams, setSearchParams] = useState({});
  const [page, setPage] = useState({
    size: 100,
    num: 1,
  });
  const query = useMemo(() => ({
    ...page,
    ...searchParams,
  }), [page, searchParams]);

  search.split('&').forEach((item) => {
    const arr = item.split('=');
    query[arr[0]] = arr[1];
  });
  const { data, doFetch } = useGet();
  const { data: detailData, doFetch: doFetchDetail, loading } = useGet();

  const searchClick = () => {
    setSearchParams({
      weChatId: value,
    });
    setPage({
      ...page,
      num: 1,
      size: 100000,
    });
  };

  useEffect(() => {
    doFetch('/getChartList', query);
  }, [doFetch, query]);

  useEffect(() => {
    if (activeId) {
      const _query = {
        friendId: activeId, account: query.account, size: 1000, num: 1,
      };
      doFetchDetail('/getDetail', _query);
    }
  }, [activeId]);

  const deatailData = useMemo(() => (detailData || {}).data || [], [detailData]);

  const { sum = 0, friends = {} } = useMemo(() => (data || {}).data || {}, [data]);

  const keys = Object.keys(friends || {});

  const renderMsg = (type, result, reContentPath, reThumPath) => {
    switch (type) {
    case '图片消息':
      return (
        <img src={reContentPath} alt="" />
      );
    case '语音消息':
      return (
        <audio src={reContentPath} alt="" controls />
      );
    case '视频消息':
      return (
        <video src={reContentPath} alt="" poster={reThumPath} controls />
      );
    case '文字消息':
    default:
      return result;
    }
  };
  const baseUrl = 'http://localhost:8989';
  return (
    <div className="f-page">
      <div className="title">朋友列表</div>
      <div className="content">
        <div className="tabs-wrap">
          <Tabs tabPosition="left" style={{ height: '90%' }} onTabClick={(key) => setActiveId(key)}>
            {keys.map((i) => {
              const item = (friends || {})[i];
              return (
                <TabPane tab={decodeURI(item.nameInfo.replace(/%/g, '%25')).split('\x12')[0]} key={i} />
              );
            })}
          </Tabs>
          <div className="buttons">
            <Button disabled={page.num === 1} onClick={() => setPage({ ...page, num: page.num - 1 })}>上一页</Button>
            <span>{page.num}</span>
            <Button disabled={page.num >= (sum / page.size)} onClick={() => setPage({ ...page, num: page.num + 1 })}>下一页</Button>
          </div>
        </div>
        <div className="search-wrap">
          <div className="search">
            <Input placeholder="请输入微信号" value={value} onChange={(e) => setValue(e.target.value)} />
            <Button type="primary" onClick={searchClick}>查询</Button>
          </div>

        </div>
        <Spin spinning={loading} wrapperClassName="test">
          <div className="tabs-content">
            <div className="title">{friends[activeId] ? decodeURI(friends[activeId].nameInfo.replace(/%/g, '%25')).split('\x12')[0] : ''}</div>
            <div className="msg-content">
              {
                (deatailData || []).map((item) => {
                  const { time, formatMessage } = item;
                  const { type, result, des } = formatMessage;
                  const { contentPath, thumPath } = typeof result === 'object' ? result : {};
                  const reContentPath = baseUrl + (contentPath || '').split('assets')[1];
                  const reThumPath = baseUrl + (thumPath || '').split('assets')[1];
                  return (
                    <div className={`${des === 1 ? 'left' : 'right'} wrap`} key={time}>
                      {
                        renderMsg(type, result, reContentPath, reThumPath)
                      }
                      <span className={`time ${des === 1 ? 'time-left' : 'time-right'}`}>{time}</span>
                    </div>
                  );
                })
              }
            </div>
          </div>
        </Spin>

      </div>
    </div>
  );
}

export default Friends;
