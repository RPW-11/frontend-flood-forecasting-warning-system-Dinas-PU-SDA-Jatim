import ReactLoading from "react-loading"
const Loading = (size) => {
    return ( 
        <div className="w-full">
            <ReactLoading type="bars" color="#FFFFFF" className="m-auto" height={size ? size :'30px'} width={size ? size :'30px'}/>
        </div>
     );
}
 
export default Loading;