const localView = document.getElementById("localView");
const remoteView = document.getElementById("remoteView");
const shareInput = document.getElementById("shareInput");
const shareScreenButton = document.getElementById("shareScreen");
const stopShareScreenButton = document.getElementById("stopShareScreen");

let localStream;

async function localCameraView() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });
    localView.srcObject = stream;
    localStream = stream;
    return stream;
  } catch (e) {
    console.log(e);
  }
}

async function shareScreen() {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia();
    localView.srcObject = stream;
    localStream = stream;
    stream.getVideoTracks()[0].onended = function() {
      stopShareScreen();
    };
    stopShareScreenButton.style.display = "inline";
    shareScreenButton.style.display = "none";
  } catch (e) {
    console.log(e);
  }
}

async function stopShareScreen() {
  try {
    stopShareScreenButton.style.display = "none";
    shareScreenButton.style.display = "inline";
    localStream.getTracks().forEach(track => track.stop());
    localCameraView();
  } catch (e) {
    console.log(e);
  }
}

localView.addEventListener("dblclick", openFullscreen);
remoteView.addEventListener("dblclick", openFullscreen);
localCameraView();
shareInput.value = window.location.href;