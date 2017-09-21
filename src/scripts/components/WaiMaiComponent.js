
import NavsComponent from './NavsComponent'
import WaiMaiHeader from './WaiMaiHeader'


import store from '../flux/store'
import actions from '../flux/actions'
class WaiMaiComponent extends React.Component {   
    constructor(props,context){
        super(props,context)

        this.state={
            position_info:store.getPositionInfo()
        }
    }
    componentWillMount(){
        let that = this
        //因为可能是从position页面跳过来的，已经有了位置信息了，不需要定位了
        if(!this.state.position_info.latitude){
        	actions.getPosition()
        }
        
    }
    render(){
        let {position_info} = this.state
        return (
            <div className="full-height waimai">
               <WaiMaiHeader position_info={position_info}/>
               <NavsComponent/>
            </div>
        )
    }
    componentDidMount(){
    	let that = this
    	//当store里数据改变的时候，组件会重新获取数据
    	store.addPositionChangeListener(()=>{
    		that.setState({
	            position_info:store.getPositionInfo()
	       	})
    	})
    }
}
//定义默认属性
WaiMaiComponent.defaultProps={

}



export default WaiMaiComponent