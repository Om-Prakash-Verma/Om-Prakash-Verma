import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

/**
 * ResponsiveCamera
 * Automatically adapts Three.js camera FOV across Mobile, Tablet, and Desktop.
 * Prevents horizontal clipping on narrow mobile/tablet portrait viewports.
 */
export default function ResponsiveCamera() {
    const { camera, size } = useThree();

    useEffect(() => {
        if (!camera || !size.width || !size.height) return;

        const aspect = size.width / size.height;

        if (aspect < 1.0) {
            // Mobile & Tablet Portrait:
            // Calculate vertical FOV that preserves necessary horizontal field of view
            const targetHFOV = aspect < 0.6 ? 74 : 76; // Mobile phone vs Tablet portrait
            const radH = (targetHFOV * Math.PI) / 180;
            const vFovRad = 2 * Math.atan(Math.tan(radH / 2) / aspect);
            const vFovDeg = (vFovRad * 180) / Math.PI;

            camera.fov = Math.min(82, Math.max(60, vFovDeg));
        } else if (aspect < 1.4) {
            // Tablet Landscape / Square screens
            camera.fov = 64;
        } else {
            // Standard Desktop
            camera.fov = 60;
        }

        camera.updateProjectionMatrix();
    }, [camera, size.width, size.height]);

    return null;
}
