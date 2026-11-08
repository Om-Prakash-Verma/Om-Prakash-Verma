import { GALLERY_PROJECTS, AWARDS_DATA } from '../data/portfolioData';
import { CONTENT_DATA } from '../components/canvas/rooms/Studio/contentData';

/**
 * Portfolio Data Hooks — 100% Local & Fast
 * Direct offline access to portfolio data with 0ms network latency.
 */

export const isSanityConfigured = false;

export function loadSanityData() {
    return Promise.resolve({
        projects: GALLERY_PROJECTS,
        content: CONTENT_DATA,
        awards: AWARDS_DATA,
        loaded: true,
        loading: false,
    });
}

export function isSanityDataLoaded() {
    return true;
}

export function useGalleryProjects() {
    return GALLERY_PROJECTS;
}

export function useStudioContent() {
    return CONTENT_DATA;
}

export function useAwards() {
    return AWARDS_DATA;
}
