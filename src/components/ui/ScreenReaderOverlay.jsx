import { useScene } from '../../context/SceneContext';
import { useGalleryProjects } from '../../hooks/useSanityData';
import '../../styles/components/ScreenReaderOverlay.scss';

/**
 * ScreenReaderOverlay — Accessibility Layer
 * 
 * Invisible HTML layer providing screen reader access to 3D canvas content.
 * Visually hidden via .sr-only but fully accessible to assistive tech.
 */
const ScreenReaderOverlay = () => {
    const { hasEntered, isInRoom, currentRoom, teleportTo, requestExit } = useScene();
    const projects = useGalleryProjects();

    return (
        <div className="sr-overlay" role="complementary" aria-label="Accessible navigation for 3D portfolio">
            {/* Skip to content link */}
            <a href="#sr-main-nav" className="sr-only sr-focusable">
                Skip to accessible navigation
            </a>

            {/* Main accessible navigation */}
            <nav id="sr-main-nav" className="sr-only" aria-label="Portfolio rooms">
                <h1>Om Prakash Verma — Creative Developer & Systems Engineer</h1>
                <h2>Portfolio Navigation</h2>

                {!hasEntered && (
                    <p>Welcome to Om Prakash Verma's interactive 3D portfolio. Click or press Enter on the doors to enter.</p>
                )}

                {hasEntered && !isInRoom && (
                    <>
                        <p>You are in the corridor. Choose a room to explore:</p>
                        <ul>
                            <li>
                                <button onClick={() => teleportTo('gallery')} type="button">
                                    The Gallery — 12 Engineering & AI Projects
                                </button>
                            </li>
                            <li>
                                <button onClick={() => teleportTo('about')} type="button">
                                    About — Story, philosophy, and skills
                                </button>
                            </li>
                            <li>
                                <button onClick={() => teleportTo('education')} type="button">
                                    Education — B.Tech CSE, ABES College & Core Systems
                                </button>
                            </li>
                            <li>
                                <button onClick={() => teleportTo('contact')} type="button">
                                    Contact — Get in touch via Email, GitHub & LinkedIn
                                </button>
                            </li>
                        </ul>
                    </>
                )}

                {hasEntered && isInRoom && (
                    <>
                        <p>
                            You are in the {currentRoom === 'about' ? 'About' :
                                currentRoom === 'gallery' ? 'Gallery' :
                                    currentRoom === 'education' ? 'Education' :
                                        currentRoom === 'contact' ? 'Contact' : currentRoom} room.
                        </p>
                        <button onClick={requestExit} type="button">
                            Go back to corridor
                        </button>

                        {/* Room specific content */}
                        {currentRoom === 'gallery' && (
                            <div aria-label="Gallery projects list">
                                <h3>Featured Projects</h3>
                                <ul>
                                    {projects && projects.map((p, i) => (
                                        <li key={i}>
                                            <h4>{p.title}</h4>
                                            <p>{p.description}</p>
                                            {p.url && <a href={p.url}>View project live</a>}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {currentRoom === 'about' && (
                            <div aria-label="About section">
                                <h3>About Om Prakash Verma</h3>
                                <p>Software Developer and Systems Engineer. An engineer by curiosity, a developer by passion, and a builder by nature.</p>
                            </div>
                        )}

                        {currentRoom === 'education' && (
                            <div aria-label="Education section">
                                <h3>Education & Academic Foundation</h3>
                                <p>B.Tech in Computer Science & Engineering (2024 - 2028), ABES Engineering College, AKTU, India.</p>
                                <p>Schooling from Shree Jain Vidyalaya, Kolkata (2012 - 2023) up to Class 12.</p>
                                <p>Focused on Data Structures, Algorithms, Operating Systems, Computer Networks, and Distributed Systems.</p>
                            </div>
                        )}

                        {currentRoom === 'contact' && (
                            <div aria-label="Contact options">
                                <h3>Contact Me</h3>
                                <p>Connect with Om Prakash Verma on LinkedIn, GitHub, or directly via email at omprakashverma.in@gmail.com.</p>
                            </div>
                        )}

                        {/* Quick navigation to other rooms */}
                        <h3>Quick Navigation</h3>
                        <ul>
                            {currentRoom !== 'gallery' && (
                                <li><button onClick={() => teleportTo('gallery')} type="button">Go to Gallery</button></li>
                            )}
                            {currentRoom !== 'about' && (
                                <li><button onClick={() => teleportTo('about')} type="button">Go to About</button></li>
                            )}
                            {currentRoom !== 'education' && (
                                <li><button onClick={() => teleportTo('education')} type="button">Go to Education</button></li>
                            )}
                            {currentRoom !== 'contact' && (
                                <li><button onClick={() => teleportTo('contact')} type="button">Go to Contact</button></li>
                            )}
                        </ul>
                    </>
                )}
            </nav>

            {/* Live region for state changes */}
            <div aria-live="polite" aria-atomic="true" className="sr-only">
                {isInRoom && `Entered ${currentRoom} room`}
            </div>
        </div>
    );
};

export default ScreenReaderOverlay;
