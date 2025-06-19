import './hero.css';

const Hero = ({ formVisibility, setFormVisibility }) => {
    return (
        <div className='hero'>
            <img src='/images/hero.jpeg' />

            <div className="call-to-action">
                <svg viewBox='0 0 100 16'>
                    <text x='5' y='12' fill='rgb(8, 18, 37)'>GameHunter</text>
                </svg>

                <div className='hero-action'>
                    <h4>Find your next game</h4>
                    <button id='cta-button' onClick={() => setFormVisibility(!formVisibility)}>Create Event</button>
                </div>
            </div>
        </div>
    )
}

export default Hero
