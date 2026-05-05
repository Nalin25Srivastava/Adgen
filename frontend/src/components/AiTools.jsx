import React from 'react';
import '../styles/ai-tools.css';

export default function AiTools(){
    return (
        <section id="ai-tools" className="design">
            <div className="wrap center">
                <span className="row-label">AI Tools</span>
                <h2 className="row-title">AdVantage Gen AI</h2>
                <p>
                    Provides you with a suite of AI-powered tools designed to enhance your creative workflow. From generating stunning ads to creating captivating logos, our AI tools are here to help you bring your ideas to life with ease and efficiency.
                </p>
            </div>

            <div className="wrap nest">
                <div className="left">
                    <span className="row-cat">AI Tools</span>
                    <h2>Creative Ad Generator</h2>
                    <p>
                        It generates creative advertisements tailored to your needs with just a basic prompt. Whether you're looking for social media ads, banner ads, or promotional content, our AI tool crafts compelling ads that capture attention and drive engagement.
                    </p>
                    <a href="#!" className="button med ai-tools-btn" title="Creative Ad Generator">Open Creative Ad Generator</a>
                </div>
                <div className="right">
                    <div className="box-out">
                        <div id="creative-ad-generator" className="box-content">
                            <img src="shoes ad.png" loading="lazy" alt="Creative Ad Generator" />
                            <div className="ex-prompt-ad">
                                generate a profesional ad of marathon running shoes for instagram (Comic Book)
                                <a href="#!" title="Create Logo">Create</a>
                            </div>
                        </div>
                        <div className="box-glow"></div>
                    </div>
                </div>
            </div>

            <div className="wrap nest flip">
                <div className="left">
                    <span className="row-cat">AI Tools</span>
                    <h2>Logo Creator</h2>
                    <p>
                        With just a few keywords, our AI-powered Logo Creator designs unique and professional logos that represent your brand identity. Choose from various styles and customize colors, fonts, and icons to create a logo that stands out.
                    </p>
                    <a href="#!" className="button med rounded" title="Logo Creator">Open Logo Creator</a>
                </div>
                <div className="right">
                    <div className="box-out">
                        <div id="logo-creator" className="box-content">
                            <img src="Tech_StacX_2.png" loading="lazy" alt="Logo creator Exampleone" />
                            <img src="Tech_StacX_1.png" loading="lazy" alt="Logo creator Example two" />
                            <div className="ex-prompt">
                                Logo for a modern tech startup
                                <a href="#!" title="Create Logo">Create</a>
                            </div>
                        </div>
                        <div className="box-glow"></div>
                    </div>
                </div>
            </div>

            {/* Additional sections like 'Filters And Effects' can be added similarly */}
        </section>
    );
};

