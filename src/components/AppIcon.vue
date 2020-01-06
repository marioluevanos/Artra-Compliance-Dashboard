<template>
    <svg class='app-icon' 
    :class='{ [type]: type, [size]: size
    }' :viewBox="viewBox">

        <!-- Nav Icons: Stroke: 24 x 24 -->
        <g v-if='type === "summary"'>
            <polyline points="3,6 12,10 21,6 "></polyline>
            <line x1="12" y1="10" x2="12" y2="22"></line>
            <polygon points="21,18 12,22 3,18 3,6 12,2 21,6 "></polygon>
        </g>
        <g v-if='type === "to-do"'>
            <polyline points="2 14 6 18 18 3"></polyline>
            <line x1="23" y1="8" x2="20" y2="8"></line>
            <line x1="23" y1="13" x2="16" y2="13"></line>
            <line x1="23" y1="18" x2="12" y2="18"></line>
        </g>
        <g v-if='type === "alerts"'>
            <path d="M19,11V8A7,7,0,0,0,5,8v3c0,3.3-3,4.1-3,6,0,1.7,3.9,3,10,3s10-1.3,10-3C22,15.1,19,14.3,19,11Z"></path>
            <path class='fill' d="M12,22c-1.011,0-1.961-.034-2.855-.1a2.992,2.992,0,0,0,5.71,0C13.961,21.966,13.011,22,12,22Z"></path>
        </g>
        <g v-if='type === "investigations"'>
            <rect x="2" y="5" width="16" height="18"></rect>
            <polyline t="10" points=" 5,1 22,1 22,21 "></polyline>
            <line x1="6" y1="10" x2="14" y2="10"></line>
            <line x1="6" y1="14" x2="14" y2="14"></line>
            <line x1="6" y1="18" x2="10" y2="18"></line>
        </g>
        
        <g v-if='type === "submission-history"'>
            <polyline points="12 6 12 12 18 12"></polyline>
            <path d="M1,12a11,11,0,1,1,3.45,8"></path>
            <polygon class='fill' points="3 24 0.6 17.2 7.8 17.6 3 24"></polygon>
        </g>
        <g v-if='type === "transactions"'>
            <path d="M3.5,1C2.119,1,1,2.119,1,3.5V5 h13V3.5C14,2.119,15.119,1,16.5,1H3.5z"></path>
            <path d="M16.5,1 C17.881,1,19,2.119,19,3.5V15"></path>
            <line x1="5" y1="5" x2="5" y2="15"></line>
            <rect x="1" y="15" width="22" height="8"></rect>
            <line x1="5" y1="19" x2="6" y2="19"></line>
            <line x1="10" y1="19" x2="19" y2="19"></line>
        </g>
        <g v-if='type === "admin"'>
            <line x1="4" y1="13" x2="20" y2="13"></line>
            <polyline points="4,9 2,4 12,1 22,4 20,9 "></polyline>
            <path d="M12,23L12,23 c-4.418,0-8-3.582-8-8V9h16v6C20,19.418,16.418,23,12,23z"></path>
        </g>
        <g v-if='type === "help"'>
            <line x1="19.778" y1="4.222" x2="15.536" y2="8.464"></line>
            <line x1="19.778" y1="19.778" x2="15.536" y2="15.536"></line>
            <line x1="4.222" y1="19.778" x2="8.464" y2="15.536"></line>
            <line x1="4.222" y1="4.222" x2="8.464" y2="8.464"></line>
            <ellipse transform="matrix(0.7071 -0.7071 0.7071 0.7071 -4.9706 12)" cx="12" cy="12" rx="11" ry="11"></ellipse>
            <ellipse transform="matrix(0.7071 -0.7071 0.7071 0.7071 -4.9706 12)" cx="12" cy="12" rx="5" ry="5"></ellipse>
        </g>
        <g v-if='type === "sign-off"'>
            <line x1="17" y1="12" x2="2" y2="12"></line>
            <polyline points=" 7,17 2,12 7,7 "></polyline>
            <polyline points="10,1 22,1 22,23 10,23 "></polyline>
        </g>

        <!-- Regular Icons: Fill: 24 x 24 -->
        <g v-if='type === "password-hide"' class='fill'>
            <path d="M20.565,7.678,19.131,9.111A19.25,19.25,0,0,1,21.783,12c-1.142,1.56-4.829,6-9.783,6a8.369,8.369,0,0,1-1.6-.162l-1.64,1.64A10.679,10.679,0,0,0,12,20c7.071,0,11.655-7.163,11.847-7.468a1,1,0,0,0,0-1.064A19.827,19.827,0,0,0,20.565,7.678Z"></path>
            <path d="M22.707,1.293a1,1,0,0,0-1.414,0L17.235,5.351A11.27,11.27,0,0,0,12,4C4.929,4,.345,11.163.153,11.468a1,1,0,0,0,0,1.064,19.933,19.933,0,0,0,4.859,5.042L2.293,20.293a1,1,0,1,0,1.414,1.414l19-19A1,1,0,0,0,22.707,1.293ZM2.217,12A16.7,16.7,0,0,1,8.083,6.931a4.9,4.9,0,0,0,.711,6.861L6.456,16.13A18.156,18.156,0,0,1,2.217,12Z"></path>
        </g>
        <g v-if='type === "password-see"' class='fill'>
            <path d="M23.847,11.468C23.655,11.163,19.071,4,12,4S.345,11.163.153,11.468a1,1,0,0,0,0,1.064C.345,12.837,4.929,20,12,20s11.655-7.163,11.847-7.468A1,1,0,0,0,23.847,11.468ZM12,18c-4.937,0-8.637-4.442-9.782-6A16.682,16.682,0,0,1,8.083,6.931,4.948,4.948,0,0,0,7,10a5,5,0,0,0,10,0,4.951,4.951,0,0,0-1.077-3.062A16.791,16.791,0,0,1,21.782,12C20.641,13.561,16.953,18,12,18Z"></path>
        </g>

        <!-- Regular Icons: Stroke: 16 x 16 -->
        <g v-if='type === "show-list"'>
            <line x1="0.5" y1="9.8" x2="5.5" y2="9.8"/>
            <line x1="0.5" y1="2.5" x2="9.1" y2="2.5"/>
            <line x1="0.5" y1="13.5" x2="5.8" y2="13.5"/>
            <line x1="0.5" y1="6.2" x2="8.2" y2="6.2"/>
            <path d="M15.5,11.2l-3.2,3.2l-3.2-3.2"/>
            <path d="M12.3,1.6v12.8"/>
        </g>
        <g v-if='type === "close"'>
            <circle cx="8.5" cy="8.5" r="7"></circle>
            <line x1="4.5" y1="8.5" x2="12.5" y2="8.5"></line>
        </g>
        <g v-if='type === "add-details"'>
            <line x1="0.5" y1="1.5" x2="15.5" y2="1.5"></line>
            <line x1="0.5" y1="5.5" x2="15.5" y2="5.5"></line>
            <line x1="0.5" y1="9.5" x2="6.5" y2="9.5"></line>
            <line x1="0.5" y1="13.5" x2="6.5" y2="13.5"></line>
            <line x1="12.5" y1="8.5" x2="12.5" y2="14.5"></line>
            <line x1="15.5" y1="11.5" x2="9.5" y2="11.5"></line>
        </g>
        <g v-if='type === "add"'>
            <line x1="0.5" y1="1.5" x2="15.5" y2="1.5"></line>
            <line x1="0.5" y1="5.5" x2="15.5" y2="5.5"></line>
            <line x1="0.5" y1="9.5" x2="6.5" y2="9.5"></line>
            <line x1="0.5" y1="13.5" x2="6.5" y2="13.5"></line>
            <line x1="12.5" y1="8.5" x2="12.5" y2="14.5"></line>
            <line x1="15.5" y1="11.5" x2="9.5" y2="11.5"></line>
        </g>
        <g v-if='type === "cancel"'>
            <circle cx="8.5" cy="8.5" r="7"></circle>
            <line x1="11.5" y1="5.5" x2="5.5" y2="11.5"></line>
            <line x1="5.5" y1="5.5" x2="11.5" y2="11.5"></line>
        </g>
        <g v-if='type === "save"'>
            <polygon points="0.5,0.5 11.5,0.5 15.5,4.5 15.5,15.5 0.5,15.5 "></polygon>
            <polyline points=" 9.5,2.5 9.5,5.5 3.5,5.5 3.5,2.5 "></polyline>
            <polyline points=" 12.5,13.5 12.5,9.5 3.5,9.5 3.5,13.5 "></polyline>
        </g>
        <g v-if='type === "next"'>
            <line x1="0.5" y1="8.5" x2="15.5" y2="8.5"></line>
            <polyline points="10.5,3.5 15.5,8.5 10.5,13.5 "></polyline>
        </g>
        <g v-if='type === "sort"' class='fill'>
            <polygon class='top' points="3.5,5.5 8,0.5 12.5,5.5 "/>
            <polygon class='bottom' points="3.5,10.5 8,15.5 12.5,10.5 "/>
        </g>
        <g v-if='type === "search"'>
            <circle cx="7.5" cy="7.5" r="6"></circle>
            <line x1="15.5" y1="15.5" x2="11.742" y2="11.742"></line>
        </g>
        <g v-if='type === "edit"'>
            <line x1="13" y1="7" x2="9" y2="3"></line>
            <polygon points="5.5 14.5 0.5 15.5 1.5 10.5 11.5 0.5 15.5 4.5 5.5 14.5" ></polygon>
        </g>
        <g v-if='type === "delete"'>
            <path d="M2.5,5.5v8a2,2,0,0,0,2,2h7a2,2,0,0,0,2-2v-8"></path>
            <line x1="1.5" y1="3.5" x2="14.5" y2="3.5"></line>
            <polyline points="5.5 3.5 5.5 0.5 10.5 0.5 10.5 3.5"></polyline>
            <line x1="5.5" y1="12.5" x2="10.5" y2="7.5"></line>
            <line x1="10.5" y1="12.5" x2="5.5" y2="7.5"></line>
        </g>
        <g v-if='type === "success"'>
            <polyline points="1,9 5,13 15,3 "></polyline>
        </g>
        <g v-if='type === "options"'>
            <circle cx="8" cy="8" r="1.5"></circle>
            <circle cx="14" cy="8" r="1.5"></circle>
            <circle cx="2" cy="8" r="1.5"></circle>
        </g>
    </svg>
</template>

<script>
export default {
    name: 'app-icon',
    props: {
        type: {
            type: String,
            default: 'box'
        },
        size: {
            type: String
        }
    },
    computed: {
        viewBox() {
            return this.size ? '0 0 16 16' : '0 0 24 24'
        }
    }
}
</script>

<style lang='scss'>

@import '../styles/vars';
@import '../styles/mixins';

.app-icon {
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2;
    width: vw(20);
    height: vw(20);
    stroke: $color-navy-dark;
    overflow: visible;
    transition: 
        stroke 0.15s ease-out,
        fill 0.15s ease-out;
    .fill {
        stroke: none;
        fill: $color-navy-dark;
    }

    &.small {
        width: vw(16);
        height: vw(16);
        stroke-width: 1;
    }
}

</style>
