const form = document.getElementById('profile-form');
const formTitle = document.getElementById('form-title');
const saveBtn = document.getElementById('save-btn');
const cancelEditBtn = document.getElementById('cancel-edit');
const messageEl = document.getElementById('message');
const cardsEl = document.getElementById('cards');
const resultsCountEl = document.getElementById('results-count');

const searchName = document.getElementById('search-name');
const searchSkills = document.getElementById('search-skills');
const searchBtn = document.getElementById('search-btn');
const clearBtn = document.getElementById('clear-btn');

let editingId = null;

const fields = ['fname', 'lname', 'email', 'ps', 'group', 'DETAILS', 'SKILLS'];

function profileFromForm() {
  return fields.reduce((acc, key) => {
    const value = document.getElementById(key).value.trim();
    acc[key] = value;
    return acc;
  }, {});
}

function clearForm() {
  form.reset();
  editingId = null;
  formTitle.textContent = 'Add Profile';
  saveBtn.textContent = 'Save Profile';
  cancelEditBtn.hidden = true;
}

function setMessage(text, type = 'ok') {
  messageEl.textContent = text;
  messageEl.className = type;
}

function parseSkills(skillText) {
  if (!skillText) {
    return [];
  }
  return skillText
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 8);
}

function maskPs(value) {
  if (!value) {
    return '-';
  }
  if (value.length <= 4) {
    return '*'.repeat(value.length);
  }
  return `${'*'.repeat(value.length - 4)}${value.slice(-4)}`;
}

function renderCards(profiles) {
  cardsEl.innerHTML = '';

  if (!profiles.length) {
    cardsEl.innerHTML = '<p>No profiles found.</p>';
    resultsCountEl.textContent = '0 results';
    return;
  }

  resultsCountEl.textContent = `${profiles.length} result${profiles.length === 1 ? '' : 's'}`;

  profiles.forEach((profile) => {
    const card = document.createElement('article');
    card.className = 'card';

    const skillChips = parseSkills(profile.SKILLS)
      .map((skill) => `<span class="chip">${skill}</span>`)
      .join('');

    card.innerHTML = `
      <h3>${profile.fname} ${profile.lname}</h3>
      <div class="meta">${profile.email}</div>
      <div class="meta">Group: ${profile.group}</div>
      <div class="meta">Password/Phone: ${maskPs(profile.ps)}</div>
      <div>${profile.DETAILS || ''}</div>
      <div class="chips">${skillChips}</div>
      <div class="card-actions">
        <button data-action="edit" data-id="${profile.id}">Edit</button>
        <button class="ghost" data-action="delete" data-id="${profile.id}">Delete</button>
      </div>
    `;

    cardsEl.appendChild(card);
  });
}

async function loadProfiles() {
  const response = await fetch('/api/profiles');
  if (!response.ok) {
    throw new Error('Failed to load profiles');
  }
  const data = await response.json();
  renderCards(data);
}

async function searchProfiles() {
  const params = new URLSearchParams();

  if (searchName.value.trim()) {
    params.set('name', searchName.value.trim());
  }
  if (searchSkills.value.trim()) {
    params.set('skills', searchSkills.value.trim());
  }

  const url = params.toString() ? `/api/profiles/search?${params}` : '/api/profiles';
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Search failed');
  }

  const data = await response.json();
  renderCards(data);
}

async function saveProfile(event) {
  event.preventDefault();
  const payload = profileFromForm();
  const isEdit = editingId !== null;

  const response = await fetch(isEdit ? `/api/profiles/${editingId}` : '/api/profiles', {
    method: isEdit ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(errText || 'Save failed');
  }

  setMessage(isEdit ? 'Profile updated successfully.' : 'Profile created successfully.', 'ok');
  clearForm();
  await searchProfiles();
}

async function deleteProfile(id) {
  const response = await fetch(`/api/profiles/${id}`, { method: 'DELETE' });
  if (!response.ok) {
    throw new Error('Delete failed');
  }
  setMessage('Profile deleted.', 'ok');
  await searchProfiles();
}

async function startEdit(id) {
  const response = await fetch(`/api/profiles/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch profile for edit');
  }

  const profile = await response.json();
  fields.forEach((key) => {
    document.getElementById(key).value = profile[key] || '';
  });

  editingId = id;
  formTitle.textContent = 'Edit Profile';
  saveBtn.textContent = 'Update Profile';
  cancelEditBtn.hidden = false;
  form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

form.addEventListener('submit', async (event) => {
  try {
    await saveProfile(event);
  } catch (error) {
    setMessage(error.message, 'error');
  }
});

searchBtn.addEventListener('click', async () => {
  try {
    await searchProfiles();
  } catch (error) {
    setMessage(error.message, 'error');
  }
});

clearBtn.addEventListener('click', async () => {
  searchName.value = '';
  searchSkills.value = '';
  try {
    await loadProfiles();
  } catch (error) {
    setMessage(error.message, 'error');
  }
});

cancelEditBtn.addEventListener('click', () => {
  clearForm();
  setMessage('Edit canceled.', 'ok');
});

cardsEl.addEventListener('click', async (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement)) {
    return;
  }

  const action = target.dataset.action;
  const id = Number(target.dataset.id);

  if (!id) {
    return;
  }

  try {
    if (action === 'delete') {
      await deleteProfile(id);
    }

    if (action === 'edit') {
      await startEdit(id);
    }
  } catch (error) {
    setMessage(error.message, 'error');
  }
});

window.addEventListener('DOMContentLoaded', async () => {
  try {
    await loadProfiles();
  } catch (error) {
    setMessage(error.message, 'error');
  }
});
