export function isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
}

export function logout() {
  localStorage.removeItem('token');
  // También puedes limpiar otros datos
}