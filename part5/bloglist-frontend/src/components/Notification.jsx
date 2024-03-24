const Notification = ({ message }) => {
    if (!message) {
      return null
    }
  
    const notificationStyle = {
      color: message.type === 'error' ? 'red' : 'green',
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
    }
  
    return (
      <div style={notificationStyle}>
        {message.text}
      </div>
    )
  }
  
  export default Notification