import http from 'k6/http';
import { sleep } from 'k6';

const baseUrl = (__ENV.EBAC_BASE_URL || 'http://lojaebac.ebaconline.art.br').replace(/\/$/, '');
const loginPath = '/minha-conta/';
const defaultUsers = [
  { username: 'user1_ebac', password: 'psw!ebac@test' },
  { username: 'user2_ebac', password: 'psw!ebac@test' },
  { username: 'user3_ebac', password: 'psw!ebac@test' },
  { username: 'user4_ebac', password: 'psw!ebac@test' },
  { username: 'user5_ebac', password: 'psw!ebac@test' },
];

function parseUsers() {
  const rawUsers = __ENV.K6_TEST_USERS ?? JSON.stringify(defaultUsers);

  try {
    const parsedUsers = JSON.parse(rawUsers);
    if (!Array.isArray(parsedUsers) || parsedUsers.length === 0) {
      return defaultUsers;
    }
    return parsedUsers;
  } catch (error) {
    return defaultUsers;
  }
}

const users = parseUsers();

function stages() {
  return [
    { duration: '20s', target: 10 },
    { duration: '100s', target: 10 },
  ];
}

export const options = {
  scenarios: {
    login_valido: {
      executor: 'ramping-vus',
      exec: 'loginValido',
      startVUs: 0,
      stages: stages(),
      gracefulRampDown: '5s',
    },
    login_senha_invalida: {
      executor: 'ramping-vus',
      exec: 'loginSenhaInvalida',
      startVUs: 0,
      stages: stages(),
      gracefulRampDown: '5s',
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.90'],
    http_req_duration: ['p(95)<10000'],
  },
};

export function setup() {
  if (users.length < 5) {
    throw new Error(
      'K6_TEST_USERS must contain the five test accounts as a JSON array. Example:\n' +
        '$env:K6_TEST_USERS = \'[{"username":"user1_ebac","password":"senha1"},{"username":"user2_ebac","password":"senha2"},{"username":"user3_ebac","password":"senha3"},{"username":"user4_ebac","password":"senha4"},{"username":"user5_ebac","password":"senha5"}]\'\n' +
        'npm run test:performance'
    );
  }
  return { users };
}

export function loginValido(data) {
  login(data.users[(__VU - 1) % data.users.length], false);
}

export function loginSenhaInvalida(data) {
  login(data.users[(__VU - 1) % data.users.length], true);
}

function login(user, invalidPassword) {
  const formPage = http.get(`${baseUrl}${loginPath}`, {
    tags: { name: 'GET /minha-conta' },
  });

  const nonce = formPage.body.match(/name=["']woocommerce-login-nonce["'][^>]*value=["']([^"']+)/i)?.[1];
  const referer = formPage.body.match(/name=["']_wp_http_referer["'][^>]*value=["']([^"']*)/i)?.[1] || loginPath;

  const password = invalidPassword ? `${user.password}-invalid` : user.password;
  const response = http.post(
    `${baseUrl}${loginPath}`,
    {
      username: user.username,
      password,
      'woocommerce-login-nonce': nonce || '',
      '_wp_http_referer': referer,
      login: 'Log in',
    },
    {
      redirects: 0,
      tags: { name: invalidPassword ? 'POST login invalid' : 'POST login valid' },
    }
  );

  sleep(1);
}
