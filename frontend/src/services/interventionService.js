import apiFetch from "./api";

export const getInterventions = () => apiFetch("/interventions");

export const createIntervention = (data) => apiFetch("/interventions", {
  method: "POST",
  body: JSON.stringify(data),
});

export const updateIntervention = (id, data) => apiFetch(`/interventions/${id}`, {
  method: "PUT",
  body: JSON.stringify(data),
});

export const deleteIntervention = (id) => apiFetch(`/interventions/${id}`, {
  method: "DELETE",
});