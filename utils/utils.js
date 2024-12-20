// Fonction de redirection si l'utilisateur n'est pas connecté
export const redirectUserIfNotConnected = (user, router) => {
    user.token === '' ? router.push('/') : null
}

// export const BASE_URL = "https://26fa-213-41-104-198.ngrok-free.app"
export const BASE_URL = "http://localhost:3000"
// 