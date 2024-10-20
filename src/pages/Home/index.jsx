import React, { useState, useEffect } from "react"
import DesktopHomeView from '../../components/DesktopHomeView/index.jsx'
import MobileHomeView from "../../components/MobileHomeView/index.jsx"

const Home = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 450)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 450)
        }

        window.addEventListener("resize", handleResize)
        // Cleanup event listener on component unmount
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <>
            {isMobile ? <MobileHomeView /> : <DesktopHomeView />}
        </>
    )
}

export default Home
