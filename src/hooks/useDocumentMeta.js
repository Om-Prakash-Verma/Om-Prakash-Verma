import { useEffect, useRef } from 'react';
import { useScene } from '../context/SceneContext';
import { GLOBAL_INFO } from '../data/portfolioData';

/**
 * useDocumentMeta — Dynamic Meta Tags & Virtual Routing (History API)
 */

const ROOM_META = {
    null: {
        path: '/',
        title: `${GLOBAL_INFO.name} — Creative 3D Portfolio`,
        description: GLOBAL_INFO.siteDescription,
    },
    about: {
        path: '/about',
        title: `About Me — ${GLOBAL_INFO.name}`,
        description: GLOBAL_INFO.aboutMe,
    },
    education: {
        path: '/education',
        title: `Education & Systems — ${GLOBAL_INFO.name}`,
        description: `Academic background and engineering foundations of ${GLOBAL_INFO.name} — B.Tech Computer Science & Engineering, ABES Engineering College.`,
    },
    gallery: {
        path: '/gallery',
        title: `Gallery & Projects — ${GLOBAL_INFO.name}`,
        description: 'Browse the interactive 3D gallery of software engineering, AI reasoning, and systems projects.',
    },
    contact: {
        path: '/contact',
        title: `Contact — ${GLOBAL_INFO.name}`,
        description: `Get in touch with ${GLOBAL_INFO.name}. Find social links, GitHub repositories, and contact information.`,
    },
};

// Map URL paths back to room IDs for deep linking
const PATH_TO_ROOM = {
    '/': null,
    '/about': 'about',
    '/education': 'education',
    '/gallery': 'gallery',
    '/contact': 'contact',
};

/**
 * Returns the room ID that the initial URL points to (for deep linking).
 */
export function getInitialRoomFromUrl() {
    const path = window.location.pathname.replace(/\/+$/, '') || '/';
    return PATH_TO_ROOM[path] !== undefined ? PATH_TO_ROOM[path] : null;
}

export function useDocumentMeta() {
    const { currentRoom, teleportTo, hasEntered } = useScene();
    const isHandlingPopState = useRef(false);
    const lastPushedRoom = useRef(undefined);

    useEffect(() => {
        const roomKey = currentRoom === null ? 'null' : currentRoom;
        const meta = ROOM_META[roomKey] || ROOM_META['null'];

        document.title = meta.title;

        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = meta.description;

        const updateOgMeta = (property, content) => {
            let tag = document.querySelector(`meta[property="${property}"]`);
            if (!tag) {
                tag = document.createElement('meta');
                tag.setAttribute('property', property);
                document.head.appendChild(tag);
            }
            tag.content = content;
        };
        updateOgMeta('og:title', meta.title);
        updateOgMeta('og:description', meta.description);

        if (!isHandlingPopState.current && hasEntered) {
            if (lastPushedRoom.current !== currentRoom) {
                const targetPath = meta.path;
                if (window.location.pathname !== targetPath) {
                    window.history.pushState({ room: currentRoom }, '', targetPath);
                    lastPushedRoom.current = currentRoom;
                }
            }
        }
        isHandlingPopState.current = false;
    }, [currentRoom, hasEntered]);

    useEffect(() => {
        const handlePopState = (event) => {
            isHandlingPopState.current = true;
            const targetRoom = event.state?.room !== undefined ? event.state.room : null;
            lastPushedRoom.current = targetRoom;
            teleportTo(targetRoom);
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [teleportTo]);
}
