const OPEN_NOTIFICATION = 'OPEN_NOTIFICATION'
const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION'

const openNotification = (message, variant) => {
  return { type: OPEN_NOTIFICATION, open: true, message, variant }
}

const closeNotification = () => {
  return { type: CLOSE_NOTIFICATION, open: false }
}

export { OPEN_NOTIFICATION, CLOSE_NOTIFICATION, openNotification, closeNotification }