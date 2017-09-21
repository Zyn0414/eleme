//这里是store

//因为store是需要绑定事件和触发事件的
const EventEmitter = require("events").EventEmitter


const store = Object.assign({},EventEmitter.prototype,{
	position_info:{
		
	},
	getPositionInfo(){
		return this.position_info
	},
	changePositionInfo(info){
		this.position_info = info
		this.emit("positionInfo-change")
	},
	addPositionChangeListener(callback){
		this.on("positionInfo-change",callback)
	}
})

export default store
