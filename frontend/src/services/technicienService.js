import apiFetch from "./api";

export const getTechniciens = () => apiFetch("/techniciens");

export const createTechnicien = (data) => apiFetch("/techniciens", {
  method: "POST",
  body: JSON.stringify(data),
});

export const updateTechnicien = (id, data) => apiFetch(`/techniciens/${id}`, {
  method: "PUT",
  body: JSON.stringify(data),
});

export const deleteTechnicien = (id) => apiFetch(`/techniciens/${id}`, {
  method: "DELETE",
});