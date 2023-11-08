import React from 'react';
import './Timeline.css'; // Import your CSS file

const Timeline = () => {
  return (
    <div className="timeline">
      <div className="timelinecomponent">
        <div className="timelinedate timelinedate--right">Quarter One</div>
      </div>
      <div className="timelinemiddle">
        <div className="timelinepoint"></div>
      </div>
      <div className="timelinecomponent timelinecomponent--bg">
        <h2 className="timelinetitle">Development & Funding</h2>
      </div>
      <div className="timelinecomponent timelinecomponent--bg">
        <h2 className="timelinetitle">Enter Accelerator</h2>
      </div>
      <div className="timelinemiddle">
        <div className="timelinepoint"></div>
      </div>
      <div className="timelinecomponent">
        <div className="timelinedate">Quarter Two</div>
      </div>
      <div className="timelinecomponent">
        <div className="timelinedate timelinedate--right">Quarter Three</div>
      </div>
      <div className="timelinemiddle">
        <div className="timelinepoint"></div>
      </div>
      <div className="timelinecomponent timelinecomponent--bg">
        <h2 className="timelinetitle">Secure Additional Funding</h2>
      </div>
      <div className="timelinecomponent timelinecomponent--bottom timelinecomponent--bg">
        <h2 className="timelinetitle">Launch MVP</h2>
      </div>
      <div className="timelinemiddle">
        <div className="timelinepoint"></div>
        <div className="timelinepoint timelinepoint--bottom"></div>
      </div>
      <div className="timelinecomponent timelinecomponent--bottom">
        <div className="timelinedate">Quarter Four</div>
      </div>
    </div>
  );
}

export default Timeline;
