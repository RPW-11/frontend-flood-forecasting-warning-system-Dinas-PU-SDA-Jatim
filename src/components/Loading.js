import ReactLoading from "react-loading"
const Loading = ({size, color="#FFFFFF"}) => {
    return ( 
        <div className="w-full">
            <ReactLoading type="bars" color={color} className="m-auto" height={size ? size :'30px'} width={size ? size :'30px'}/>
        </div>
     );
}
 
export default Loading;