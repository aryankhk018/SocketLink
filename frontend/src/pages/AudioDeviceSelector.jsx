import React, { useEffect, useState } from "react";

const AudioDeviceSelector = ({ peerConnection, localStream }) => {
  const [audioDevices, setAudioDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  // Fetch devices on mount
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const mics = devices.filter((device) => device.kind === "audioinput");
      setAudioDevices(mics);
      if (mics.length > 0) setSelectedDeviceId(mics[0].deviceId);
    });
  }, []);

  const switchAudioInput = async (deviceId) => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: { exact: deviceId } },
        video: false,
      });

      const newTrack = newStream.getAudioTracks()[0];
      const sender = peerConnection
        .getSenders()
        .find((s) => s.track && s.track.kind === "audio");

      if (sender) {
        await sender.replaceTrack(newTrack);
        console.log("✅ Replaced audio track in peer connection");
      }

      // Replace in local stream (for local preview or further use)
      const oldTrack = localStream.getAudioTracks()[0];
      if (oldTrack) {
        localStream.removeTrack(oldTrack);
        oldTrack.stop(); // Stop old mic
      }
      localStream.addTrack(newTrack);
    } catch (err) {
      console.error("❌ Error switching audio input:", err);
    }
  };

  return (
    <div>
      <label>Select Microphone: </label>
      <select
        value={selectedDeviceId}
        onChange={(e) => {
          const id = e.target.value;
          setSelectedDeviceId(id);
          switchAudioInput(id);
        }}
      >
        {audioDevices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Microphone ${device.deviceId}`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AudioDeviceSelector;
