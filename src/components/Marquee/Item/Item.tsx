import { FC, useRef, useEffect } from "react"
import "./item.scss"

interface IProps {
    text: string,
    launchNext: Function,
    deleteMe: Function
}

const MarqueeItem: FC<IProps> = ({text, launchNext, deleteMe }) => {
    let observed = useRef<HTMLParagraphElement>(null)

    const isReady = <T extends number>(currLeft: T, header_width: T , p_width: T): boolean => {
        return currLeft < 0 && (p_width + currLeft) < header_width ? true : false
    }

    useEffect(() => {
        const marquee = observed.current!

        const transitionendListener = () => {
            deleteMe()}
        marquee.addEventListener("transitionend", transitionendListener)

        const parantNode = marquee.parentNode as Element
        const header_width = parseInt(getComputedStyle(parantNode).width)
        const p_width = parseInt(getComputedStyle(marquee).width)
        
        marquee.style.left = -p_width + "px"

        const intervalRead = setInterval(() => {
            let currLeft = parseInt(getComputedStyle(marquee).left)
            if(isReady(currLeft, header_width, p_width)) {
                launchNext()
                clearInterval(intervalRead)
            }
        }, 400)

        return () => {
             marquee.removeEventListener("transitionend", transitionendListener)
        }
    }, [observed, launchNext, deleteMe])

    return <p ref={observed} className="marquee__text">{text}</p>
}

export default MarqueeItem