import { FC, useState, ReactElement, useEffect } from "react"
import "./marquee.scss"
import MarqueeItem from "./Item/Item"

interface IMarqueItem {
    ind: number,
    value: null | ReactElement,
    nextToBeOut: boolean
}

const Marquee: FC <{text: string}> = ({ text }) => {
    const [first, setFirst] = useState<IMarqueItem>({
        ind: 0,
        value: null,
        nextToBeOut: true
    })
    const [second, setSecond] = useState<IMarqueItem>({
        ind: 1,
        value: null,
        nextToBeOut: false
    })

    function newText (key:number) {
        return <MarqueeItem
                    key={key}
                    launchNext={() => launchNext(setFirst, setSecond)}
                    deleteMe={() => deleteMe(setFirst,setSecond)} 
                    text={text}/>
    }

    const launchNext = (setFirst: Function, setSecond: Function) => {
        const toBeLaunched = first.nextToBeOut ? second : first

        if(toBeLaunched.ind === 0) {
            setFirst( (prev: IMarqueItem) => { return {...prev, value: newText(prev.ind), nextToBeOut: true }})
            setSecond( (prev: IMarqueItem) => { return { ...prev, nextToBeOut: false  }})
        }
        else {
            setSecond( (prev: IMarqueItem) => { return { ...prev, value: newText(prev.ind), nextToBeOut: true  }})
            setFirst( (prev: IMarqueItem) => { return {...prev, nextToBeOut: false }})
        }
    }

    const deleteMe = (setFirst: Function, setSecond: Function) => {
        const toBeDeleted = first.nextToBeOut ? first : second
        
        if(toBeDeleted.ind === 0) {
            setFirst( (prev: IMarqueItem) => { return {...prev, value: null, nextToBeOut: false }})
        }
        else {
            setSecond( (prev: IMarqueItem) => { return { ...prev, value: null, nextToBeOut: false  }})
        }
    }

    useEffect(() => {
        setFirst( (prev) => {return {
            ...prev,
            value: newText(prev.ind)
            }
        })
    }, [])

    return (<div className="marquee">
        { first.value }
        { second.value }
    </div>)
} 

export default Marquee