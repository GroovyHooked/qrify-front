// Fonction de redirection si l'utilisateur n'est pas connecté
export const redirectUserIfNotConnected = (user, router) => {
    user.token === '' ? router.push('/') : null
}