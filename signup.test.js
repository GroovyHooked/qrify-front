import React from "react"; // Import React si nécessaire
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // Matchers personnalisés pour les tests
import Signup from "./pages/signup";
import { useRouter } from "next/router";

// Mock de useRouter
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Signup Component", () => {
  beforeEach(() => {
    // Simule le comportement du routeur
    useRouter.mockReturnValue({
      push: jest.fn(), // Mock de la fonction push
    });
  });

  it("renders the Signup form correctly", () => {
    render(<Signup />);

    // Vérifier la présence des champs principaux
    expect(screen.getByPlaceholderText("Nom")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Prénom")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Adresse email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Entreprise")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Mot de passe")).toBeInTheDocument();

    // Vérifier la présence du bouton
    expect(screen.getByText("Créer mon compte")).toBeInTheDocument();

    // Vérifier la présence du texte de bas de page
    expect(screen.getByText("Déjà membre?")).toBeInTheDocument();
  });
});
