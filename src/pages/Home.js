import { Link } from 'react-router-dom';
import '../App.css';

function Home() {
    return (
        <div className="landing-page">
            {/* Navigation */}
            <nav className="landing-navbar">
                <Link to="/" className="landing-logo">
                    <span className="logo-icon">W</span>
                    <span>WellTrack</span>
                </Link>

                <div className="landing-nav-links">
                    <a href="#features">Features</a>
                    <a href="#about">About</a>
                    <Link to="/login" className="landing-login">
                        Login
                    </Link>
                    <Link to="/signup" className="landing-signup">
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="landing-hero">
                <div className="hero-content">
                    <span className="hero-badge">
                        YOUR JOURNEY. YOUR PROGRESS.
                    </span>

                    <h1>
                        Small steps.
                        <br />
                        <span>Stronger you.</span>
                    </h1>

                    <p>
                        Build healthier habits, track your weight, and
                        celebrate every step of your journey. Your progress
                        starts with a single entry.
                    </p>

                    <div className="hero-actions">
                        <Link to="/signup" className="hero-primary-button">
                            Start Your Journey <span>→</span>
                        </Link>

                        <Link to="/login" className="hero-secondary-button">
                            I already have an account
                        </Link>
                    </div>

                    <div className="hero-trust">
                        <div className="trust-icon">✓</div>
                        <span>Simple tracking. Meaningful progress.</span>
                    </div>
                </div>

                {/* Decorative Weight Tracking Illustration */}
                <div className="hero-visual">
                    <div className="visual-circle circle-one"></div>
                    <div className="visual-circle circle-two"></div>

                    <div className="visual-label">
                        <span className="visual-label-dot"></span>
                        YOUR WELLNESS JOURNEY
                    </div>

                    <div className="hero-stat-card">
                        <div className="stat-card-top">
                            <div>
                                <p className="stat-eyebrow">WEIGHT TRACKER</p>
                                <h3>Your progress</h3>
                            </div>
                            <div className="stat-icon">↗</div>
                        </div>

                        <div className="illustration-chart">
                            <div className="chart-bar bar-one"></div>
                            <div className="chart-bar bar-two"></div>
                            <div className="chart-bar bar-three"></div>
                            <div className="chart-bar bar-four"></div>
                            <div className="chart-bar bar-five"></div>
                            <div className="chart-bar bar-six"></div>
                            <div className="chart-bar bar-seven"></div>
                        </div>

                        <div className="chart-caption">
                            <span>Track every day</span>
                            <span className="chart-caption-badge">
                                Stay consistent
                            </span>
                        </div>
                    </div>

                    <div className="floating-note note-top">
                        <span className="note-icon">✦</span>
                        <div>
                            <strong>Every step counts</strong>
                            <small>Keep moving forward</small>
                        </div>
                    </div>

                    <div className="floating-note note-bottom">
                        <div className="note-check">✓</div>
                        <div>
                            <strong>Daily check-in</strong>
                            <small>One day at a time</small>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="landing-features" id="features">
                <div className="section-heading">
                    <span className="section-eyebrow">MADE FOR YOUR JOURNEY</span>

                    <h2>
                        Your goals. Your pace.
                        <br />
                        <span>Your progress.</span>
                    </h2>

                    <p>
                        Everything you need to stay aware of your progress
                        and build a consistent tracking habit.
                    </p>
                </div>

                <div className="feature-grid">
                    <article className="feature-card">
                        <div className="feature-icon green-icon">⌁</div>
                        <span className="feature-number">01</span>

                        <h3>Track Your Weight</h3>

                        <p>
                            Record your daily weight in seconds and keep
                            your entries organized by date.
                        </p>

                        <Link to="/signup" className="feature-link">
                            Get started <span>→</span>
                        </Link>
                    </article>

                    <article className="feature-card">
                        <div className="feature-icon blue-icon">◷</div>
                        <span className="feature-number">02</span>

                        <h3>Review Your History</h3>

                        <p>
                            Explore previous entries, update records, and
                            understand how your measurements change over time.
                        </p>

                        <Link to="/signup" className="feature-link">
                            Explore tracking <span>→</span>
                        </Link>
                    </article>

                    <article className="feature-card">
                        <div className="feature-icon orange-icon">↗</div>
                        <span className="feature-number">03</span>

                        <h3>Measure Your Progress</h3>

                        <p>
                            Compare measurements from different dates to
                            understand your weight change.
                        </p>

                        <Link to="/signup" className="feature-link">
                            See your progress <span>→</span>
                        </Link>
                    </article>
                </div>
            </section>

            {/* About Section */}
            <section className="landing-about" id="about">
                <div className="about-decoration">
                    <div className="about-big-circle">
                        <div className="about-inner-circle">
                            <span>01</span>
                            <small>DAY AT A TIME</small>
                        </div>
                    </div>
                </div>

                <div className="about-content">
                    <span className="section-eyebrow">A HEALTHIER HABIT</span>

                    <h2>
                        Progress isn't
                        <br />
                        about perfection.
                    </h2>

                    <p>
                        Your wellness journey doesn't have to be complicated.
                        Start by understanding your current habits, recording
                        your progress, and taking one manageable step at a time.
                    </p>

                    <div className="about-points">
                        <div>
                            <span className="about-check">✓</span>
                            <span>Build a consistent tracking habit</span>
                        </div>

                        <div>
                            <span className="about-check">✓</span>
                            <span>Keep your records organized</span>
                        </div>

                        <div>
                            <span className="about-check">✓</span>
                            <span>Focus on long-term progress</span>
                        </div>
                    </div>

                    <Link to="/signup" className="hero-primary-button">
                        Begin Today <span>→</span>
                    </Link>
                </div>
            </section>

            {/* Final Call To Action */}
            <section className="landing-cta">
                <div className="cta-decoration cta-decoration-one"></div>
                <div className="cta-decoration cta-decoration-two"></div>

                <div className="cta-content">
                    <span className="cta-eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>

                    <h2>
                        Make today count.
                        <br />
                        Start tracking your progress.
                    </h2>

                    <p>
                        Create your account and take the first step towards
                        building a healthier routine.
                    </p>

                    <Link to="/signup" className="cta-button">
                        Create Your Free Account <span>→</span>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <Link to="/" className="landing-logo footer-logo">
                    <span className="logo-icon">W</span>
                    <span>WellTrack</span>
                </Link>

                <p>
                    Small steps, consistent habits, meaningful progress.
                </p>

                <div className="footer-links">
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign Up</Link>
                </div>

                <div className="footer-bottom">
                    © {new Date().getFullYear()} WellTrack. Your journey,
                    your progress.
                </div>
            </footer>
        </div>
    );
}

export default Home;