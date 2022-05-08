import "./eye.scss"
import EyeSVG from "../../../../assets/eye-white.svg"
import { useEffect, useRef, FC } from "react"

const Eye: FC = () => {
    const refContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const eyeLocationHeight = 35;
        let percentHeight = 50
        let percentWidth = 50

        document.onmousemove = (e) => {
            if (e.pageY <= eyeLocationHeight) 
                percentHeight = e.pageY * 50 / eyeLocationHeight
            else 
                percentHeight = e.pageY * 100 / screenHeight + ((screenHeight / 2 + eyeLocationHeight) * 100 / screenHeight)

            percentWidth = (e.pageX + 42) * 100 / screenWidth

            if (refContainer?.current) {
                refContainer.current.style.top = percentHeight + "%"
                refContainer.current.style.left = percentWidth + "%"
            }
        }
    })

    return <div className="header__eye">
        <img className="header__eye__white" src={EyeSVG} alt="." />
        <div className="header__eye__feild">
            <div className="header__eye__feild__black" ref={refContainer}/>
        </div>
    </div>
}

export default Eye;