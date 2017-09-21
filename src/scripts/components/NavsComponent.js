
import {Link} from 'react-router'

class NavsComponent extends React.Component {   
    constructor(props,context){
        super(props,context)

        this.state={
          
        }
    }
    componentWillMount(){
        
    }
    render(){
       let {active} = this.props
        return (
            <div className="navs">
                <Link to="/waimai" className={active=='/waimai'?'active':''}>
                    <span className="iconfont icon-changyonglogo40"></span>
                    <span>外卖</span>
                </Link>
                <Link to="/finder" className={active=='/finder'?'active':''}>
                    <span className="iconfont icon-faxian"></span>
                    <span>发现</span>
                </Link><Link to="/order" className={active=='/order'?'active':''}>
                    <span className="iconfont icon-dingdan"></span>
                    <span>订单</span>
                </Link><Link to="/mine" className={active=='/mine'?'active':''}>
                    <span className="iconfont icon-home"></span>
                    <span>我的</span>
                </Link>
            </div>
        )
    }
}
//定义默认属性
NavsComponent.defaultProps={
    active:"/waimai"
}



export default NavsComponent