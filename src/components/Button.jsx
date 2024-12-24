import React from 'react'

const Button = ({name, type}) => {
  return (
    <div className={`max-w-48 px-5 py-2 bg-white text-center text-black rounded-lg shadow-boxShadow ${type === "hover" ? "hover:bg-hoverColor hover:text-white" : ""}`}>{name}</div>
  )
}

export default Button