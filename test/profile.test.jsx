import { RouterProvider, createMemoryRouter} from "react-router-dom";
import { describe, it, expect, vi, beforeEach} from "vitest";
import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";
import Profile from "../src/pages/Profile";
import mockData from "./mockData";

global.fetch = vi.fn();

const { users } = mockData.USERS;

const setup = (router) => {
    return {
      user: userEvent.setup(),
      ...render(<RouterProvider router={router} />),
    };
};

const routes = [
    {
      path: "/",
      loader: () => {
  
        return users[0];
      },
      element: <App />,
      children: [
        {
            path: 'users/:userId/:username?',
            element: <Profile />,
        },
      ],
    },
]

beforeEach(() => {
    vi.resetAllMocks()
})

describe("Profile component", () => {
    it('renders the user profile information', async () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ["/", `/users/${users[0].user._id}/${users[0].user.username}`],
            initialIndex: 1,
          });
      
        render(<RouterProvider router={router} />);

        expect(await screen.findByRole("button", { name: "Edit profile"})).toBeInTheDocument();
        expect(await screen.findByText("John Doe (jDoe)")).toBeInTheDocument();
        expect(await screen.findByText("jD@example.com")).toBeInTheDocument();
        expect(await screen.findByText("Joined on Jul 10 2024")).toBeInTheDocument();
    });

    it('renders the form when the edit button is clicked', async () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ["/", `/users/${users[0].user._id}/${users[0].user.username}`],
            initialIndex: 1,  
        });

        const { user } = setup(router);
        
        const button = await screen.findByRole("button", { name: "Edit profile"});

        await act(async () => {
            await user.click(button);
        });

        expect(screen.getByLabelText("First name:")).toBeInTheDocument();
        expect(screen.getByLabelText("Last name:")).toBeInTheDocument();
        expect(screen.getByLabelText("Username:")).toBeInTheDocument();
        expect(screen.getByLabelText("Email:")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Submit"})).toBeInTheDocument();
    });

    it('update the user information', async () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ["/", `/users/${users[0].user._id}/${users[0].user.username}`],
            initialIndex: 1,  
        });

        const { user } = setup(router);
        
        const button = await screen.findByRole("button", { name: "Edit profile"});

        await act(async () => {
            await user.click(button);
        });

        const firstName = screen.getByLabelText("First name:");
        const lastName = screen.getByLabelText("Last name:");
        const username = screen.getByLabelText("Username:");
        const email = screen.getByLabelText("Email:");


        await act(async () => {
            user.clear(username)
            await user.type(username, "JaneD")
        })

        fetch.mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve({
                token: crypto.randomUUID(),
                user: {
                    ...users[0].user,
                    firstName: firstName.value,
                    lastName: lastName.value,
                    username: username.value,
                    email: email.value,
                    updatedAt: Date.now(),
                }
            })
        }))

        act(() => {
            user.click(screen.getByRole("button", { name: "Submit"}))
        });

        await waitFor(() => {
            expect(screen.getByRole("button", { name: "Edit profile"})).toBeInTheDocument();
            expect(screen.queryByText("jDoe")).not.toBeInTheDocument();
            expect(screen.getByText("jD@example.com")).toBeInTheDocument();
            expect(screen.getByText("Joined on Jul 10 2024")).toBeInTheDocument();
        })
    });

});