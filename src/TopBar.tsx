import logo from "./logo.png"


function TopBar() {
    return (
        <div className="d-flex flex-column justify-content-center">
            <div className="logoContainer  mx-auto" >
                <img className="logo" src={logo} height={140} width={140} />
            </div>
            <div className="d-flex flex-column justify-content-center">
                <h1 className="logoTitle mx-auto fs-6 pb-4">Long Lasting Safety Shoes</h1>
            </div>
            <div className="d-flex flex-column justify-content-center">
                <h1 className="logoTitle mx-auto text-center fs-3">Welcome to Agarson Loyality Program System</h1>
                <h1 className="alps mx-auto fs-4"><b>"ALPS"</b></h1>
            </div>
        </div>
    )
}

export default TopBar