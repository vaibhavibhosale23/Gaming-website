function claimReward() {
  const fill = document.getElementById('progressFill');
  let currentWidth = parseInt(fill.style.width);
  const increase = 10;
  if (currentWidth < 100) {
    let newWidth = Math.min(currentWidth + increase, 100);
    fill.style.width = newWidth + '%';
    alert('Reward Claimed! 🎉');
  } else {
    alert('You already reached max level!');
  }
}
function login() {
  alert("✅ Logged in successfully!");
}
function sent() {
  alert("✅ Feedback sent successfully!");
}