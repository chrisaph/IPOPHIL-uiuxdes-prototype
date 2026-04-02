function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* SEARCH WITH FILTERS */
const data = [
  {name: "Brand A", status: "Pending", type: "Word"},
  {name: "Logo X", status: "Approved", type: "Logo"}
];

function searchData() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const status = document.getElementById("statusFilter").value;
  const type = document.getElementById("typeFilter").value;

  const results = data.filter(item =>
    item.name.toLowerCase().includes(query) &&
    (!status || item.status === status) &&
    (!type || item.type === type)
  );

  const list = document.getElementById("results");
  list.innerHTML = "";

  results.forEach(r => {
    const li = document.createElement("li");
    li.textContent = `${r.name} - ${r.status} - ${r.type}`;
    list.appendChild(li);
  });
}

/* AUTOSAVE FORM */
const formInputs = ["name", "type", "desc"];

formInputs.forEach(id => {
  document.getElementById(id).addEventListener("input", () => {
    saveDraft();
  });
});

function saveDraft() {
  const draft = {
    name: name.value,
    type: type.value,
    desc: desc.value
  };

  localStorage.setItem("draft", JSON.stringify(draft));
  document.getElementById("autosaveStatus").textContent = "Auto-saved";
}

function loadDraft() {
  const draft = JSON.parse(localStorage.getItem("draft"));
  if (!draft) return;

  name.value = draft.name;
  type.value = draft.type;
  desc.value = draft.desc;

  showSection("form");
}

/* PAYMENT SYSTEM */
function payNow() {
  document.getElementById("paymentMessage").textContent = "Payment Successful!";
  localStorage.removeItem("payment");
}

function savePayment() {
  localStorage.setItem("payment", "pending");
  document.getElementById("paymentMessage").textContent = "Payment saved. Resume later.";
  document.getElementById("paymentStatus").textContent = "1 pending payment";
}

/* INIT */
window.onload = () => {
  if (localStorage.getItem("draft")) {
    document.getElementById("draftStatus").textContent = "1 draft available";
  }

  if (localStorage.getItem("payment")) {
    document.getElementById("paymentStatus").textContent = "1 pending payment";
  }
};