import React from 'react';

const BrandLoader = ({ message = "Loading..." }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '20px'
        }}>
            <style>{`
                @keyframes l9 {
                    0%   {box-shadow: 
                        0 -16px #080c96ff, calc(16px*0.707) calc(-16px*0.707) #ed6c02,0 0 #080c96ff, 0 0 #1E293B,
                        0 0 #ed6c02, 0 0 #1E293B,0 0 #080c96ff, 0 0 #ed6c02}
                    12.5%   {box-shadow: 
                        0 0 #1E293B, calc(16px*0.707) calc(-16px*0.707) #ed6c02,16px 0 #080c96ff, 0 0 #1E293B,
                        0 0 #ed6c02, 0 0 #1E293B,0 0 #080c96ff, 0 0 #ed6c02}
                    25%   {box-shadow: 
                        0 0 #1E293B, 0 0 #ed6c02,16px 0 #080c96ff, calc(16px*0.707) calc(16px*0.707) #ed6c02,
                        0 0 #1E293B, 0 0 #080c96ff,0 0 #ed6c02, 0 0 #1E293B}
                    37.5% {box-shadow: 
                        0 0 #080c96ff, 0 0 #1E293B,0 0 #ed6c02, calc(16px*0.707) calc(16px*0.707) #1E293B,
                        0 16px #080c96ff, 0 0 #ed6c02,0 0 #1E293B, 0 0 #080c96ff}
                    50%   {box-shadow: 
                        0 0 #ed6c02, 0 0 #080c96ff,0 0 #1E293B, 0 0 #ed6c02,
                        0 16px #080c96ff, calc(-16px*0.707) calc(16px*0.707) #1E293B,0 0 #ed6c02, 0 0 #080c96ff}
                    62.5% {box-shadow: 
                        0 0 #1E293B, 0 0 #080c96ff,0 0 #ed6c02, 0 0 #1E293B,
                        0 0 #080c96ff, calc(-16px*0.707) calc(16px*0.707) #ed6c02,-16px 0 #1E293B, 0 0 #080c96ff}
                    75%   {box-shadow: 
                        0 0 #080c96ff, 0 0 #ed6c02,0 0 #1E293B, 0 0 #080c96ff,
                        0 0 #ed6c02, 0 0 #1E293B,-16px 0 #080c96ff, calc(-16px*0.707) calc(-16px*0.707) #ed6c02}
                    87.5% {box-shadow: 
                        0 -16px #080c96ff, 0 0 #1E293B,0 0 #ed6c02, 0 0 #080c96ff,
                        0 0 #1E293B, 0 0 #ed6c02,0 0 #080c96ff, calc(-16px*0.707) calc(-16px*0.707) #1E293B}
                    100% {box-shadow: 
                        0 -16px #080c96ff, calc(16px*0.707) calc(-16px*0.707) #ed6c02,0 0 #080c96ff, 0 0 #1E293B,
                        0 0 #ed6c02, 0 0 #1E293B,0 0 #080c96ff, 0 0 #ed6c02}
                }
            `}</style>

            {/* Loader */}
            <div style={{
                width: '28px',
                aspectRatio: '1',
                borderRadius: '50%',
                background: '#ed6c02',
                animation: 'l9 2s infinite'
            }} />

            {/* Loading text */}
            <div style={{
                marginTop: '20px',
                color: '#080c96ff',
                fontSize: '14px',
                fontWeight: '400',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                letterSpacing: '0.3px'
            }}>
                {message}
            </div>
        </div>
    );
};

export default BrandLoader;