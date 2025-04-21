// Guest constructor function
function Guest(name, room, duration) {
  this.name = name;
  this.room = room;
  this.duration = duration;
}

// Initial guest list
let guests = [
  new Guest("Alice Johnson", 101, 3),
  new Guest("Bob Smith", 102, 2),
];

// DOM Elements
const form = document.getElementById("checkInForm");
const guestList = document.getElementById("guestList");
const errorMsg = document.getElementById("errorMsg");

// Display all guests on page load
window.onload = () => {
  renderGuests();
};

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("guestName").value.trim();
  const room = parseInt(document.getElementById("roomNumber").value);
  const duration = parseInt(document.getElementById("stayDuration").value);

  if (!name || !room || !duration) {
    errorMsg.textContent = "Please fill in all fields.";
    return;
  }

  if (guests.some((g) => g.room === room)) {
    errorMsg.textContent = `Room ${room} is already taken. Choose another.`;
    return;
  }

  const newGuest = new Guest(name, room, duration);
  guests.push(newGuest);
  renderGuests();
  form.reset();
  errorMsg.textContent = "";
});

// Render guest list
function renderGuests() {
  guestList.innerHTML = "";

  guests.forEach((guest) => {
    const card = document.createElement("div");
    card.className = "col";
    card.innerHTML = `
    <div class="guest-card">
    <h5>${guest.name}</h5>
    <p><strong>Room:</strong> ${guest.room}</p>
    <p><strong>Stay Duration:</strong> ${guest.duration} night(s)</p>
    </div>
    `;
    guestList.appendChild(card);
  });
}
