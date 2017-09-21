
import getWeather from '../modules/getWeather'
import HeaderSearch from './HeaderSearch'
import Fetch from '../modules/fetch'
import {Link} from 'react-router'
class WaiMaiHeader extends React.Component {

    constructor(props,context){
        super(props,context)
        this.state={
            weather:'',
            hot_search:[],
            swiper:null
        }
    }

    componentWillMount(){
        let that=this
        getWeather((data)=>{
            that.setState({
                weather:data.forecasts["0"].casts["0"].daytemp
            })
            console.log(data)
        })
        //如果是从position页面回来的时候，已经有了定位信息了，也就是说，在willmount的时候已经可以去获取热搜了
        if(this.props.position_info.longitude){
        	this.getHotSearchWord(this.props)
        }
        
    }

    getHotSearchWord(props){
        let that = this
        // https://restapi.ele.me/shopping/v3/hot_search_words?latitude=40.11722&longitude=116.25003/
        Fetch.Get('http://localhost:9000/ele/shopping/v3/hot_search_words',{
            longitude:props.position_info.longitude,
            latitude:props.position_info.latitude
        }).then(res=>{return res.json()}).then(json=>{
            console.log(json)
            that.setState({hot_search:json})
        })
    }

    componentWillReceiveProps(props,state){
        this.getHotSearchWord(props)
    }
    showHotWords(){
        let that = this
        let arr = []
        this.state.hot_search.forEach((item,i)=>{
            arr.push(<div className="swiper-slide">{item.word}</div>)
        })
        return arr;
    }
    render(){
        let {position_info} = this.props
        let {weather} = this.state
        return (
            <div className="waimai-header">
                <h3>
                    <Link to="/position">{position_info.address||'获取地址中...'}</Link>
                    <span>{weather}°</span>
                </h3>
                <HeaderSearch/>
                <div className="swiper-container content__header__nav">
                    <div className="swiper-wrapper">
                        {this.showHotWords()}
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount(){
        this.state.swiper=new Swiper(".content__header__nav",{
            freeMode : false,
            slidesPerView : 'auto',
            freeModeSticky : true ,

        })
    }
    componentDidUpdate(){
        this.state.swiper.update()
    }

}

export default WaiMaiHeader