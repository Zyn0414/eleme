
import NavsComponent from './NavsComponent'

class FinderComponent extends React.Component {   
    constructor(props,context){
        super(props,context)

        this.state={
          
        }
    }
    
    render(){
        console.log(this)
        return (
            <div className="full-height">
               FinderComponent
               <NavsComponent active="/finder"/>
            </div>
        )
    }
}
//定义默认属性
FinderComponent.defaultProps={

}



export default FinderComponent