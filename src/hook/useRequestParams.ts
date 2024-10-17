export function useRequestParams(): URLSearchParams {
  const url = document.location.href;
  const params = new URLSearchParams(url);
  return params;
}
