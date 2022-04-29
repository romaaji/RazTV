import React from 'react'

import './Footer.css'

export default function Footer() {
    return (
        <footer class="footer">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="footer__content">
                            <div class="footer__links">
                                <a href="/privacy-policy">Privacy policy</a>
                                <a href="/termncondition">Terms and conditions</a>
                            </div>
                            <small class="footer__copyright">© 2022 RazTV - Film. All rights reserved.</small>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
