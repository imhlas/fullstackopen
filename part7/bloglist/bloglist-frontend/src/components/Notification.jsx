import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification) {
    return null
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    color: notification.type === 'error' ? 'red' : 'green',
    fontWeight: 'bold',
  }

  return (
    <div style={style}>
      {notification.text}
    </div>
  )
}

export default Notification
