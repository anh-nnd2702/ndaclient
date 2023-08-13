import "./loading.css";

const LoadingDiv = ({isLoading}) => {
    return (
        isLoading && <div className='loading-div'><i className="fa fa-spinner fa-spin"></i></div>
    )
}

export default LoadingDiv;