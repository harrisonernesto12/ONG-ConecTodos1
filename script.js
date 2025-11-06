// Simulação de usuários
const USERS = [
  { username: 'admin', password: 'admin123', role: 'administrador', nome: 'Administrador Principal' },
  { username: 'visitante', password: 'visit123', role: 'visitante', nome: 'Visitante' },
  { username: 'voluntario', password: 'vol123', role: 'voluntario', nome: 'Voluntário' }
];

function getCurrentUser() {
  try { return JSON.parse(localStorage.getItem('currentUser')); } catch (e) { return null; }
}
function setCurrentUser(user) { localStorage.setItem('currentUser', JSON.stringify(user)); }
function clearCurrentUser() { localStorage.removeItem('currentUser'); }

function openLoginModal() {
  const m = document.getElementById('loginModal');
  if (m) m.style.display = 'flex';
}
function closeLoginModal() {
  const m = document.getElementById('loginModal');
  if (m) m.style.display = 'none';
  const err = document.getElementById('loginError');
  if (err) err.textContent = '';
  const form = document.getElementById('loginForm');
  if (form) form.reset();
}

function authenticate(username, password) {
  return USERS.find(u => u.username === username && u.password === password) || null;
}

function checkPermission(requiredRoles) {
  // requiredRoles: string like "administrador" or "administrador,voluntario"
  const user = getCurrentUser();
  if (!requiredRoles) return true; // sem data-role = visível para todos
  const allowed = requiredRoles.split(',').map(r => r.trim()).filter(Boolean);
  if (!allowed.length) return true;
  if (!user) return false;
  return allowed.includes(user.role);
}

function updateUI() {
  const user = getCurrentUser();
  const loginLink = document.getElementById('loginLink');
  const logoutBtn = document.getElementById('logoutBtn');
  const userLabel = document.getElementById('userLabel');

  if (user) {
    if (loginLink) loginLink.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'inline-block';
    if (userLabel) userLabel.textContent = `${user.nome || user.username} (${user.role})`;
  } else {
    if (loginLink) loginLink.style.display = 'inline-block';
    if (logoutBtn) logoutBtn.style.display = 'none';
    if (userLabel) userLabel.textContent = '';
  }

  // mostrar/ocultar elementos com data-role
  document.querySelectorAll('[data-role]').forEach(el => {
    const req = el.getAttribute('data-role');
    el.style.display = checkPermission(req) ? '' : 'none';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // inicializa UI
  updateUI();

  const loginLink = document.getElementById('loginLink');
  if (loginLink) loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    openLoginModal();
  });

  const closeLogin = document.getElementById('closeLogin');
  if (closeLogin) closeLogin.addEventListener('click', closeLoginModal);

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = (document.getElementById('username') || {}).value || '';
      const password = (document.getElementById('password') || {}).value || '';
      const user = authenticate(username.trim(), password);
      if (!user) {
        const err = document.getElementById('loginError');
        if (err) err.textContent = 'Usuário ou senha inválidos.';
        return;
      }
      // salva usuário completo
      setCurrentUser({ username: user.username, role: user.role, nome: user.nome });
      closeLoginModal();
      updateUI();
    });
  }

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', () => {
    clearCurrentUser();
    updateUI();
  });
});


/*function checkPermission(requiredRole) {
    const user = getCurrentUser();
    if (!user) return false;
    
    switch (requiredRole) {
        case 'administrador':
            return user.role === 'administrador';
        case 'voluntario':
            return ['administrador', 'voluntario'].includes(user.role);
        case 'visitante':
            return ['administrador', 'voluntario', 'visitante'].includes(user.role);
        default:
            return false;
    }
}*/

document.addEventListener('DOMContentLoaded', () => {
    const cpfInput = document.querySelector('#icpf');
    
    if (cpfInput) {
        cpfInput.addEventListener('input', (e) => {
            let value = e.target.value;
            
            // Remove tudo que não é número
            value = value.replace(/\D/g, '');
            
            // Adiciona pontos e hífen
            if (value.length >= 3) {
                value = value.replace(/^(\d{3})(\d)/, '$1.$2');
            }
            if (value.length >= 6) {
                value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
            }
            if (value.length >= 9) {
                value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
            }
            
            // Limita o tamanho
            if (value.length > 14) {
                value = value.substr(0, 14);
            }
            
            // Atualiza o valor do input
            e.target.value = value;
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const telInput = document.querySelector('#itelefone');

    if (telInput) {
        telInput.addEventListener('input', (e) => {
            let value = e.target.value;

            // Remove tudo que não é número
            value = value.replace(/\D/g, '');

            // Limita a 11 dígitos (ex: 11987654321)
            value = value.slice(0, 11);

            // Adiciona a máscara (DDD) 99999-9999 ou (DDD) 9999-9999
            if (value.length > 10) {
                value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
            } else if (value.length > 6) {
                value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
            } else if (value.length > 2) {
                value = value.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
            } else {
                value = value.replace(/^(\d*)$/, '($1');
            }

            // Atualiza o campo
            e.target.value = value;
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
  const cardsContainer = document.querySelector('#cardsContainer');
  const tituloInput = document.querySelector('#titulo');
  const imagemInput = document.querySelector('#imagem');
  const addBtn = document.querySelector('#addBtn');

  addBtn.addEventListener('click', () => {
    const titulo = tituloInput.value.trim();
    const imagem = imagemInput.value.trim();

    if (!titulo || !imagem) {
      alert('Preencha o título e a imagem!');
      return;
    }

    // Cria o card
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <img src="${imagem}" alt="">
      <div>
        <h2>${titulo}</h2>
        <button>Saiba Mais</button>
      </div>
    `;

    // Adiciona o novo card na tela
    cardsContainer.appendChild(card);

    // Limpa os campos
    tituloInput.value = '';
    imagemInput.value = '';
  });
});