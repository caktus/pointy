import { css } from "styled-components";
import { smallerThanDesktop, smallerThanTabletLandscape, phoneOnly } from "./media";

// WIDTHS
export const contentWidthDesktop = '1140px';
export const contentWidthSmallerThanDesktop = '800px';
export const contentWidthSmallerThanTabletLandscape = '650px';

export const desktopContentWell = css`
    width: 100%;
    max-width: ${contentWidthDesktop};
    margin: 0 auto;
`;

export const smallerThanDesktopContentWell = css`
    width: 100%;
    max-width: ${contentWidthSmallerThanDesktop};
    margin: 0 auto;
`;

export const smallerThanTabletLandscapeContentWell = css`
    width: 100%;
    max-width: ${contentWidthSmallerThanTabletLandscape};
    margin: 0 auto;
`;

export const responsiveContentWell = css`
    ${desktopContentWell};

    @media (${smallerThanDesktop}) {
        ${smallerThanDesktopContentWell}
    }

    @media (${smallerThanTabletLandscape}) {
        ${smallerThanTabletLandscapeContentWell}
    }
`;