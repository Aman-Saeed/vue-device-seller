import { createStore } from "vuex";

// Normalize incoming user payloads so `role` is easy to check across the app.
function normalizeUser(user) {
  if (!user) return user;
  const clone = JSON.parse(JSON.stringify(user));

  const normalizeVal = (val) => {
    if (!val) return null;
    if (typeof val === "string")
      return val.replace(/^ROLE_/i, "").toUpperCase();
    if (Array.isArray(val)) {
      return val
        .map((r) => {
          if (typeof r === "string")
            return r.replace(/^ROLE_/i, "").toUpperCase();
          if (typeof r === "object")
            return (r.name || r.role || "")
              .replace(/^ROLE_/i, "")
              .toUpperCase();
          return null;
        })
        .filter(Boolean);
    }
    if (typeof val === "object")
      return (val.name || val.role || "").replace(/^ROLE_/i, "").toUpperCase();
    return null;
  };

  if (clone.role) {
    clone.role = normalizeVal(clone.role);
  } else if (clone.roles) {
    const r = normalizeVal(clone.roles);
    clone.role = Array.isArray(r) && r.length === 1 ? r[0] : r;
  } else if (clone.authorities) {
    const r = normalizeVal(clone.authorities);
    clone.role = Array.isArray(r) && r.length === 1 ? r[0] : r;
  }

  // If we still don't have a role, try to decode the JWT token (if present)
  if (!clone.role && clone.token) {
    try {
      const parts = clone.token.split(".");
      if (parts.length === 3 && typeof atob === "function") {
        // base64url -> base64
        const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
        // Add padding if necessary
        const pad = payload.length % 4;
        const padded = pad ? payload + "=".repeat(4 - pad) : payload;
        const decoded = atob(padded);
        // atob returns binary string; convert to proper UTF-8
        const json = decodeURIComponent(
          decoded
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        const parsed = JSON.parse(json);
        const tokenRoles = parsed.roles || parsed.role || parsed.authorities;
        if (tokenRoles) {
          const r = normalizeVal(tokenRoles);
          clone.role = Array.isArray(r) && r.length === 1 ? r[0] : r;
          console.debug(
            "normalizeUser: extracted role from token:",
            clone.role
          );
        }
      }
    } catch (e) {
      console.debug("normalizeUser: failed to parse token", e);
    }
  }

  return clone;
}

export default createStore({
  state: {
    currentUser: normalizeUser(JSON.parse(localStorage.getItem("currentUser"))),
  },
  getters: {
    currentUser: (state) => state.currentUser,
  },
  mutations: {
    updateUserInMutation(state, user) {
      const normalized = normalizeUser(user);
      state.currentUser = normalized;
      localStorage.setItem("currentUser", JSON.stringify(normalized));
      console.debug("updateUserInMutation saved user:", normalized);
    },
    clearUserInMutation(state) {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
  },
  actions: {
    updateUser(state, user) {
      state.commit("updateUserInMutation", user);
    },
    clearUser(state) {
      state.commit("clearUserInMutation");
    },
  },
  modules: {},
});
