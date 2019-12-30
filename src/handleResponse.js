function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
  localStorage.removeItem("role");
}

export function handleResponse(response) {
  return response.json().then(json => {
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        console.log(
          json.message === "Expired JWT Token"
            ? "Sesiunea a expirat"
            : "User sau Parola gresite"
        );
        localStorage.setItem("error", json.message);
        logout();
        window.location.reload(true);
      }

      const error = (json && json.message) || response.statusText;
      return Promise.reject(error);
    }

    return json;
  });
}
