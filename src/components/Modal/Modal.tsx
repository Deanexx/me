import { FC, ReactChild, MouseEvent, useRef, useEffect, RefObject} from "react";
import "./modal.scss"

const Modal: FC<{ children: ReactChild }> = function ( props ) {
    let DOM_modal = useRef<HTMLDivElement>(null);
    let DOM: null | HTMLDivElement = null;
    let DOM_ = {
        x: 0,
        y: 0
    }

    let mouse_x = 0
    let mouse_y = 0

    useEffect(() => {
        DOM = DOM_modal.current
        DOM_.y = parseInt(getComputedStyle(DOM!).top)
        DOM_.x = parseInt(getComputedStyle(DOM!).left)
    }, [DOM])

    const ft_mouseDown = (e: MouseEvent<HTMLDivElement>) => {
        mouse_x = e.clientX
        mouse_y = e.clientY
        document.addEventListener("mousemove", ft_mouseMove)
    }

    const ft_mouseMove = (e: any) => {
        let mouse_diff = {
            x: e.clientX - mouse_x,
            y: e.clientY - mouse_y
        }
        if(mouse_diff["x"] !== 0) {
            DOM_.x = DOM_.x + mouse_diff["x"]
            DOM!.style.left = DOM_.x + "px"
            mouse_x = e.clientX
        }
        if( mouse_diff["y"] !== 0) {
            DOM_.y = DOM_.y + mouse_diff["y"]
            DOM!.style.top = DOM_.y + "px"
            mouse_y = e.clientY
        }
    }

    return <div className="modal" ref={DOM_modal}>
        <div className="modal__header" 
            onMouseUp={ () => document.removeEventListener("mousemove", ft_mouseMove)}
            onMouseDown={ (e) => ft_mouseDown(e)}>
            <button>X</button>
        </div>
        { props.children }
    </div>
}

export default Modal