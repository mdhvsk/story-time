import React from 'react';
import './Footer.scss'; // Make sure to create a corresponding CSS file
import { AutoStories } from '@mui/icons-material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Logo and Brand name, replace with your image and name */}
                <div className="brand">
                    {/* <img src="logo.svg" alt="Nereus Logo" className="brand-logo" /> */}
                    <AutoStories className='brand-logo'/>
                    <span className="brand-name">Bookmakers.AI</span>
                </div>

                

                {/* Social Media Links */}
                <div className="social-media">
            
                    <a href="https://instagram.com" className="social-link"><GitHubIcon sx={{color: 'white'}}/></a>
                    <a href="https://linkedin.com" className="social-link"><LinkedInIcon  sx={{color: 'white'}}/></a>
                </div>

                {/* Copyright Statement */}
                <div className="copyright">
                    © 2024 Bookmakers.AI. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;