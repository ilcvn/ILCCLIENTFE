import instance from '../api'

export const getViewinYear = (year) => {
  return instance.get(`/viewWebsite/${year}`)
}
export const ViewReload = () => {
    return instance.put(`/viewWebsite`)
  }