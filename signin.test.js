import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignIn from "./pages/index";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("SignIn Component", () => {
  const mockDispatch = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    process.env.NEXT_PUBLIC_BASE_URL = "http://localhost:3000"; // Mock de l'URL de base
    useRouter.mockReturnValue({
      query: {},
      push: mockPush,
    });
    useDispatch.mockReturnValue(mockDispatch);
  });

  it("renders the SignIn form correctly", () => {
    render(<SignIn />);

    expect(screen.getByPlaceholderText("test@gmail.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("*********")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /connexion/i })
    ).toBeInTheDocument();
  });

  it("handles user input correctly", () => {
    render(<SignIn />);

    const emailInput = screen.getByPlaceholderText("test@gmail.com");
    const passwordInput = screen.getByPlaceholderText("*********");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  it("calls handleSignIn and dispatches Redux action on successful login", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            result: true,
            email: "test@example.com",
            token: "fake-token",
            firstname: "John",
            lastname: "Doe",
            avatarPath: "/avatars/avatar1.svg",
          }),
      })
    );

    render(<SignIn />);

    const emailInput = screen.getByPlaceholderText("test@gmail.com");
    const passwordInput = screen.getByPlaceholderText("*********");
    const button = screen.getByRole("button", { name: /connexion/i });

    // Utilisez act pour gérer les mises à jour d'état
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.click(button);
    });

    // Vérifiez que fetch est appelé
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/auth/signin",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test@example.com",
          password: "password123",
        }),
      }
    );

    // Vérifiez que dispatch est appelé
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "user/addUserToStore",
      payload: {
        email: "test@example.com",
        token: "fake-token",
        firstname: "John",
        lastname: "Doe",
        avatar: "/avatars/avatar1.svg",
      },
    });

    // Vérifiez la redirection
    expect(mockPush).toHaveBeenCalledWith("/home");
  });
});
