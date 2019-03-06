export function getErrorFromResponse (e) {
  if (e.response && e.response.data && e.response.data.errors) {
    return e.response.data.errors.map((er) => er.message)
  }
  if (e.response && e.response.data && e.response.data.message) {
    return [e.response.data.message]
  }
  return null
}
