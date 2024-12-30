import React from "react"; // Import React si nécessaire pour JSX
import { render, screen } from "@testing-library/react"; // Outils pour rendre le composant et tester le DOM
import "@testing-library/jest-dom"; // Fournit des matchers personnalisés comme toBeInTheDocument
import Signup from "./pages/signup"; // Import du composant Signup
import { useRouter } from "next/router"; // Import du hook useRouter pour gérer la navigation

// Mock du hook useRouter
jest.mock("next/router", () => ({
  useRouter: jest.fn(), // Remplace useRouter par une version simulée
}));

describe("Signup Component", () => {
  beforeEach(() => {
    // Avant chaque test, configure le mock pour le routeur
    useRouter.mockReturnValue({
      push: jest.fn(), // Simule la méthode push pour tester la navigation
    });
  });

  it("renders the Signup form correctly", () => {
    // Test pour vérifier que le formulaire d'inscription est rendu correctement
    render(<Signup />); // Rendu du composant Signup

    // Vérifications pour chaque champ principal du formulaire
    expect(screen.getByPlaceholderText("Nom")).toBeInTheDocument(); // Champ pour le nom
    expect(screen.getByPlaceholderText("Prénom")).toBeInTheDocument(); // Champ pour le prénom
    expect(screen.getByPlaceholderText("Adresse email")).toBeInTheDocument(); // Champ pour l'adresse email
    expect(screen.getByPlaceholderText("Entreprise")).toBeInTheDocument(); // Champ pour l'entreprise
    expect(screen.getByPlaceholderText("Mot de passe")).toBeInTheDocument(); // Champ pour le mot de passe

    // Vérifie la présence du bouton d'inscription
    expect(screen.getByText("Créer mon compte")).toBeInTheDocument(); // Texte du bouton

    // Vérifie la présence du texte de bas de page
    expect(screen.getByText("Déjà membre?")).toBeInTheDocument(); // Lien ou texte d'invitation pour les membres existants
  });
});
