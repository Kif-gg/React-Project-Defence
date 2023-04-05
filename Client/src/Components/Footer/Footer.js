export default function Footer() {
    return (
        <div id="footer">
            <footer>
                <div className="contacts">
                    <h3>Contacts</h3>
                    <ul>
                        <li><a href="mailto:fake_email@fake.fake"><i className="fa-solid fa-envelope"></i> fake_email@fake.fake</a>
                        </li>
                        <li><a href="tel:+1112223334"><i className="fa-solid fa-phone"></i> +1112223334</a></li>
                        <li><a href="tel:+5556667778"><i className="fa-solid fa-phone"></i> +5556667778</a></li>
                        <li><a href="https://www.facebook.com/azhar.drehi/" target="blank" rel="noopener noreferrer"><i
                            className="fa-brands fa-square-facebook"></i> Facebook page</a></li>
                    </ul>
                </div>
                <div className="copyright">
                    <p>&copy; 2023 - &#91;Change name later&#93; all rights reserved</p>
                </div>
                <div className="developer-contacts">
                    <h3>Connect with the developer</h3>
                    <ul>
                        <li><a href="https://github.com/Kif-gg" target="blank" rel="noopener noreferrer"><i className="fa-brands fa-github"></i> GitHub</a>
                        </li>
                        <li><a href="mailto:f17.8oy@gmail.com" target="blank" rel="noopener noreferrer"><i className="fa-solid fa-envelope"></i> Email</a>
                        </li>
                        <li><a href="https://www.facebook.com/kifchoo" target="blank" rel="noopener noreferrer"><i
                            className="fa-brands fa-square-facebook"></i> Facebook</a></li>
                    </ul>
                </div>
            </footer>
        </div>
    );
};