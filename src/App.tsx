import { useEffect, useState } from "react"
import ClaimForm from "./ClaimForm"
import TopBar from "./TopBar"

function App() {
  const [success, setSuccess] = useState(false)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((data) => {
      console.log(data)
    })
  }, [])
  return (
    <div id="main_container" className="container">
      <TopBar />
      {
        !success ? <>
          <div className="d-flex flex-column justify-content-center pt-4 mt-4">
            <p className="logoTitle mx-auto fs-6 text-center text-decoration-underline pb-4 align-items-center">Please fill  below form to claim benifits of the Scheme.</p>
          </div>
          <ClaimForm setSuccess={setSuccess} />
        </>
          :
          <div className="d-flex flex-column justify-content-center pt-4 mt-4">
            <p className="logoTitle mx-auto fs-4 text-center text-success  pb-4 align-items-center">You Will soon get an update on whatsapp about your availed points</p>
          </div>
      }

    </div >
  )
}

export default App