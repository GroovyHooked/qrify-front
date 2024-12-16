// Fonction de redirection si l'utilisateur n'est pas connecté
export const redirectUserIfNotConnected = (user, router) => {
    user.token === '' ? router.push('/') : null
}

// export const BASE_URL = "https://3228-2a01-cb16-2038-69d8-80fe-8437-bd0d-9383.ngrok-free.app"
export const BASE_URL = "http://localhost:3000"
