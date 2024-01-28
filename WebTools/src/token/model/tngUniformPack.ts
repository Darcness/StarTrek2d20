import { BaseTngEraUniformPack } from "./baseTngEraUniformPack";
import { BodyType } from "./bodyTypeEnum";
import SpeciesRestrictions from "./speciesRestrictions";
import Swatch from "./swatch";
import { Token } from "./token";
import UniformCatalog, { DefaultRed } from "./uniformCatalog";
import { UniformEra } from "./uniformEra";
import { IUniformPack } from "./uniformPack";

const TngUniforms = {
    averageMale: `<g>
        <path d="M 384.67959,369.10547 385.69026,399.9668 25.664768,400 35.482889,333.94153 c 0,0 13.301843,17.23559 15.841776,17.3496 3.543486,0.15905 35.879451,-14.97391 64.102465,-28.15851 0,0 81.61182,-9.82586 157.46382,-8.25653 75.85333,1.56933 96.76434,4.88962 96.76434,4.88962 l 11.82508,8.54139 z" style="fill:#d30000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path171962"/>
        <path id="path171958" style="fill:#2d2d2d;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" d="m 192.76758,196.34766 c -7.7246,6.31636 -10.02584,10.26814 -18.35742,12.90039 l -40.91407,18.8789 -38.587887,22.54883 -11.855469,6.04297 -6.742187,6.27734 -9.458985,6.82422 c -11.834754,12.45087 -19.196031,25.30386 -24.970703,40.91211 l -7.462178,22.85516 17.819366,19.29791 c 0,0 37.46611,-17.65617 61.569973,-29.92078 L 122.21094,400 h 9.0664 l -4.45312,-22.53125 -3.38086,-15.7207 -2.63867,-9.23633 c 0.30262,-0.25153 -4.71324,-29.26047 -4.42145,-29.51122 53.72766,-5.36401 104.8349,-7.25304 160.40197,-8.7558 l 90.80653,4.94883 3.09318,1.36905 10.99048,6.91199 c -1.21253,-12.5683 -3.41046,-22.47421 -6.53868,-37.51363 -2.78933,-9.06531 -4.292,-11.15774 -12.44531,-16.03906 -8.15467,-4.88133 -35.12648,-17.13343 -45.54883,-21.61915 -9.84364,-4.23663 -26.81508,-12.73545 -37.03906,-17.07812 l -6.62305,-1.67773 c -2.64213,3.06419 -4.412,6.82385 -6.80078,10.1621 l -3.40039,1.93555 c -0.69719,0.19762 -1.30276,2.4575 -2.02296,2.51371 -1.77464,0.1385 -3.70108,-2.21955 -5.43993,-2.39457 -10.87331,-1.412 -25.23027,-9.19472 -34.26758,-15.83203 -9.03865,-6.63732 -26.53516,-28.7168 -26.53516,-28.7168 -0.49631,-1.46118 -1.31633,-3.67197 -2.24609,-4.86718 z"/>
        <path d="m 192.73003,234.86425 c -12.10594,-14.48609 -14.63206,-25.65056 -14.63206,-25.65056 l 14.20751,-12.90486 2.24533,3.81466 c 1.44407,13.03706 11.95042,21.57799 20.29442,29.80199 7.41067,7.304 15.80179,14.11347 24.76343,17.04586 4.20667,1.052 3.568,11.54666 3.352,13.924 -0.216,2.37733 -9.3,8.028 -23.44933,-1.928 -4.76,-3.34934 -14.58897,-9.51363 -26.7813,-24.10309 z" style="opacity:0.199997;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path172060"/>
        <path d="m 177.38371,209.31698 c -14.59807,5.14857 -29.58061,12.35236 -43.88675,18.80982 l -38.589332,22.54934 -11.854667,6.044 -6.742666,6.276 -9.458667,6.824 -8.589333,6.69866 -18.386504,37.68383 C 33.495726,340.01066 28.912069,364.86061 26.4841,391.98601 L 26.678065,400 h 29.32244 c 21.624703,-77.54889 34.366618,-92.52242 41.105648,-98.36756 6.739027,-5.84515 15.611687,-9.92638 23.283687,-12.71571 67.72267,-24.62667 99.84217,-27.94269 99.84217,-27.94269 -23.41857,-16.92422 -34.30021,-28.81499 -42.8483,-51.65706 z" style="display:inline;opacity:0.199997;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path172176"/>
        <path d="m 166.13752,318.60573 c -16.61171,1.02229 -33.79394,2.24272 -50.32061,4.18441 0,0 4.8626,53.87369 6.74309,77.20986 h 26.61447 c 1.04,-22.69333 1.14319,-35.26003 3.72295,-45.71763 2.13712,-8.66324 9.49218,-33.53955 13.2401,-35.67664 z" style="opacity:0.199997;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path172192"/>
        <path style="opacity:0.2;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.911631px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 368.8468,341.20934 c 0,0 4.77388,36.55841 5.6867,45.51056 0.91282,8.95215 1.28756,13.2801 1.28756,13.2801 H 366.379 Z" id="path2"/>
        <path style="color:#000000;fill:#000000;-inkscape-stroke:none" d="m 116.91602,331.40039 -1.36719,0.30273 c 0,0 6.60519,28.32015 9.72002,42.48022 C 127.16184,382.7889 130.57227,400 130.57227,400 h 1.36523 c 0,0 -3.36602,-17.48497 -5.23985,-26.18782 -3.05386,-14.18335 -9.78163,-42.41179 -9.78163,-42.41179 z" id="path1"/>
        <path style="display:inline;fill:#d30000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 188.05524,203.61303 2.55708,-5.84474 9.04109,11.59817 14.7032,13.33333 23.44365,18.68497 12.96803,3.10503 7.21461,1.46118 3.92695,5.93608 1.04919,-5.17804 5.61747,-4.68498 2.19178,-4.10959 0.54795,-3.01369 4.01826,5.2968 -0.63927,2.55708 -4.84018,6.39269 -3.28767,5.20548 -0.18265,10.13699 -0.27397,4.10959 -2.83105,0.45662 -1.64384,0.0913 -1.73516,1.09589 -2.46575,-1.00456 -0.45662,-14.42923 -1.64384,-3.74429 -4.84018,-1.09589 -18.44749,-5.11416 -18.23677,-13.25469 -11.3256,-11.64032 -12.78539,-13.42466 z" id="path3"/>
        <path style="color:#000000;display:inline;fill:#000000;-inkscape-stroke:none" d="m 186.77981,202.68862 c 0,0 10.55032,14.67639 14.208,18.28441 6.11946,6.03639 12.28437,12.36851 19.63089,17.32617 7.69429,5.19234 16.79694,9.87467 25.34086,12.23583 1.79016,0.49472 3.50149,0.54685 4.97656,0.75 1.47507,0.20315 2.66488,0.52056 3.6875,1.37695 0.819,0.68589 1.13673,1.54892 1.3164,2.76953 0.17968,1.22061 0.15087,2.71522 0.34571,4.28125 0.36509,2.9345 0.084,9.4668 0.084,9.4668 l -0.0391,0.78711 0.69531,0.37305 c 0,0 0.52123,0.28192 1.16602,0.55078 0.64478,0.26885 1.29255,0.63567 2.32617,0.50195 0.84541,-0.10933 1.22484,-0.49099 1.60156,-0.78125 0.12175,-0.0938 0.11706,-0.10153 0.21289,-0.18359 0.39423,0.0963 0.69389,0.24336 1.47266,0.14258 0.88017,-0.11392 2.18555,-0.37891 2.18555,-0.37891 l 0.86914,-0.17578 0.12304,-0.87696 c 0,0 0.57885,-4.03282 0.65039,-6.25195 0.0885,-2.74364 0.0777,-6.49532 0.76758,-8.70898 0.52431,-1.68249 1.62912,-3.43734 2.85547,-4.84961 2.73013,-3.14405 5.6875,-7.92188 5.6875,-7.92188 0,0 -1.49671,-1.79568 -3.12762,-2.32488 0.50617,1.91504 -0.13452,3.46029 -4.44855,8.60809 -1.37425,1.63985 -2.68676,3.59825 -3.35547,5.74414 -0.90919,2.91755 -0.79221,6.74487 -0.87695,9.37304 -0.0509,1.57997 -0.40909,4.15876 -0.53321,5.08789 -0.4206,0.21447 -0.73683,0.29783 -1.11718,0.34706 -0.66429,-0.007 -1.172,-0.1276 -1.79162,-0.47987 -0.334,0.40405 -0.78876,1.10355 -1.49549,1.15039 -0.43975,0.0291 -0.90702,-0.23816 -1.30664,-0.45312 0.0555,-1.19691 0.25996,-5.96046 -0.125,-9.05469 -0.16416,-1.31947 -0.12808,-2.81771 -0.35157,-4.33594 -0.22348,-1.51822 -0.77528,-3.14123 -2.18554,-4.32226 -1.5327,-1.28356 -3.30397,-1.71038 -4.95313,-1.9375 -1.64915,-0.22712 -3.22796,-0.2905 -4.65039,-0.6836 -8.47782,-2.34289 -17.40582,-6.99051 -24.71195,-11.96434 -6.94327,-4.72681 -12.99994,-10.88055 -19.16996,-16.9668 -2.84032,-2.80176 -10.56832,-13.2013 -13.16261,-16.76601 -0.54169,-0.74431 -0.2016,-1.58059 -0.2016,-1.58059 z" id="path2-4"/>
        <path style="display:inline;fill:#000000;fill-opacity:0.2;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 230.00274,267.69308 c 0,0 22.27771,5.4179 32.19424,5.06066 7.62637,-0.27474 10.81946,-6.3392 10.81946,-6.3392 0,0 -3.19887,8.67402 -10.86378,8.98111 -10.46769,0.41938 -32.14992,-7.70257 -32.14992,-7.70257 z" id="path1-6"/>
        <path id="path172002" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" d="m 191.79883,195.08398 c -0.92263,-0.14824 -1.90365,0.11663 -2.48047,1 -1.35812,2.07992 -4.78197,6.01277 -11.30274,10.98829 -4.60037,1.52065 -21.07642,7.22857 -51.98046,25.10546 -16.79062,9.71196 -32.650936,18.88602 -36.656254,20.38868 -8.445297,3.16663 -14.804243,9.80901 -15.878906,11.40234 -1.077329,0.63733 -5.047707,1.38449 -8.318359,3.61914 -9.855832,5.31259 -21.475281,23.52657 -28.478516,46.72656 C 30.984404,333.25918 24.036081,390.94615 23.314453,400 l 4.236328,-0.21484 9.425781,-61.22071 c 0,0 12.24553,15.7927 13.800782,16.84766 1.966899,-0.89456 38.703231,-18.16012 63.119136,-30.2832 2.9365,34.67358 3.72081,44.63773 5.89063,74.87109 h 3.92383 c -1.17913,-16.44993 -6.04753,-70.48162 -6.72461,-75.29492 -0.76485,-5.43722 144.00602,-9.27797 153.88281,-8.94922 35.69468,1.1881 62.56719,2.8879 98.26367,5.23437 -0.10396,1.99614 0.15612,3.9796 -0.0351,5.83594 0,0 0.28552,-2.3125 0.625,-5.77539 l 10.83203,7.47266 c 1.81855,14.56464 1.68284,27.60318 1.85742,39.08203 0.17459,11.47886 0.56551,19.79071 0.35351,32.36133 h 4.39063 c -0.50644,-23.28742 -0.81785,-38.92338 -2.77344,-60.10352 -1.5253,-16.51985 -7.14127,-54.01361 -13.22656,-60.71094 -7.53596,-8.29863 -41.69839,-22.24905 -51.86523,-26.61132 -8.09012,-3.47122 -15.92181,-7.33499 -23.70313,-11.09766 -5.24502,-2.73058 -10.54784,-5.45851 -15.44141,-8.24219 -1.4368,-0.81733 -7.59141,-2.47522 -9.05273,-1.33789 -1.98933,1.54665 -2.06944,3.5608 -2.75781,6.41406 -0.72128,2.9897 -2.34159,3.97922 -4.96094,5.18946 -1.47239,0.6803 -2.32422,3.66406 -2.32422,3.66406 0,0 -1.34728,-3.2045 -2.73828,-3.30859 -0.99492,-0.0745 -1.6659,-0.19971 -2.51562,-0.29102 -14.74077,-1.58415 -23.93126,-8.13378 -33.57032,-15.84961 -17.21634,-13.78129 -28.13712,-30.81213 -28.29687,-31.11719 -0.34373,-0.77113 -1.20823,-1.33223 -2.13086,-1.48047 z m -0.64453,4.92774 c 0.45936,0.096 0.91243,0.41868 1.26172,0.93359 7.43797,10.96509 15.33548,19.66069 26.80078,28.98438 10.32668,8.39774 20.26446,14.84226 35.5039,16.75781 1.12618,0.0669 3.97111,0.62564 4.66211,1.60938 2.5759,3.66718 1.95477,20.29348 2.3125,20.21874 0.27005,-0.0564 -0.61734,-20.01962 1.53321,-21.23046 1.57265,-0.79117 3.78793,-2.19655 5.04296,-3.79493 2.04363,-2.6027 3.26578,-5.72252 3.77149,-5.30664 1.49013,0.97139 2.30369,4.51092 3.24414,7.71094 -0.10337,0.4479 -0.27264,0.89049 -0.52539,1.32813 -0.792,1.37466 -3.94873,4.11953 -4.41406,5.74218 -0.65467,2.28 -0.90752,4.53043 -1.10352,6.84375 -0.19333,2.27067 0.13581,3.42783 1.00781,5.64649 0.8752,-5.05178 1.34785,-9.16402 4.7039,-13.8086 1.05766,-1.46374 2.22513,-3.02591 3.12618,-4.51367 0.25032,-0.41332 0.61727,-2.01164 0.83594,-2.43164 1.3,-2.49333 -3.40059,-6.73673 -4.16992,-8.91406 -0.044,-0.124 -0.58709,-1.22469 1.32422,-1.30469 1.91129,-0.08 7.74441,3.57111 11.125,5.34375 10.85854,5.69379 20.37321,10.86599 31.30859,15.70703 9.32352,4.1275 41.35761,17.48942 49.37305,25.1875 0.5048,5.21499 1.71127,23.39105 1.41992,37.79688 0,0 -63.71409,-6.61273 -98.40235,-6.40625 -49.79724,0.29642 -119.91418,4.20381 -154.77929,7.625 -2.56557,-3.38766 -3.6361,-6.65948 -7.74219,-12.72461 2.74128,7.12543 3.88391,9.08887 5.11133,13.51758 -11.81183,6.55228 -38.701916,19.18099 -62.308596,29.95898 -4.621081,-4.23802 -8.783583,-10.72038 -13.285156,-17.23242 2.378181,-14.18773 6.479928,-29.46113 11.34375,-38.94727 4.886233,-9.52984 10.972276,-16.48063 17.289063,-23.02148 7.085305,-7.33662 23.557391,3.63854 27.609375,9.20117 0.306663,-1.03467 -0.15526,-2.13012 -0.669922,-3.07812 -2.467992,-4.544 -6.364402,-7.99576 -10.761719,-10.6211 -1.478663,-0.88133 -3.620254,-1.56847 -4.65625,-2.98047 -0.306667,-0.42 11.426613,-7.80136 12.474609,-8.19336 4.258651,-1.5973 19.498656,-10.41251 37.142576,-20.61914 19.56658,-11.31725 38.69721,-21.41223 43.04883,-22.87109 4.29381,-1.43948 5.50759,-1.71988 7.97266,-2.4707 5.20005,-3.00809 8.08571,-5.87399 11.17578,-9.20899 0.36847,-0.39767 0.8336,-0.52963 1.29297,-0.43359 z m 179.0664,83.6543 c 3.46633,7.32579 7.69101,26.42255 10.05469,42.83203 l -10.3125,-7.80078 c 0.71017,-8.23175 1.42569,-21.62798 0.25781,-35.03125 z m -1.12304,48.41992 c -0.82447,7.33018 -1.20056,11.63615 -1.55664,16.15234 -1.18566,15.03802 -1.88906,16.90032 -4.48243,51.76172 h 5.375 c 0.78239,-14.89761 0.3287,-27.03836 0.5293,-51.49805 0.0648,-7.90657 0.13477,-16.41601 0.13477,-16.41601 z"/>
        <g id="g1">
            <ellipse style="fill:#fbb03b;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:1.31507;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="path1-3" cx="347.92233" cy="377.3739" rx="16.071701" ry="11.625666" transform="matrix(1,0,-0.03489948,0.99939083,0,0)"/>
            <path id="ellipse2" style="fill:#ffffff;fill-opacity:0.3;fill-rule:evenodd;stroke:none;stroke-width:0.424019;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" d="m 335.09405,366.52754 a 10.610268,14.960989 88.12092 0 0 -15.2965,10.61591 10.610268,14.960989 88.12092 0 0 12.39467,10.48723 10.610268,14.960989 88.12092 0 1 -10.10859,-10.09797 10.610268,14.960989 88.12092 0 1 15.29649,-10.61589 10.610268,14.960989 88.12092 0 1 2.30985,0.13039 10.610268,14.960989 88.12092 0 0 -4.59592,-0.51967 z"/>
            <path id="ellipse3" style="fill:#000000;fill-opacity:0.2;fill-rule:evenodd;stroke:none;stroke-width:0.422913;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" d="m 340.18975,367.20094 a 10.582543,14.921894 88.120919 0 1 5.1334,8.15207 10.582543,14.921894 88.120919 0 1 -15.25647,10.58826 10.582543,14.921894 88.120919 0 1 -5.07922,-0.65978 10.582543,14.921894 88.120919 0 0 9.42057,2.45023 10.582543,14.921894 88.120919 0 0 15.25646,-10.58827 10.582543,14.921894 88.120919 0 0 -9.47474,-9.94251 z"/>
            <path id="ellipse4" style="fill:#000000;fill-opacity:0.2;fill-rule:evenodd;stroke:none;stroke-width:0.427343;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" d="m 329.75944,367.14977 a 10.693447,15.078275 88.120918 0 0 -10.07907,9.99368 10.693447,15.078275 88.120918 0 0 5.74214,8.54652 10.91843,15.395512 88.12092 0 1 -5.42764,-8.46859 10.91843,15.395512 88.12092 0 1 9.76457,-10.07161 z"/>
            <path style="fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:1.31467;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:20;stroke-dasharray:none;stroke-opacity:1" d="m 322.29902,392.42799 c 2.72174,-16.11218 6.74012,-28.28046 13.68133,-40.02049 5.83124,13.08946 9.12206,25.39268 11.01889,39.85856 -2.90072,-6.58521 -7.39707,-16.23798 -10.38711,-16.21657 -4.34813,0.0312 -10.02132,8.63278 -14.31311,16.3785 z" id="path2-8"/>
        </g>
    </g>`,

    averageFemale: `<g>
        <path id="path283350" style="fill:#2d2d2d;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" d="m 193.08008,202.94531 c -2.51861,5.31765 -2.82016,5.73971 -5.07617,9.83789 -3.00937,4.71927 -4.23154,7.9528 -6.19141,11.67969 -14.34653,6.44949 -26.45646,10.66797 -50.14844,24.25195 -16.34719,4.40719 -36.791865,9.01531 -54.478513,19.41797 -3.36933,1.98133 -12.234863,6.10028 -15.736328,8.22657 -9.936676,13.29956 -9.372142,20.97015 -15.105469,36.71679 -4.528166,14.93918 -6.127282,22.48621 -8.525628,33.70263 2.922664,0.34 8.805707,11.51278 11.679037,10.88478 19.406523,-12.5474 33.122769,-21.85347 57.396871,-34.41919 17.87664,-0.78348 160.13869,-2.8764 164.40247,-2.72136 30.162,1.09674 61.42049,2.95395 91.85819,5.13747 0,0 7.2251,6.85673 14.67105,14.89207 -0.74884,-4.7991 -1.47751,-8.20007 -2.12019,-11.54987 -0.80702,-4.20643 -2.24143,-6.7801 -3.45877,-10.88676 -6.20399,-24.60531 -13.73236,-35.41849 -33.14717,-46.12961 -12.89139,-3.90462 -24.58649,-9.43601 -36.99219,-10.875 -5.24833,-0.67437 -12.25435,-7.05271 -15.81521,-9.17431 -6.37982,-3.80115 -8.82454,-6.17628 -11.24141,-8.26905 L 274.9883,240.66602 270.709,235 l -3.2207,8.06836 c -1.53936,0.88783 -2.94755,2.05369 -4.61719,2.66211 -0.8425,0.30701 -1.3636,4.64645 -2.3232,4.67941 -1.34112,0.0461 -3.19049,-4.31495 -4.8975,-4.50949 -10.62185,-1.78919 -26.68533,-8.38611 -35.72266,-15.02344 -7.43374,-5.45879 -23.211,-21.6259 -26.84765,-27.93164 z"/>
        <path d="m 383.91919,399.96653 c -0.144,-0.856 -0.384,-1.68666 -0.64133,-2.34666 -0.696,-1.77734 -2.25467,-3.46 -3.18534,-5.13067 -0.88666,-1.59467 -1.816,-3.20667 -2.61466,-4.83067 -1.45734,-2.968 -0.44625,-2.40922 -0.0256,-5.96605 0.67403,-5.69974 2.13072,-40.56611 -0.0703,-42.57873 -2.21467,-1.17867 -11.48825,-14.43071 -13.99326,-14.68194 -25.56155,-2.5636 -62.78281,-6.03798 -93.81097,-6.76019 -75.85333,-1.56933 -163.34314,4.08738 -163.34314,4.08738 -24.379393,11.17444 -33.620793,17.31697 -56.474883,28.74093 -4.558918,-3.09473 -11.255697,-7.46904 -11.225268,-7.41956 0,0 -6.82726,53.06212 -6.64726,56.15279 0.01467,0.24667 0.03333,0.48933 0.052,0.73333 z" style="fill:#d30000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path283402"/>
        <path d="m 199.85386,247.78521 c -2.93665,-2.47779 -7.28168,-7.44446 -10.22639,-11.3595 -5.69208,-7.56772 -7.29436,-11.28257 -0.41891,-24.25333 3.46894,-6.54427 4.74293,-10.62513 4.74293,-10.62513 l 0.67141,4.26669 c 7.96762,12.63941 11.92435,16.15759 20.26837,24.38157 7.41065,7.30402 11.63496,10.0071 24.00893,16.26979 3.86892,1.95813 4.27646,12.0527 4.06046,14.43004 -0.216,2.37733 -8.33269,9.49419 -23.27996,0.78187 -7.33325,-4.27433 -13.15973,-8.26665 -19.82684,-13.892 z" style="opacity:0.199997;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path283456"/>
        <path d="m 275.1368,243.22809 c 0.14856,1.98118 -0.97427,3.90313 -2.57027,6.5978 -2.38667,4.032 -1.98774,10.53931 -3.45307,14.94731 -0.872,-2.21866 -1.20133,-3.37733 -1.008,-5.648 0.196,-2.31333 0.44933,-4.564 1.104,-6.844 0.46533,-1.62266 2.12907,-5.50464 2.92107,-6.87931 1.59866,-2.768 0.99466,-5.07867 0.372,-8.04267 1.12133,0.88537 1.46027,2.4344 2.07733,3.73334 0.33067,0.75333 0.47427,0.93953 0.55694,2.13553 z" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path283442"/>
        <path style="fill:#d30000;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;fill-opacity:1" d="m 190.41096,209.86301 2.55708,-5.84474 9.04109,11.59817 14.7032,13.33333 19.72603,11.78082 12.96803,3.10503 7.21461,1.46118 3.92695,5.93608 2.2831,-4.74886 4.38356,-5.11416 2.19178,-4.10959 0.54795,-3.01369 4.01826,5.2968 -0.63927,2.55708 -4.84018,6.39269 -3.28767,5.20548 -0.18265,10.13699 -0.27397,4.10959 -2.83105,0.45662 -1.64384,0.0913 -1.73516,1.09589 -2.46575,-1.00456 -0.45662,-14.42923 -1.64384,-3.74429 -4.84018,-1.09589 -18.44749,-5.11416 -14.06393,-7.48858 -11.78082,-10.50228 -12.78539,-13.42466 z" id="path3"/>
        <path style="fill:#2d2d2d;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 111.19981,336.44076 8.65318,23.76395 6.71589,26.66988 L 129.15192,400 h -9.42809 l -2.97049,-32.95023 z" id="path5"/>
        <path id="path283446" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" d="m 191.32346,202.11509 c -2.904,8.85393 -5.93926,14.46411 -10.37416,20.92759 -4.33993,2.2816 -8.9049,4.27874 -13.40438,6.3206 -4.7059,2.14462 -12.46307,6.36178 -21.5957,10.50195 -9.13263,4.1402 -17.97777,6.15144 -29.99024,10.17188 -12.01243,4.02044 -32.682789,12.36459 -44.559732,17.51584 -1.801458,1.21501 -10.517752,4.81172 -12.147295,6.0115 -15.771611,29.05006 -24.623218,71.03068 -28.144531,97.73828 -1.286848,11.80772 -1.337818,18.41265 -1.617188,28.14063 -0.03067,0.17466 -0.07629,0.34877 -0.126953,0.52344 h 4.427735 c 0.254903,-0.11535 0.962586,-17.97981 1.976001,-27.94598 1.104299,-10.85993 4.285528,-26.2268 4.285528,-26.2268 3.22591,2.36767 5.213514,3.48317 9.748185,6.64061 10.748191,-5.74294 50.184846,-26.36359 53.03676,-27.92863 4.44196,-2.46237 11.11712,33.04235 13.00475,52.07609 1.10131,11.10505 0.50737,19.09261 0.44628,23.41791 h 5.31948 c -0.18394,-6.26655 -0.70323,-17.09978 -1.20237,-21.42041 -1.38858,-12.01921 -7.6022,-42.37416 -12.76521,-55.71383 46.64081,-2.60156 107.13119,-5.57844 158.70524,-4.74783 35.30075,0.56852 67.88167,3.88494 94.74057,6.72474 2.20612,12.21263 11.86063,59.9761 17.95777,75.12417 l 4.985,0.0332 -4.7843,-12.69937 c 0.68996,-9.55074 0.67367,-13.88718 0.32513,-29.76299 -0.27256,-12.41497 -0.37868,-16.21925 -2.10377,-28.18133 -0.38765,-2.68806 -2.5339,-10.45341 -3.30324,-13.05475 -2.724,-9.22129 -5.26709,-17.79452 -10.43238,-25.81714 -2.75932,-4.28569 -7.75657,-11.55379 -9.57813,-13.17383 -15.43354,-6.77411 -35.27018,-13.4436 -52.61238,-17.42221 -7.14604,-5.82466 -17.44121,-12.43053 -25.70009,-16.93027 0.17499,-0.7031 0.22308,-1.22735 0.17636,-1.66249 -0.33033,-3.07661 -0.90966,-3.70801 -2.64016,-5.37661 -1.57349,-1.5172 -3.08855,-2.7772 -4.66204,-4.29439 0.10487,2.66663 0.61725,5.41716 -2.78498,8.78833 -3.67781,3.64422 -5.29641,7.61898 -5.29641,7.61898 0,0 -2.69082,-3.937 -4.82495,-4.16251 -14.31036,-1.51216 -25.67388,-6.80461 -35.7142,-13.94202 -17.61486,-12.52197 -25.78633,-27.31293 -25.6555,-27.61164 l 0.70348,-1.66921 c -0.88058,-0.22564 -1.36576,-0.4758 -1.74172,-0.49024 -1.24369,-0.0443 -1.72414,0.85779 -2.07626,1.95878 z m 87.95363,47.26356 c 0.30905,0.19623 5.50011,3.70393 8.51979,5.87526 3.12135,2.24443 9.63684,7.25183 12.64152,8.27896 16.65059,3.90377 24.82355,6.86123 39.90144,11.72104 5.46601,1.84928 8.43383,3.41424 10.9961,5.65039 4.76151,13.17014 7.88096,26.86438 9.26738,40.79966 -4.31074,-0.94094 -75.61664,-7.0335 -94.51276,-7.16173 -50.46106,-0.34243 -110.12194,2.14382 -160.55139,4.68043 -0.94196,-2.13918 -1.15442,-2.32088 -2.11512,-3.98758 -1.67036,-2.89787 -7.261067,-11.5743 -7.261067,-11.5743 1.934486,4.85722 6.391757,16.98051 6.391757,16.98051 -30.670995,16.18398 -34.92959,18.26787 -52.623448,27.78134 -3.553861,-2.3426 -5.556842,-3.3832 -9.555651,-6.32804 5.876853,-26.71759 9.725232,-38.11593 22.722985,-64.23693 2.24977,-0.30739 11.168503,1.18127 15.538093,4.76539 3.13004,2.81101 8.891033,8.71812 11.429687,11.38476 -3.599332,-6.23421 -6.747692,-10.29856 -11.697265,-14.91601 -5.483187,-3.3559 -8.157177,-4.72523 -12.546151,-4.42482 6.410488,-3.26284 36.84763,-14.7874 43.90357,-17.35057 7.05597,-2.5632 20.61947,-5.91788 28.88086,-8.82032 8.26138,-2.90241 12.88737,-5.68053 18.28516,-8.47461 5.39777,-2.79404 13.44505,-6.45282 17.65625,-9.25 l 9.09961,-5.64451 c 3.36996,-2.09039 6.82673,-10.43663 8.36605,-14.73392 0.0686,-0.1915 -0.24893,-1.42634 0.28768,-2.24195 0.51218,-0.77847 1.46138,-0.68515 1.55126,-0.82123 0.16468,-0.24933 2.54643,3.48561 4.22944,5.41022 2.12565,2.4308 2.80383,3.68063 5.27182,6.14758 6.69933,6.6965 9.4324,9.83923 16.30528,14.46001 8.56662,5.75951 14.37342,7.96276 23.57082,10.75156 4.1411,1.25565 7.79176,2.16642 10.91622,2.36265 2.00121,0.12569 4.98789,3.51745 5.50549,7.82117 0.59339,4.93392 0.63029,14.42918 0.63029,14.42918 0,0 1.0059,-9.40807 1.53992,-14.72284 0.44213,-4.40013 2.71551,-7.58471 3.43266,-8.34671 2.39941,-2.54949 4.22696,-4.75923 5.1572,-8.06452 1.51019,0.73857 3.13463,1.94631 3.69351,8.23034 z m 77.21215,36.78147 c 3.67487,5.22417 7.63772,12.20401 10.17311,18.36257 3.23988,7.8698 3.97639,10.09614 5.89148,17.92048 1.45889,5.9605 2.22595,7.85023 3.02285,13.30564 0.0865,0.59238 -7.43501,-9.57479 -11.01559,-13.40584 -0.63349,-12.23422 -6.51365,-31.73136 -8.07185,-36.18285 z m 19.31716,52.86261 c 0.25249,1.46126 1.1859,24.48344 1.26817,27.11271 0.0828,2.64582 -0.28933,14.89871 -0.41442,15.7321 -2.93585,-7.79017 -11.49503,-52.64135 -12.06,-56.23189 2.79599,2.77067 9.03784,11.40017 11.20625,13.38708 z"/>
        <path d="m 31.482052,395.28734 c 0.446666,2.49334 1.180614,2.08466 1.540614,4.67933 h 20.166666 c 0.196,-3.43334 -0.168,-7.00134 -0.09067,-10.296 0.142667,-6.028 1.809568,-11.8813 2.717568,-17.83597 1.664043,-10.89316 4.390792,-21.53944 8.717099,-31.40937 5.682623,-10.91971 7.04473,-14.96286 12.227828,-24.25379 8.061621,-9.83474 8.681112,-10.66445 17.276729,-16.04664 9.830784,-5.05831 15.433984,-7.8084 26.708774,-12.5209 12.06134,-4.93733 26.01867,-8.93733 38.75867,-12.128 2.82667,-0.80533 5.532,-1.54666 8.11733,-2.22666 28.43467,-7.48134 48.85975,-10.78844 48.85975,-10.78844 0,0 -11.6028,-5.51607 -20.87346,-16.6534 -3.08933,-3.71334 -4.36478,-4.90732 -7.25392,-8.99734 -2.88884,-4.0896 -4.18242,-5.97094 -6.46852,-12.06345 -6.75333,2.5483 -27.67151,10.773 -49.25951,23.06767 -18.69995,5.86575 -35.845712,11.49837 -55.441672,20.31762 -6.939001,2.88838 -12.359196,4.7333 -15.263196,7.33997 -9.815593,11.6216 -13.675677,21.85662 -18.57202,40.35778 -3.949413,17.25627 -7.765364,34.88594 -9.352248,49.71932 -1.108,6.50533 -0.995824,8.39911 -2.471784,17.39312 0.117676,5.33145 -0.859554,8.65545 -0.283552,11.86611" style="opacity:0.199997;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path283392"/>
        <path style="fill:#000000;fill-opacity:0.2;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 227.47291,267.71555 c 0,0 22.27771,5.4179 32.19424,5.06066 7.62637,-0.27474 10.81946,-6.3392 10.81946,-6.3392 0,0 -3.19887,8.67402 -10.86378,8.98111 -10.46769,0.41938 -32.14992,-7.70257 -32.14992,-7.70257 z" id="path1"/>
        <path style="color:#000000;fill:#000000;-inkscape-stroke:none" d="m 191.73437,210.06445 -1.91601,1.60547 c 0,0 6.37748,7.6205 10.03516,11.22852 6.11946,6.03639 12.19369,12.57281 19.77343,17.16601 7.72111,4.67887 16.42679,7.45525 24.97071,9.81641 1.79016,0.49472 3.50149,0.54685 4.97656,0.75 1.47507,0.20315 2.66488,0.52056 3.6875,1.37695 0.819,0.68589 1.13673,1.54892 1.3164,2.76953 0.17968,1.22061 0.15087,2.71522 0.34571,4.28125 0.36509,2.9345 0.084,9.4668 0.084,9.4668 l -0.0391,0.78711 0.69531,0.37305 c 0,0 0.52123,0.28192 1.16602,0.55078 0.64478,0.26885 1.29255,0.63567 2.32617,0.50195 0.84541,-0.10933 1.22484,-0.49099 1.60156,-0.78125 0.12175,-0.0938 0.11706,-0.10153 0.21289,-0.18359 0.39423,0.0963 0.69389,0.24336 1.47266,0.14258 0.88017,-0.11392 2.18555,-0.37891 2.18555,-0.37891 l 0.86914,-0.17578 0.12304,-0.87696 c 0,0 0.57885,-4.03282 0.65039,-6.25195 0.0885,-2.74364 0.0777,-6.49532 0.76758,-8.70898 0.52431,-1.68249 1.62912,-3.43734 2.85547,-4.84961 2.73013,-3.14405 5.6875,-7.92188 5.6875,-7.92188 0,0 -1.49671,-1.79568 -3.12762,-2.32488 0.50617,1.91504 -0.13452,3.46029 -4.44855,8.60809 -1.37425,1.63985 -2.68676,3.59825 -3.35547,5.74414 -0.90919,2.91755 -0.79221,6.74487 -0.87695,9.37304 -0.0509,1.57997 -0.40909,4.15876 -0.53321,5.08789 -0.43957,0.0817 -0.73683,0.14609 -1.11718,0.19532 -0.19515,0.0253 -1.26368,-0.15235 -1.26368,-0.15235 l -0.67968,-0.17578 -0.50196,0.48828 c 0,0 -0.19521,0.18817 -0.44531,0.38086 -0.2501,0.1927 -0.64416,0.31328 -0.39648,0.28125 0.1948,-0.0252 -0.5276,-0.11518 -1.04297,-0.33008 -0.14362,-0.0599 -0.14086,-0.0661 -0.26367,-0.12304 0.0555,-1.19691 0.25996,-5.96046 -0.125,-9.05469 -0.16416,-1.31947 -0.12808,-2.81771 -0.35157,-4.33594 -0.22348,-1.51822 -0.77528,-3.14123 -2.18554,-4.32226 -1.5327,-1.28356 -3.30397,-1.71038 -4.95313,-1.9375 -1.64915,-0.22712 -3.22796,-0.2905 -4.65039,-0.6836 -8.47782,-2.34289 -16.9598,-5.07154 -24.3418,-9.54492 -7.18349,-4.35308 -13.14249,-10.72038 -19.3125,-16.80664 -3.43338,-3.38677 -9.875,-11.05469 -9.875,-11.05469 z" id="path2"/>
        <path id="path166529" style="opacity:0.199997;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.27278" d="m 107.43884,322.40056 5.02844,21.8803 c 3.80951,20.16058 6.29521,36.34039 7.02295,55.70935 h 261.51172 c -0.95473,0 -2.51616,-9.21028 -3.97535,-13.51421 0,0 -1.2478,-16.93748 -2.09195,-25.38614 -0.6327,-6.33236 -4.87529,-31.03695 -4.87529,-31.03695 l -7.36357,-5.46303 -15.22255,-2.74651 c 2.26814,3.14343 7.35148,19.12609 9.47848,24.03574 6.23319,14.38773 6.84229,25.55378 2.79564,35.20804 -2.43399,5.80685 -6.73484,6.92657 -12.53618,9.89356 -6.76132,3.45662 -14.76559,3.9113 -22.50024,3.43138 -10.15466,-0.63058 -19.5926,-5.09891 -29.53125,-6.14258 -9.44666,-0.99264 -20.41778,3.21967 -29.50977,5.38477 -18.11198,4.31075 -37.14392,4.82095 -55.82812,2.50781 -19.6448,-2.43206 -43.92721,-7.42536 -51.04881,-19.68731 -4.36665,-7.51848 -4.81298,-16.15119 -5.83789,-24.55664 -0.78314,-7.17836 4.18056,-28.68023 5.4756,-31.76153 z"/>
        <g id="g6">
            <ellipse style="fill:#fbb03b;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:1.32111;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="path1-3" cx="282.30334" cy="380.85043" rx="16.071701" ry="11.732766" transform="matrix(1,0,0.13917311,0.99026807,0,0)"/>
            <path id="ellipse2" style="fill:#ffffff;fill-opacity:0.3;fill-rule:evenodd;stroke:none;stroke-width:0.424019;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" d="m 333.78656,366.52754 a 15.104786,10.509259 7.9520897 0 0 -13.43381,10.61591 15.104786,10.509259 7.9520897 0 0 14.23477,10.48723 15.104786,10.509259 7.9520897 0 1 -11.88039,-10.09797 15.104786,10.509259 7.9520897 0 1 13.43381,-10.61589 15.104786,10.509259 7.9520897 0 1 2.33272,0.13039 15.104786,10.509259 7.9520897 0 0 -4.6871,-0.51967 z"/>
            <path id="ellipse3" style="fill:#000000;fill-opacity:0.2;fill-rule:evenodd;stroke:none;stroke-width:0.422913;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" d="m 339.00042,367.20094 a 15.065315,10.481797 7.9520901 0 1 6.56377,8.15207 15.065315,10.481797 7.9520901 0 1 -13.39863,10.58826 15.065315,10.481797 7.9520901 0 1 -5.19499,-0.65978 15.065315,10.481797 7.9520901 0 0 9.85049,2.45023 15.065315,10.481797 7.9520901 0 0 13.39863,-10.58827 15.065315,10.481797 7.9520901 0 0 -11.21927,-9.94251 z"/>
            <path id="ellipse4" style="fill:#000000;fill-opacity:0.2;fill-rule:evenodd;stroke:none;stroke-width:0.427343;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" d="m 328.56113,367.14977 a 15.223199,10.591646 7.9520886 0 0 -8.32556,9.99368 15.223199,10.591646 7.9520886 0 0 7.24172,8.54652 15.543486,10.814487 7.9520883 0 1 -6.91355,-8.46859 15.543486,10.814487 7.9520883 0 1 7.99739,-10.07161 z"/>
            <path style="fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:1.31467;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:20;stroke-dasharray:none;stroke-opacity:1" d="m 325.53607,392.42799 c -0.10533,-16.11218 1.77798,-28.28046 6.65927,-40.02049 8.12794,13.08946 13.5775,25.39268 18.01253,39.85856 -4.05617,-6.58521 -10.24621,-16.23798 -13.23249,-16.21657 -4.34266,0.0312 -8.5066,8.63278 -11.43931,16.3785 z" id="path2-8"/>
        </g>
        <path style="color:#000000;fill:#000000;-inkscape-stroke:none" d="m 111.18346,334.7213 -1.64648,0.72656 c 8.52247,19.31478 14.81621,41.81974 18.59779,64.55214 h 1.77539 c -3.79534,-22.81513 -10.11505,-45.76183 -18.7267,-65.2787 z" id="path4"/>
    </g>`,

    insignia: `<g>
        <ellipse style="fill:#fbb03b;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="path1" cx="347.10733" cy="343.72168" rx="44.106846" ry="31.885805"/>
        <path id="ellipse2" style="fill:#ffffff;fill-opacity:0.3;fill-rule:evenodd;stroke:none;stroke-width:2.35293;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" d="m 347.10296,314.01309 a 41.094023,29.707767 0 0 0 -41.09399,29.70776 41.094023,29.707767 0 0 0 34.99547,29.34767 41.094023,29.707767 0 0 1 -28.67825,-28.25834 41.094023,29.707767 0 0 1 41.09399,-29.70776 41.094023,29.707767 0 0 1 6.35953,0.36492 41.094023,29.707767 0 0 0 -12.67675,-1.45425 z"/>
        <path id="ellipse3" style="fill:#000000;fill-opacity:0.2;fill-rule:evenodd;stroke:none;stroke-width:2.35293;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" d="m 361.16688,315.8975 a 40.986636,29.630135 0 0 1 14.83244,22.81296 40.986636,29.630135 0 0 1 -40.98645,29.63042 40.986636,29.630135 0 0 1 -14.0174,-1.84635 40.986636,29.630135 0 0 0 26.10749,6.85675 40.986636,29.630135 0 0 0 40.98644,-29.63043 40.986636,29.630135 0 0 0 -26.92252,-27.82335 z"/>
        <path id="ellipse4" style="fill:#000000;fill-opacity:0.2;fill-rule:evenodd;stroke:none;stroke-width:2.35293;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" d="m 332.4977,315.75432 a 41.416177,29.940659 0 0 0 -26.81076,27.96653 41.416177,29.940659 0 0 0 16.54043,23.91677 42.287547,30.570591 0 0 1 -15.66921,-23.69867 42.287547,30.570591 0 0 1 25.93954,-28.18463 z"/>
        <path style="fill:#999999;fill-opacity:1;stroke:#000000;stroke-width:2;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:20;stroke-dasharray:none;stroke-opacity:1" d="m 313.66614,386.49104 c 5.92535,-44.21795 16.51692,-78.43667 34.44112,-110.65577 17.25759,35.92245 26.73815,70.5115 33.33011,110.21136 -8.59176,-18.07231 -21.12678,-45.38752 -29.3305,-45.32875 -11.92992,0.0855 -27.40476,24.51596 -38.44073,45.77316 z" id="path2"/>
    </g>`
}


export class TngUniformPack extends BaseTngEraUniformPack implements IUniformPack {

    getUniformSwatches() {
        return [
            new Swatch(BodyType.AverageMale, "Average Male", (token) => UniformCatalog.decorateSwatch(this.getNeck(BodyType.AverageMale, token.skinColor, undefined, UniformEra.NextGeneration) + TngUniforms.averageMale, BodyType.AverageMale, token), "BodyType.averageMale"),
            new Swatch(BodyType.AverageFemale, "Average Female", (token) => UniformCatalog.decorateSwatch(this.getNeck(BodyType.AverageFemale, token.skinColor, undefined, UniformEra.NextGeneration) + TngUniforms.averageFemale, BodyType.AverageFemale, token), "BodyType.averageFemale"),
        ];
    }

    getUniformVariantSwatches(token: Token) {
        return [];
    }

    getUniformAndVariantBody(token: Token) {
        if (token.bodyType === BodyType.AverageMale) {
            return this.getNeck(token.bodyType, token.skinColor, token.species, UniformEra.NextGeneration)
                + TngUniforms.averageMale.replace(DefaultRed, token.divisionColor).replace(SpeciesRestrictions.DEFAULT_SKIN_COLOR_REGEX, token.skinColor);
        } else {
            return this.getNeck(token.bodyType, token.skinColor, token.species, UniformEra.NextGeneration)
                + TngUniforms.averageFemale.replace(DefaultRed, token.divisionColor).replace(SpeciesRestrictions.DEFAULT_SKIN_COLOR_REGEX, token.skinColor);
        }
    }

    getRankIndicator(token: Token) {
        let result = super.getRankIndicator(token);
        result = `<g transform="translate(3, 5)">` + result + `</g>`;
        return result;
    }

    getBorderLogo(token: Token): string {
        return TngUniforms.insignia;
    }
}