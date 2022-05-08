import { useEffect, useRef } from "react";

const useEffectNoFirstRender = (func: Function, deps: number) => {
    const rendered = useRef(false)

    useEffect(() => {
        if (rendered.current)
            func()
        else rendered.current = true
    }, [deps])
}

export default useEffectNoFirstRender