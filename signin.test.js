import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignIn from "./pages/index";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

// Mock des modules externes pour éviter des dépendances non contrôlées dans les tests
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("SignIn Component", () => {
  const mockDispatch = jest.fn(); // Mock pour surveiller les appels à useDispatch
  const mockPush = jest.fn(); // Mock pour surveiller les redirections via useRouter

  beforeEach(() => {
    // Initialisation des variables et mocks avant chaque test
    process.env.NEXT_PUBLIC_BASE_URL = "http://localhost:3000"; // URL de base simulée pour les appels d'API
    useRouter.mockReturnValue({
      query: {}, // Mock des paramètres de la route (vide dans ce cas)
      push: mockPush, // Remplace la méthode push pour tester la redirection
    });
    useDispatch.mockReturnValue(mockDispatch); // Retourne le mock pour surveiller les actions Redux
  });

  it("renders the SignIn form correctly", () => {
    // Test pour vérifier que le formulaire de connexion est rendu correctement
    render(<SignIn />); // Rendu du composant

    // Vérifie la présence des champs et du bouton dans le DOM
    expect(screen.getByPlaceholderText("test@gmail.com")).toBeInTheDocument(); // Champ email
    expect(screen.getByPlaceholderText("*********")).toBeInTheDocument(); // Champ mot de passe
    expect(
      screen.getByRole("button", { name: /connexion/i }) // Bouton connexion
    ).toBeInTheDocument();
  });

  it("handles user input correctly", () => {
    // Test pour vérifier la gestion des saisies utilisateur
    render(<SignIn />); // Rendu du composant

    // Sélection des champs email et mot de passe
    const emailInput = screen.getByPlaceholderText("test@gmail.com");
    const passwordInput = screen.getByPlaceholderText("*********");

    // Simulation de saisie utilisateur
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Vérifie que les valeurs des champs sont mises à jour correctement
    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  it("calls handleSignIn and dispatches Redux action on successful login", async () => {
    // Mock global.fetch pour simuler un appel API réussi
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            result: true, // Indique que la connexion a réussi
            email: "test@example.com",
            token: "fake-token",
            firstname: "John",
            lastname: "Doe",
            avatarPath: "/avatars/avatar1.svg",
          }),
      })
    );

    render(<SignIn />); // Rendu du composant

    // Sélection des champs et du bouton
    const emailInput = screen.getByPlaceholderText("test@gmail.com");
    const passwordInput = screen.getByPlaceholderText("*********");
    const button = screen.getByRole("button", { name: /connexion/i });

    // Simulation des saisies et du clic sur le bouton de connexion
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "test@example.com" } }); // Saisie email
      fireEvent.change(passwordInput, { target: { value: "password123" } }); // Saisie mot de passe
      fireEvent.click(button); // Clic sur le bouton de connexion
    });

    // Vérifie que fetch est appelé avec les bons arguments
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/auth/signin", // URL de l'API
      {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // En-têtes
        body: JSON.stringify({
          email: "test@example.com", // Email envoyé
          password: "password123", // Mot de passe envoyé
        }),
      }
    );

    // Vérifie que la bonne action Redux est dispatchée
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "user/addUserToStore", // Type d'action Redux
      payload: {
        email: "test@example.com", // Données utilisateur récupérées
        token: "fake-token",
        firstname: "John",
        lastname: "Doe",
        avatar: "/avatars/avatar1.svg",
      },
    });

    // Vérifie que l'utilisateur est redirigé vers la page d'accueil
    expect(mockPush).toHaveBeenCalledWith("/home");
  });
});
