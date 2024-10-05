import React from 'react';

function VideoPlayer() {
  return (
    <div className="w-full relative border-2 border-gray-200 rounded-lg shadow-lg mx-auto mt-8">
      <video
        className="w-full h-auto"
        controls
        poster="/vitco_video.png"  // Thumbnail image before play
      >
        <source src="/sample-video.mp4" type="video/mp4" />  {/* Replace with actual video file */}
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoPlayer;
