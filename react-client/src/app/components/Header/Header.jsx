import React from 'react';

import {useResize} from "../../services";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

const Header = () => {
    const { resizeWidth, resizeHeight } = useResize();

    return(
        (resizeWidth < 500 && resizeHeight < 800)? (
            <MobileHeader/>
        ) : <DesktopHeader/>
    );
}

export default Header;                              