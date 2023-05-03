import React from 'react';

const SampleCard = () => {
    return (
        <div>
           <div className="projcard projcard-blue">
    <div className="projcard-innerbox">
      <img className="projcard-img" src="https://picsum.photos/800/600?image=1041" />
      <div className="projcard-textbox">
        <div className="projcard-title">Card Title</div>
        <div className="projcard-subtitle">This explains the card in more detail</div>
        <div className="projcard-bar"></div>
        <div className="projcard-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
        <div className="projcard-tagbox">
          <span className="projcard-tag">HTML</span>
          <span className="projcard-tag">CSS</span>
        </div>
      </div>
    </div>
  </div>
  
  <div className="projcard projcard-red">
    <div className="projcard-innerbox">
      <img className="projcard-img" src="https://picsum.photos/800/600?image=1080" />
      <div className="projcard-textbox">
        <div className="projcard-title">That's Another Card</div>
        <div className="projcard-subtitle">I don't really think that I need to explain anything here</div>
        <div className="projcard-bar"></div>
        <div className="projcard-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
        <div className="projcard-tagbox">
          <span className="projcard-tag">PHP</span>
          <span className="projcard-tag">SQL</span>
          <span className="projcard-tag">Database</span>
        </div>
      </div>
    </div>  
            </div>
        </div>
    );
}

export default SampleCard;
