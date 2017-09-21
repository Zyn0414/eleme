
import Fetch from '../modules/fetch'
import store from '../flux/store'
import actions from '../flux/actions'
//https://restapi.ele.me/bgs/poi/search_poi_nearby?keyword=%E4%B8%8A%E6%B5%B7&offset=0&limit=20&longitude=116.474306&latitude=39.830622
class PositionComponent extends React.Component {   
    constructor(props,context){
        super(props,context)

        this.state={
           search_word:'',
           check_list:[],
           position_info:store.getPositionInfo()
        }
    }
    componentDidMount(){
    	let that = this
    	store.addPositionChangeListener(()=>{
    		that.setState({
	            position_info:store.getPositionInfo()
	       	})
    	})
    }
    changeWord(e){
    	this.setState({search_word:e.target.value})
    }
    searWord(e){
    	e.preventDefault()
		let that = this
		let {latitude=39.830622,longitude=116.474306} = that.state.position_info
		Fetch.Get('http://localhost:9000/ele/bgs/poi/search_poi_nearby',{
			offset:0,limit:20,longitude:longitude,latitude:latitude,
			keyword:that.state.search_word
		}).then(res=>res.json()).then(json=>{
			console.log(json)
			that.setState({check_list:json})
		})

    }
    showCheckList(){
    	let that = this;
    	let arr=[]
    	this.state.check_list.forEach((item,i)=>{
    		arr.push(<li onClick={this.changePosition.bind(this,i)}>
               			<h4>{item.name}</h4>
               			<p>{item.address}</p>
               		</li>)
    	})
    	return arr
    }
    changePosition(i){
    	//点击li的时候，获取到这个li所表示的位置信息，调用actions的方法，并作跳转
    	let _info = this.state.check_list[i]
    	let info = {
    		latitude:_info.latitude,
    		longitude:_info.longitude,
    		address:_info.name
    	}
    	actions.changePosition(info)
    	location.hash='/waimai'
    }
    render(){
        
        return (
            <div className="full-height position-box">
               <header>
               	  <span>返回</span>
               	  选择收货地址
               </header>
               
               <form onSubmit={this.searWord.bind(this)} className="poi-3jipw_0">
               <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAAXNSR0IArs4c6QAABBNJREFUWAntWc9rE0EYNRujJ2lLKUJ7FrSKHgsFD15rRREJXgRr0gavosU/QS14EiRtYqVeJCdFDR4ED4VCj4rGg2dbpJS2eDNk63vb3XX229lsZ7MxCg4MM9+Ped/L7MzsN5vMAYOyuLh4rNlsXsSQs6gju7u7w5lMZhDtJto16L6hLudyuZdTU1Nf0U+tZOKQarVadmdn57pt27fgOxrnr9gblmU97Ovre5rP51uKPlG3LdFyuXweqA9QTQhKIg0oZkul0htpMJG1RPEorfn5+XsAumMCFuM7NzMzcxdLxI7x05pDRKvV6pFWq/UcZCe0I6BEsA00q/BZQ38T7SDaYejG0B9qM66ezWavFgqFH1E+UfqDqgFBrIWFhSiSnIlnqJXp6ekV3cxwPJ7EOHyKqNdQLVS/wD7hTsIF3XjfUdMJzCiCzAHstvQD6Ao2RqlYLH6Stii5UqmcwgYsA4/EZZnDmp2VynayT9TdOK+lM0g+6e/vv4md+1Pa4mScGIe2t7cfg+wNje+kyQZziPII2tra+giwwO4mSWyAgiaIkQpPqqoh2xgYGDi936PLWUM8JzUkVziTRowinInD5SPMo25codaLDlH3MFc9bK7JJI9bBfH6xCEe5MDRpInrDQm1Fl+L0MpHvmSycUKoGoWLx1NDLaNufFWn7VvuuztgxHqqBhTpCRUJpYsvfSjz0TPB8AvW0gY2kFxPvr2TDnGJLzAC8YXNF0l0xJf2OqsAC6wlYU8surirAkDGF+Y90cJj5qvPL5CZrnWtSHwZPyqwhV85qBohb6py2n2JL+NHxeOMBohBDhCPGphUL/Fl/ChczmjgUUMOLIWogUn1El/Gj8LlZuL1QS1M1ZwXgapMo+/ijgksGV+Y90QSWlYtABtyUzVVnUqfuMQXYIH4wuaLFi9ivvS7w3yyGyWEGxE/FNvJnpDifYZFfY3ayMTPpPkaZX6KpPkD4qjLqoFU72SIlUbhDOJtUdgsJr3MJ4U+kUgc4mGwSvKAJm4kvjOQV1p48LboF6ylcSa9vqKDjps8y0y/4cbdF/K/leF7P+lP3ZlwdlaRoIQ2lsdD1/ozSiPPOdxCX6Gd0DjbCLAEG4MkuoV6mMD5jnoOt9kvni6uDRClczfv9SoZU7IhogRzZ/Y+2tDVWQ1m2G/BP6uOMSEbOC48EADYeLz8nDOJGjgNPB+DluOJcwW1qY7DRBxFfY/ldkLV6/raGVUdeZVO62seXiyXgF1Dzakx9jOzsURVwDS+jyYla0RUJd1JPwnZnhDljzQl2zOipmS1u76Tx2oyFpnTC/jnUXWnwbt6vX7Yw+spUZJoQ3Z4fX39+F9DtA3Zt/gyzfzVKT2fUY8IZxbnKf8a4geQR/gkedmz/W+7MQO/ADJZA0ikosHZAAAAAElFTkSuQmCC" className="poi-2wSRi_0"/>
               <input onChange={this.changeWord.bind(this)}  type="search" placeholder="请输入地址" autofocus="autofocus" className="poi-i4JjZ_0"/>
               </form>
               <ul>
               		{this.showCheckList()}
               </ul>
            </div>
        )
    }
}
//定义默认属性
PositionComponent.defaultProps={

}



export default PositionComponent