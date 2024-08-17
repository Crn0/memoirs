import { RouterProvider, createMemoryRouter, defer } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";
import Posts from "../src/pages/Posts";
import SignUp from "../src/pages/Sign-up/index";
import mockData from "./mockData";
import localStorage from "../src/helpers/storage/localStorage";

const mockUser = mockData.USERS.users[1].user;

const mockPostsLoader = vi.fn(() => {
  const posts = new Promise((res, _) => {
    res(mockData.POSTS);
  });

  return defer({ data: posts });
});

const mockSignUpAction = vi.fn(async ({ request }) => {
  const formData = await request.formData();
  const submission = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  const errors = {
    messages: [
      {
        field: "email",
        message: "email already in use",
        type: "field",
      },
      {
        field: "username",
        message: "username already in use",
        type: "field",
      },
      {
        field: "password",
        message: "password does not match",
        type: "field",
      },
      {
        field: "password",
        message: "username must not contain special characters",
      },
    ],
  };

  if (submission.email === mockUser.email) {
    return {
      error: {
        messages: [errors.messages[0]],
      },
    };
  }

  if (submission.username === mockUser.username) {
    return {
      error: {
        messages: [errors.messages[1]],
      },
    };
  }

  if (submission.password !== submission.confirm_password) {
    return {
      error: {
        messages: [errors.messages[2]],
      },
    };
  }
  // https://regexr.com/83re3
  if (
    /^[{a-zA-Z}]{1,}\d{0,}[{a-zA-Z}]{0,}$/g.test(submission.username) === false
  ) {
    return {
      error: {
        messages: [errors.messages[3]],
      },
    };
  }

  delete submission.password;
  delete submission.confirm_password;

  return { user: submission, token: crypto.randomUUID() };
});

let setup = (router) => {
  return {
    user: userEvent.setup(),
    ...render(<RouterProvider router={router} />),
  };
};

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        loader: mockPostsLoader,
        element: <Posts />,
      },
      {
        path: "sign-up",
        action: mockSignUpAction,
        element: <SignUp />,
      },
    ],
  },
];

beforeEach(() => {
  mockPostsLoader.mockRestore();
  mockSignUpAction.mockRestore();
  localStorage.remove("token");
});

describe("Sign-up form page", () => {
  it("renders the sign-up form", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/", "/sign-up"],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(screen.getByLabelText("First name:")).toBeInTheDocument();
    expect(screen.getByLabelText("Last name:")).toBeInTheDocument();
    expect(screen.getByLabelText("Username:")).toBeInTheDocument();
    expect(screen.getByLabelText("Email:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm password:")).toBeInTheDocument();
  });

  it("button is disabled the email and password are empty", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/", "/sign-up"],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByLabelText("Email:").value).toBe("");
    expect(screen.getByLabelText("Password:").value).toBe("");
    expect(screen.getByRole("button", { name: "Sign Up" })).toHaveAttribute(
      "disabled",
    );
  });

  it("renders an error message if the email is already taken", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/", "/sign-up"],
      initialIndex: 1,
    });

    const { user } = setup(router);

    await user.type(screen.getByLabelText("First name:"), "Jane");
    await user.type(screen.getByLabelText("Last name:"), "Doe");
    await user.type(screen.getByLabelText("Username:"), "JD");
    await user.type(screen.getByLabelText("Email:"), `${mockUser.email}`);
    await user.type(screen.getByLabelText("Password:"), "1234");
    await user.type(screen.getByLabelText("Confirm password:"), "1234");
    await user.click(screen.getByRole("button", { name: "Sign Up" }));

    expect(screen.getByText(/email already in use/)).toBeInTheDocument();
  });

  it("renders an error message if the username is already taken", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/", "/sign-up"],
      initialIndex: 1,
    });

    const { user } = setup(router);

    await user.type(screen.getByLabelText("First name:"), "Jane");
    await user.type(screen.getByLabelText("Last name:"), "Doe");
    await user.type(screen.getByLabelText("Username:"), `${mockUser.username}`);
    await user.type(screen.getByLabelText("Email:"), "JD@gmail.com");
    await user.type(screen.getByLabelText("Password:"), "1234");
    await user.type(screen.getByLabelText("Confirm password:"), "1234");
    await user.click(screen.getByRole("button", { name: "Sign Up" }));

    expect(screen.getByText(/username already in use/)).toBeInTheDocument();
  });

  it("renders an error message if the username has special characters", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/", "/sign-up"],
      initialIndex: 1,
    });

    const { user } = setup(router);

    await user.type(screen.getByLabelText("First name:"), "Jane");
    await user.type(screen.getByLabelText("Last name:"), "Doe");
    await user.type(screen.getByLabelText("Username:"), "jane_doe");
    await user.type(screen.getByLabelText("Email:"), "JD@gmail.com");
    await user.type(screen.getByLabelText("Password:"), "1234");
    await user.type(screen.getByLabelText("Confirm password:"), "1234");
    await user.click(screen.getByRole("button", { name: "Sign Up" }));

    expect(
      screen.getByText(/username must not contain special characters/),
    ).toBeInTheDocument();
  });

  it("renders an error message if the password are not the same", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/", "/sign-up"],
      initialIndex: 1,
    });

    const { user } = setup(router);

    await user.type(screen.getByLabelText("First name:"), "Jane");
    await user.type(screen.getByLabelText("Last name:"), "Doe");
    await user.type(screen.getByLabelText("Username:"), "JD");
    await user.type(screen.getByLabelText("Email:"), "JD@gmail.com");
    await user.type(screen.getByLabelText("Password:"), "1234");
    await user.type(screen.getByLabelText("Confirm password:"), "12345");
    await user.click(screen.getByRole("button", { name: "Sign Up" }));

    expect(screen.getByText(/password does not match/)).toBeInTheDocument();
  });

  it("login the user on a successful registration", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/", "/sign-up"],
      initialIndex: 1,
    });

    const { user } = setup(router);

    await user.type(screen.getByLabelText("First name:"), "Jane");
    await user.type(screen.getByLabelText("Last name:"), "Doe");
    await user.type(screen.getByLabelText("Username:"), "Mochi");
    await user.type(screen.getByLabelText("Email:"), "JD@gmail.com");
    await user.type(screen.getByLabelText("Password:"), "1234");
    await user.type(screen.getByLabelText("Confirm password:"), "1234");
    await user.click(screen.getByRole("button", { name: "Sign Up" }));

    expect(screen.getByRole("link", { name: "Profile" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
  });
});
