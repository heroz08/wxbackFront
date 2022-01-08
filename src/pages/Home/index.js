import { useGet } from '@utils'
import { usePageTo } from '@hooks'
import './index.less'
import {useState} from "react";
import {Button} from 'antd'

function Home() {
  const {data} = useGet('/getAccountList', {}, true)
  const [active, setActive] = useState(null)
  const go = usePageTo()
  const click = (md5) => {
    setActive(md5)
  }

  const Ok = () => {
    console.log(active)
    go('/friends', {account: active})
  }
  return (
    <div className={'page'}>
      <div className="title">账户列表</div>
      <div className="content">
        {
          (data|| []).map(item => {
            return (
              <div key={item.accountMd5} className={active === item.accountMd5 ? 'active' : ''} onClick={() => click(item.accountMd5)}>
                {
                  item.accountMd5
                }
              </div>
            )
          })
        }
      </div>
      <div className="button">
        <Button type="primary" onClick={Ok}>确定</Button>
      </div>
    </div>
  )
}

export default Home
