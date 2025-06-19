import './footer.css';

const Footer = () => {
    return (
        <div className='footer'>
            <div className="location">
                <img src='/icons/location-dot-solid.svg' id='icon' />
                <p>GameHunter Co.</p>
                <p>123 Main St.</p>
                <p>Austin, TX, 78613</p>
            </div>

            <div className="email">
                <img src='/icons/envelope-solid.svg' id='icon' />
                <p>gamehunter@gmail.com</p>
            </div>

            <div className="phone">
                <img src='/icons/phone-solid.svg' id='icon' />
                <p>(512) 294 - 8020</p>
            </div>

            <div className="socials">
                <div className="social-icons">
                    <a href='https://facebook.com' target='_blank'><img src='/icons/square-facebook-brands.svg' id='icon' /></a>
                    <a href='https://twitter.com' target='_blank'><img src='/icons/square-twitter-brands.svg' id='icon' /></a>
                    <a href='https://instagram.com' target='_blank'><img src='/icons/instagram-brands.svg' id='icon' /></a>
                </div>
                
                <p>Copywright 2025 GameHunter Co.</p>
            </div>
        </div>
    )
}

export default Footer
