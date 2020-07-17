import React, {useEffect} from 'react'

import {useResize} from "../../services";
import MobileFooter from "./MobileFooter";
import DesktopFooter from "./DesktopFooter";

const Footer = () => {
    const { resizeWidth, resizeHeight } = useResize();

    return (
        (resizeWidth < 500 && resizeHeight < 800)? (
            <MobileFooter/>
        ): <DesktopFooter/>
    )
}

export default Footer;
