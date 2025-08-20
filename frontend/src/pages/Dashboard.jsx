import React from 'react'
import { useParams } from 'react-router-dom'

function Dashboard() {
  const {userId} = useParams()
  return (
    <div>Dashboard {userId}</div>
  )
}

export default Dashboard