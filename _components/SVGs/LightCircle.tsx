import React from 'react'

export default function LightCircle() {
    return (
        <svg className='w-full h-full' viewBox="0 0 53 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.4" filter="url(#filter0_f_238_1533)">
                <circle cx="-6" cy="26" r="26" fill="#FFECC8" />
            </g>
            <defs>
                <filter id="filter0_f_238_1533" x="-65" y="-33" width="118" height="118" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="16.5" result="effect1_foregroundBlur_238_1533" />
                </filter>
            </defs>
        </svg>

    )
}
