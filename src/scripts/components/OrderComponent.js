
import NavsComponent from './NavsComponent'

class OrderComponent extends React.Component {   
    constructor(props,context){
        super(props,context)

        this.state={
          
        }
    }
    
    render(){
        console.log(this)
        return (
            <div className="full-height">
               OrderComponent
               <NavsComponent active="/order"/>
            </div>
        )
    }
}
//定义默认属性
OrderComponent.defaultProps={

}



export default OrderComponent