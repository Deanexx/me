import React, { FC, useState, ReactElement, useEffect, useRef, SyntheticEvent } from "react"
import "./marquee.scss"


const Marquee: FC <{text: string}> = ({ text }) => {
    const DOM_1 = useRef<HTMLParagraphElement>(null)
    const DOM_2 = useRef<HTMLParagraphElement>(null)
    const DOM_header = useRef<HTMLDivElement>(null)
    const animation_duration = 10
    // let animattion_spead = null
 
    let pW: null | number = null
    let headerWidth: null | number = null

    const start = (DOM: HTMLParagraphElement) => {
        DOM.style.transition = `left ${animation_duration}s linear`
        DOM.style.left = -pW! + "px"
    }

    const reset = (DOM: HTMLParagraphElement) => {
        DOM.style.transition = "none"
        DOM.style.left = headerWidth + "px"
    }
    
    useEffect(()=> {
        // getting pW and headerWidth
        pW = parseInt(getComputedStyle(DOM_1.current!).width)
        headerWidth = parseInt(getComputedStyle(DOM_header.current!).width)

        // starting the first animation
        start(DOM_1.current!)

        // setting checker on if <p/> hit the start line
        setInterval(() => {
            let p_1 = parseInt(getComputedStyle(DOM_1.current!).left)
            let p_2 = parseInt(getComputedStyle(DOM_2.current!).left)

            if(p_1 < 0 && p_1 + pW! < headerWidth!)
                start(DOM_2.current!)
            if(p_2 < 0 && p_2 + pW! < headerWidth!)
                start(DOM_1.current!)
        }, 100)
        
        // hanging event listeners
        const transitionListener_1 = () => {
            reset(DOM_1.current!)
        }

        const transitionListener_2 = () => {
            reset(DOM_2.current!)
        }
        // console.log(DOM_1)
        DOM_1.current!.addEventListener("transitionend", transitionListener_1)
        DOM_2.current!.addEventListener("transitionend", transitionListener_2)

        return () => {
            DOM_1.current!.removeEventListener("transitionend", transitionListener_1)
            DOM_2.current!.removeEventListener("transitionend", transitionListener_2)
            reset(DOM_1.current!)
            reset(DOM_2.current!)
        }
    }, [DOM_1, DOM_2, text])


    return (<div ref={DOM_header} className="marquee">
        <p ref={DOM_1} className="marquee__item">{text}</p>
        <p ref={DOM_2} className="marquee__item">{text}</p>
    </div>)
} 

export default Marquee