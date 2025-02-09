import React, { useState, useEffect } from 'react';
import SidePanel from './SidePanel';
import { MarkerData } from './GlobeComponent';

interface LayoutProps {
    globe: React.ReactNode;
    panelOpen: boolean;
    selectedMarker: MarkerData | null;
    closePanel: () => void;
}

const Layout: React.FC<LayoutProps> = ({ globe, panelOpen, selectedMarker, closePanel }) => {
    const [showPanel, setShowPanel] = useState(panelOpen);

    useEffect(() => {
        if (panelOpen) {
            setShowPanel(true);
        } else {
            const timeout = setTimeout(() => setShowPanel(false), 1000);
            return () => clearTimeout(timeout);
        }
    }, [panelOpen]);

    return (
        <div
            style={{
                display: 'flex',
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
            }}
            onClick={closePanel}
        >
            <div
                style={{
                    width: panelOpen ? '50vw' : '100vw',
                    height: '100vh',
                    transition: 'width 1.0s ease-in-out',
                    background: '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {globe}
            </div>

            <div
                style={{
                    width: '50vw',
                    height: '100vh',
                    transform: panelOpen ? 'translateX(0)' : 'translateX(100%)',
                    transition: 'transform 1.0s ease-in-out',
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    visibility: showPanel ? 'visible' : 'hidden',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {showPanel && <SidePanel marker={selectedMarker} onClose={closePanel} />}
            </div>
        </div>
    );
};

export default Layout;
