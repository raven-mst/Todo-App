export const api = import.meta.env.VITE_CLERK_API;

export const SIGNIN = async (userData = {}) => {
    try {
        const res = await fetch(`${api}/auth/local`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        });
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }
};
export const GET_USER_DATA = async (jwt) => {
    try {
        const res = await fetch(`${api}/users/me?populate=avatar`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        });
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }
};
export const GET_USER_TODOS = async ({ userId, jwt }) => {
    try {
        const res = await fetch(`${api}/todos?filters[author][$eq]=${userId}&sort=createdAt:desc`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }
};
export const ADD_TODO = async ({ newTodo, jwt }) => {
    try {
        const res = await fetch(`${api}/todos`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ data: newTodo })
        });
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }
};
export const UPDATE_TODO = async ({ documentId, updatedTodo, jwt }) => {
    try {
        const res = await fetch(`${api}/todos/${documentId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ data: updatedTodo })
        });
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }
};
export const DELETE_TODO = async ({ documentId, jwt }) => {
    try {
        await fetch(`${api}/todos/${documentId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json"
            }
        });
        return { message: 'Entry deleted successfully.' }
    } catch (err) {
        console.log(err);
    }
};